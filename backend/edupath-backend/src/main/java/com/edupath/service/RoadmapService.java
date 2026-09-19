package com.edupath.service;

import com.edupath.entity.LearnerProfile;
import com.edupath.entity.Roadmap;
import com.edupath.entity.Skill;
import com.edupath.entity.SkillGap;
import com.edupath.repository.LearnerProfileRepository;
import com.edupath.repository.RoadmapRepository;
import com.edupath.repository.SkillGapRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;
    private final LearnerProfileRepository learnerProfileRepository;
    private final SkillGapRepository skillGapRepository;
    private final RoadmapTaskService roadmapTaskService;

    public RoadmapService(
            RoadmapRepository roadmapRepository,
            LearnerProfileRepository learnerProfileRepository,
            SkillGapRepository skillGapRepository,
            RoadmapTaskService roadmapTaskService) {

        this.roadmapRepository = roadmapRepository;
        this.learnerProfileRepository = learnerProfileRepository;
        this.skillGapRepository = skillGapRepository;
        this.roadmapTaskService = roadmapTaskService;
    }

    public Roadmap createRoadmap(Roadmap roadmap) {
        return roadmapRepository.save(roadmap);
    }

    public List<Roadmap> getAllRoadmaps() {
        return roadmapRepository.findAll();
    }

    public Optional<Roadmap> getRoadmapById(UUID id) {
        return roadmapRepository.findById(id);
    }

    public List<Roadmap> getRoadmapsByLearner(UUID learnerProfileId) {
        return roadmapRepository.findByLearnerProfileId(
                learnerProfileId
        );
    }

    public Optional<Roadmap> getActiveRoadmap(UUID learnerProfileId) {
        return roadmapRepository.findByLearnerProfileIdAndStatus(
                learnerProfileId,
                "ACTIVE"
        );
    }

    public Optional<Roadmap> getRoadmapByVersion(
            UUID learnerProfileId,
            Integer version) {

        return roadmapRepository.findByLearnerProfileIdAndVersion(
                learnerProfileId,
                version
        );
    }

    public Roadmap updateRoadmap(Roadmap roadmap) {
        return roadmapRepository.save(roadmap);
    }

    public Roadmap generateRoadmap(UUID learnerProfileId) {

        // 1. Learner profile find karo
        LearnerProfile learnerProfile =
                learnerProfileRepository
                        .findById(learnerProfileId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Learner profile not found."
                                )
                        );

        // 2. Learner ke skill gaps find karo
        List<SkillGap> skillGaps =
                skillGapRepository
                        .findByLearnerProfileId(
                                learnerProfileId
                        );

        if (skillGaps.isEmpty()) {
            throw new RuntimeException(
                    "No skill gaps found. Complete an assessment first."
            );
        }

        // 3. Existing active roadmap ko archive karo
        Optional<Roadmap> activeRoadmap =
                roadmapRepository
                        .findByLearnerProfileIdAndStatus(
                                learnerProfileId,
                                "ACTIVE"
                        );

        if (activeRoadmap.isPresent()) {

            Roadmap oldRoadmap =
                    activeRoadmap.get();

            oldRoadmap.setStatus("ARCHIVED");

            roadmapRepository.save(oldRoadmap);
        }

        // 4. Next roadmap version calculate karo
        List<Roadmap> existingRoadmaps =
                roadmapRepository
                        .findByLearnerProfileId(
                                learnerProfileId
                        );

        int nextVersion = 1;

        if (!existingRoadmaps.isEmpty()) {

            nextVersion =
                    existingRoadmaps.stream()
                            .map(Roadmap::getVersion)
                            .filter(version -> version != null)
                            .max(Integer::compareTo)
                            .orElse(0) + 1;
        }

        // 5. Highest skill gaps first
        skillGaps.sort(
                Comparator.comparing(
                        SkillGap::getGap,
                        Comparator.nullsLast(
                                Comparator.reverseOrder()
                        )
                )
        );

        // 6. Roadmap reason create karo
        StringBuilder reason =
                new StringBuilder(
                        "Roadmap generated from current skill gaps: "
                );

        for (int i = 0; i < skillGaps.size(); i++) {

            SkillGap gap = skillGaps.get(i);

            if (gap.getSkill() != null) {

                if (i > 0) {
                    reason.append(", ");
                }

                reason.append(
                        gap.getSkill().getName()
                );

                reason.append(
                        " (" + gap.getGap() + "%)"
                );
            }
        }

        // 7. New roadmap create karo
        Roadmap roadmap = new Roadmap();

        roadmap.setLearnerProfile(
                learnerProfile
        );

        roadmap.setVersion(
                nextVersion
        );

        roadmap.setDurationDays(
                7
        );

        roadmap.setStatus(
                "ACTIVE"
        );

        roadmap.setReason(
                reason.toString()
        );

        Roadmap savedRoadmap =
                roadmapRepository.save(roadmap);

        // 8. Priority skills ki list banao
        List<Skill> prioritySkills =
                new ArrayList<>();

        for (SkillGap skillGap : skillGaps) {

            if (skillGap.getSkill() != null
                    && skillGap.getGap() != null
                    && skillGap.getGap() > 0) {

                prioritySkills.add(
                        skillGap.getSkill()
                );
            }
        }

        // 9. Roadmap ke tasks generate karo
        roadmapTaskService.generateTasks(
                savedRoadmap,
                prioritySkills
        );

        // 10. Final roadmap return karo
        return savedRoadmap;
    }
}