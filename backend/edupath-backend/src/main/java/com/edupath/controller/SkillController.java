package com.edupath.controller;

import com.edupath.entity.Skill;
import com.edupath.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.createSkill(skill));
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable UUID id) {
        return skillService.getSkillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Skill> getSkillByName(@PathVariable String name) {
        return skillService.getSkillByName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}