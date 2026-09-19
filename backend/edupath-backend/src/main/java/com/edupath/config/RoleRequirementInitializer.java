package com.edupath.config;

import com.edupath.entity.RoleRequirement;
import com.edupath.entity.Skill;
import com.edupath.entity.TargetRole;
import com.edupath.repository.RoleRequirementRepository;
import com.edupath.repository.SkillRepository;
import com.edupath.repository.TargetRoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleRequirementInitializer {

    @Bean
    CommandLineRunner initializeRoleRequirements(
            TargetRoleRepository targetRoleRepository,
            SkillRepository skillRepository,
            RoleRequirementRepository roleRequirementRepository) {

        return args -> {

            TargetRole softwareEngineer =
                    targetRoleRepository
                            .findByName("Software Engineer")
                            .orElse(null);

            if (softwareEngineer == null) {
                return;
            }

            createRequirement(
                    roleRequirementRepository,
                    skillRepository,
                    softwareEngineer,
                    "Java",
                    85
            );

            createRequirement(
                    roleRequirementRepository,
                    skillRepository,
                    softwareEngineer,
                    "Data Structures",
                    85
            );

            createRequirement(
                    roleRequirementRepository,
                    skillRepository,
                    softwareEngineer,
                    "SQL",
                    80
            );

            createRequirement(
                    roleRequirementRepository,
                    skillRepository,
                    softwareEngineer,
                    "OOP",
                    85
            );

            createRequirement(
                    roleRequirementRepository,
                    skillRepository,
                    softwareEngineer,
                    "Problem Solving",
                    80
            );
        };
    }

    private void createRequirement(
            RoleRequirementRepository requirementRepository,
            SkillRepository skillRepository,
            TargetRole targetRole,
            String skillName,
            int requiredLevel) {

        Skill skill = skillRepository
                .findByName(skillName)
                .orElse(null);

        if (skill == null) {
            return;
        }

        boolean exists =
                requirementRepository
                        .findByTargetRole_IdAndSkill_Id(
                                targetRole.getId(),
                                skill.getId()
                        )
                        .isPresent();

        if (!exists) {

            RoleRequirement requirement =
                    new RoleRequirement();

            requirement.setTargetRole(targetRole);
            requirement.setSkill(skill);
            requirement.setRequiredLevel(requiredLevel);

            requirementRepository.save(requirement);
        }
    }
}