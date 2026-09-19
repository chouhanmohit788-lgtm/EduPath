package com.edupath.config;

import com.edupath.entity.Skill;
import com.edupath.repository.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SkillInitializer {

    @Bean
    CommandLineRunner initializeSkills(
            SkillRepository skillRepository) {

        return args -> {

            createSkill(
                    skillRepository,
                    "Java",
                    "Java programming fundamentals and development."
            );

            createSkill(
                    skillRepository,
                    "Data Structures",
                    "Arrays, linked lists, stacks, queues, trees and graphs."
            );

            createSkill(
                    skillRepository,
                    "SQL",
                    "Database queries, joins, aggregation and data manipulation."
            );

            createSkill(
                    skillRepository,
                    "OOP",
                    "Object-oriented programming concepts and principles."
            );

            createSkill(
                    skillRepository,
                    "Problem Solving",
                    "Logical thinking, algorithms and programming problem solving."
            );
        };
    }

    private void createSkill(
            SkillRepository repository,
            String name,
            String description) {

        if (!repository.existsByName(name)) {

            Skill skill = new Skill();

            skill.setName(name);
            skill.setDescription(description);

            repository.save(skill);
        }
    }
}