package com.edupath.repository;

import com.edupath.entity.RoleRequirement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoleRequirementRepository
        extends JpaRepository<RoleRequirement, UUID> {

    List<RoleRequirement> findByTargetRole_Id(UUID targetRoleId);

    List<RoleRequirement> findBySkill_Id(UUID skillId);

    Optional<RoleRequirement> findByTargetRole_IdAndSkill_Id(
            UUID targetRoleId,
            UUID skillId
    );
}