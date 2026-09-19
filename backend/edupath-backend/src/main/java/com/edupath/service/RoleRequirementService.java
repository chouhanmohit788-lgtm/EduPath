package com.edupath.service;

import com.edupath.entity.RoleRequirement;
import com.edupath.repository.RoleRequirementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoleRequirementService {

    private final RoleRequirementRepository repository;

    public RoleRequirementService(
            RoleRequirementRepository repository) {
        this.repository = repository;
    }

    public RoleRequirement createRequirement(
            RoleRequirement requirement) {

        return repository.save(requirement);
    }

    public List<RoleRequirement> getAllRequirements() {

        return repository.findAll();
    }

    public Optional<RoleRequirement> getRequirementById(
            UUID id) {

        return repository.findById(id);
    }

    public List<RoleRequirement> getRequirementsByTargetRole(
            UUID targetRoleId) {

        return repository.findByTargetRole_Id(targetRoleId);
    }

    public List<RoleRequirement> getRequirementsBySkill(
            UUID skillId) {

        return repository.findBySkill_Id(skillId);
    }
}