package com.edupath.controller;

import com.edupath.entity.RoleRequirement;
import com.edupath.service.RoleRequirementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/role-requirements")
public class RoleRequirementController {

    private final RoleRequirementService roleRequirementService;

    public RoleRequirementController(
            RoleRequirementService roleRequirementService) {

        this.roleRequirementService = roleRequirementService;
    }

    @PostMapping
    public ResponseEntity<RoleRequirement> createRequirement(
            @RequestBody RoleRequirement requirement) {

        return ResponseEntity.ok(
                roleRequirementService.createRequirement(requirement)
        );
    }

    @GetMapping
    public ResponseEntity<List<RoleRequirement>> getAllRequirements() {

        return ResponseEntity.ok(
                roleRequirementService.getAllRequirements()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleRequirement> getRequirementById(
            @PathVariable UUID id) {

        return roleRequirementService
                .getRequirementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/role/{targetRoleId}")
    public ResponseEntity<List<RoleRequirement>> getByTargetRole(
            @PathVariable UUID targetRoleId) {

        return ResponseEntity.ok(
                roleRequirementService
                        .getRequirementsByTargetRole(targetRoleId)
        );
    }

    @GetMapping("/skill/{skillId}")
    public ResponseEntity<List<RoleRequirement>> getBySkill(
            @PathVariable UUID skillId) {

        return ResponseEntity.ok(
                roleRequirementService
                        .getRequirementsBySkill(skillId)
        );
    }
}