package com.edupath.repository;

import com.edupath.entity.TargetRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TargetRoleRepository extends JpaRepository<TargetRole, UUID> {

    Optional<TargetRole> findByName(String name);

    boolean existsByName(String name);
}