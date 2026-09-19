package com.edupath.service;

import com.edupath.entity.Assessment;
import com.edupath.entity.AssessmentResult;
import com.edupath.entity.LearnerProfile;
import com.edupath.entity.Skill;
import com.edupath.entity.SkillGap;
import com.edupath.repository.AssessmentRepository;
import com.edupath.repository.AssessmentResultRepository;
import com.edupath.repository.SkillGapRepository;
import com.edupath.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AssessmentResultService {

    private final AssessmentResultRepository assessmentResultRepository;
    private final AssessmentRepository assessmentRepository;
    private final SkillRepository skillRepository;
    private final SkillGapRepository skillGapRepository;
    private final SkillGapService skillGapService;
    private final RoadmapService roadmapService;

    public AssessmentResultService(
            AssessmentResultRepository assessmentResultRepository,
            AssessmentRepository assessmentRepository,
            SkillRepository skillRepository,
            SkillGapRepository skillGapRepository,
            SkillGapService skillGapService,
            RoadmapService roadmapService) {

        this.assessmentResultRepository =
                assessmentResultRepository;

        this.assessmentRepository =
                assessmentRepository;

        this.skillRepository =
                skillRepository;

        this.skillGapRepository =
                skillGapRepository;

        this.skillGapService =
                skillGapService;

        this.roadmapService =
                roadmapService;
    }

    public AssessmentResult createResult(
            AssessmentResult result) {

        AssessmentResult savedResult =
                assessmentResultRepository.save(result);

        UUID learnerProfileId =
                generateSkillGaps(savedResult);

        /*
         * Assessment ke baad automatically
         * adaptive roadmap generate hoga.
         */
        if (learnerProfileId != null) {

            roadmapService.generateRoadmap(
                    learnerProfileId
            );
        }

        return savedResult;
    }

    private UUID generateSkillGaps(
            AssessmentResult result) {

        if (result.getAssessment() == null
                || result.getAssessment().getId() == null) {

            return null;
        }

        UUID assessmentId =
                result.getAssessment().getId();

        Assessment assessment =
                assessmentRepository.findById(assessmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Assessment not found."
                                ));

        LearnerProfile learnerProfile =
                assessment.getLearnerProfile();

        if (learnerProfile == null) {
            return null;
        }

        UUID learnerProfileId =
                learnerProfile.getId();

        String weakTopics =
                result.getWeakTopics();

        List<Skill> skills =
                skillRepository.findAll();

        for (Skill skill : skills) {

            boolean isWeak =
                    weakTopics != null
                            && !weakTopics.isBlank()
                            && containsTopic(
                                    weakTopics,
                                    skill.getName()
                            );

            int currentLevel =
                    isWeak ? 0 : 100;

            updateOrCreateSkillGap(
                    learnerProfileId,
                    skill,
                    currentLevel
            );
        }

        return learnerProfileId;
    }

    private void updateOrCreateSkillGap(
            UUID learnerProfileId,
            Skill skill,
            int currentLevel) {

        List<SkillGap> existingGaps =
                skillGapRepository
                        .findByLearnerProfileId(
                                learnerProfileId
                        );

        for (SkillGap existingGap : existingGaps) {

            if (existingGap.getSkill() != null
                    && existingGap.getSkill()
                            .getId()
                            .equals(skill.getId())) {

                /*
                 * Existing skill gap update karo
                 * instead of duplicate row create karne ke.
                 */
                skillGapService.calculateSkillGap(
                        learnerProfileId,
                        skill.getId(),
                        currentLevel
                );

                return;
            }
        }

        skillGapService.calculateSkillGap(
                learnerProfileId,
                skill.getId(),
                currentLevel
        );
    }

    private boolean containsTopic(
            String weakTopics,
            String skillName) {

        String[] topics =
                weakTopics.split(",");

        for (String topic : topics) {

            if (topic.trim()
                    .equalsIgnoreCase(skillName)) {

                return true;
            }
        }

        return false;
    }

    public List<AssessmentResult> getAllResults() {
        return assessmentResultRepository.findAll();
    }

    public Optional<AssessmentResult> getResultById(
            UUID id) {

        return assessmentResultRepository.findById(id);
    }

    public List<AssessmentResult> getResultsByAssessment(
            UUID assessmentId) {

        return assessmentResultRepository
                .findByAssessmentId(assessmentId);
    }

    public Optional<AssessmentResult> getLatestResult(
            UUID assessmentId) {

        return assessmentResultRepository
                .findTopByAssessmentIdOrderByCompletedAtDesc(
                        assessmentId
                );
    }
}