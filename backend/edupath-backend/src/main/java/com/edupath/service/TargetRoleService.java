package com.edupath.service;

import com.edupath.entity.TargetRole;
import com.edupath.repository.TargetRoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TargetRoleService {

    private final TargetRoleRepository targetRoleRepository;

    public TargetRoleService(TargetRoleRepository targetRoleRepository) {
        this.targetRoleRepository = targetRoleRepository;
    }

    public TargetRole createRole(TargetRole role) {
        return targetRoleRepository.save(role);
    }

    public List<TargetRole> getAllRoles() {
        return targetRoleRepository.findAll();
    }

    public Optional<TargetRole> getRoleById(UUID id) {
        return targetRoleRepository.findById(id);
    }

    public Optional<TargetRole> getRoleByName(String name) {
        return targetRoleRepository.findByName(name);
    }
}