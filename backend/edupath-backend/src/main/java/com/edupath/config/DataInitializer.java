package com.edupath.config;

import com.edupath.entity.TargetRole;
import com.edupath.repository.TargetRoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeTargetRoles(
            TargetRoleRepository targetRoleRepository) {

        return args -> {

            createRole(
                    targetRoleRepository,
                    "Software Engineer",
                    "Build software applications and solve programming problems."
            );

            createRole(
                    targetRoleRepository,
                    "Java Developer",
                    "Develop backend applications using Java and Spring Boot."
            );

            createRole(
                    targetRoleRepository,
                    "Full Stack Developer",
                    "Build frontend and backend web applications."
            );

            createRole(
                    targetRoleRepository,
                    "Data Engineer",
                    "Build data pipelines, databases and data processing systems."
            );

            createRole(
                    targetRoleRepository,
                    "AI/ML Engineer",
                    "Build machine learning and artificial intelligence solutions."
            );
        };
    }

    private void createRole(
            TargetRoleRepository repository,
            String name,
            String description) {

        if (!repository.existsByName(name)) {

            TargetRole role = new TargetRole();

            role.setName(name);
            role.setDescription(description);

            repository.save(role);
        }
    }
}