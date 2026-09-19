package com.edupath.service;

import com.edupath.entity.LearnerProfile;
import com.edupath.entity.RoleRequirement;
import com.edupath.entity.Skill;
import com.edupath.entity.SkillGap;
import com.edupath.repository.LearnerProfileRepository;
import com.edupath.repository.RoleRequirementRepository;
import com.edupath.repository.SkillGapRepository;
import com.edupath.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SkillGapService {

    private final SkillGapRepository skillGapRepository;
    private final LearnerProfileRepository learnerProfileRepository;
    private final SkillRepository skillRepository;
    private final RoleRequirementRepository roleRequirementRepository;

    public SkillGapService(
            SkillGapRepository skillGapRepository,
            LearnerProfileRepository learnerProfileRepository,
            SkillRepository skillRepository,
            RoleRequirementRepository roleRequirementRepository) {

        this.skillGapRepository = skillGapRepository;
        this.learnerProfileRepository = learnerProfileRepository;
        this.skillRepository = skillRepository;
        this.roleRequirementRepository = roleRequirementRepository;
    }

    public SkillGap createSkillGap(SkillGap skillGap) {
        return skillGapRepository.save(skillGap);
    }

    public List<SkillGap> getAllSkillGaps() {
        return skillGapRepository.findAll();
    }

    public Optional<SkillGap> getSkillGapById(UUID id) {
        return skillGapRepository.findById(id);
    }

    public List<SkillGap> getByLearnerProfile(
            UUID learnerProfileId) {

        return skillGapRepository
                .findByLearnerProfileId(learnerProfileId);
    }

    public List<SkillGap> getBySkill(UUID skillId) {
        return skillGapRepository.findBySkillId(skillId);
    }

    public SkillGap calculateSkillGap(
            UUID learnerProfileId,
            UUID skillId,
            int currentLevel) {

        LearnerProfile learnerProfile =
                learnerProfileRepository
                        .findById(learnerProfileId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Learner profile not found."
                                )
                        );

        Skill skill =
                skillRepository
                        .findById(skillId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Skill not found."
                                )
                        );

        UUID targetRoleId =
                learnerProfile.getTargetRoleId();

        if (targetRoleId == null) {
            throw new RuntimeException(
                    "Target role is not selected."
            );
        }

        /*
         * Find requirement for:
         * Target Role + Skill
         */
        Optional<RoleRequirement> requirementOptional =
                roleRequirementRepository
                        .findByTargetRole_IdAndSkill_Id(
                                targetRoleId,
                                skillId
                        );

        /*
         * Agar is role ke liye is skill ka requirement
         * abhi database me nahi hai, to assessment fail
         * mat karo.
         *
         * Null return karke caller ko batayenge ki
         * is skill ko skip karna hai.
         */
        if (requirementOptional.isEmpty()) {
            return null;
        }

        RoleRequirement requirement =
                requirementOptional.get();

        int requiredLevel =
                requirement.getRequiredLevel();

        int gap =
                Math.max(
                        requiredLevel - currentLevel,
                        0
                );

        /*
         * Existing learner + skill gap check karo.
         */
        List<SkillGap> existingGaps =
                skillGapRepository
                        .findByLearnerProfileId(
                                learnerProfileId
                        );

        SkillGap skillGap = null;

        for (SkillGap existingGap : existingGaps) {

            if (existingGap.getSkill() != null
                    && existingGap.getSkill()
                            .getId()
                            .equals(skillId)) {

                skillGap = existingGap;
                break;
            }
        }

        /*
         * Existing nahi hai to new record.
         */
        if (skillGap == null) {

            skillGap = new SkillGap();

            skillGap.setLearnerProfile(
                    learnerProfile
            );

            skillGap.setSkill(
                    skill
            );
        }

        /*
         * Latest assessment values.
         */
        skillGap.setCurrentLevel(
                currentLevel
        );

        skillGap.setRequiredLevel(
                requiredLevel
        );

        skillGap.setGap(
                gap
        );

        return skillGapRepository.save(
                skillGap
        );
    }
}