package com.edupath.controller;

import com.edupath.entity.TargetRole;
import com.edupath.service.TargetRoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/target-roles")
public class TargetRoleController {

    private final TargetRoleService targetRoleService;

    public TargetRoleController(TargetRoleService targetRoleService) {
        this.targetRoleService = targetRoleService;
    }

    @PostMapping
    public ResponseEntity<TargetRole> createRole(@RequestBody TargetRole role) {
        return ResponseEntity.ok(targetRoleService.createRole(role));
    }

    @GetMapping
    public ResponseEntity<List<TargetRole>> getAllRoles() {
        return ResponseEntity.ok(targetRoleService.getAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TargetRole> getRoleById(@PathVariable UUID id) {
        return targetRoleService.getRoleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<TargetRole> getRoleByName(@PathVariable String name) {
        return targetRoleService.getRoleByName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}