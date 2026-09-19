package com.edupath.controller;

import com.edupath.entity.SkillGap;
import com.edupath.service.SkillGapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/skill-gaps")
public class SkillGapController {

    private final SkillGapService skillGapService;

    public SkillGapController(SkillGapService skillGapService) {
        this.skillGapService = skillGapService;
    }

    @PostMapping
    public ResponseEntity<SkillGap> createSkillGap(
            @RequestBody SkillGap skillGap) {
        return ResponseEntity.ok(
                skillGapService.createSkillGap(skillGap)
        );
    }

    @GetMapping
    public ResponseEntity<List<SkillGap>> getAllSkillGaps() {
        return ResponseEntity.ok(
                skillGapService.getAllSkillGaps()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillGap> getSkillGapById(
            @PathVariable UUID id) {
        return skillGapService.getSkillGapById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/learner/{learnerProfileId}")
    public ResponseEntity<List<SkillGap>> getByLearnerProfile(
            @PathVariable UUID learnerProfileId) {
        return ResponseEntity.ok(
                skillGapService.getByLearnerProfile(learnerProfileId)
        );
    }

    @GetMapping("/skill/{skillId}")
    public ResponseEntity<List<SkillGap>> getBySkill(
            @PathVariable UUID skillId) {
        return ResponseEntity.ok(
                skillGapService.getBySkill(skillId)
        );
    }
}