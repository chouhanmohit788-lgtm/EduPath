package com.edupath.controller;

import com.edupath.entity.Progress;
import com.edupath.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(
            ProgressService progressService) {

        this.progressService = progressService;
    }

    @PostMapping
    public ResponseEntity<Progress> createProgress(
            @RequestBody Progress progress) {

        return ResponseEntity.ok(
                progressService.createProgress(
                        progress
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<Progress>> getAllProgress() {

        return ResponseEntity.ok(
                progressService.getAllProgress()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Progress> getProgressById(
            @PathVariable UUID id) {

        return progressService
                .getProgressById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    @GetMapping("/learner/{learnerProfileId}")
    public ResponseEntity<List<Progress>> getByLearnerProfile(
            @PathVariable UUID learnerProfileId) {

        return ResponseEntity.ok(
                progressService.getByLearnerProfile(
                        learnerProfileId
                )
        );
    }

    @GetMapping("/learner/{learnerProfileId}/latest")
    public ResponseEntity<Progress> getLatestProgress(
            @PathVariable UUID learnerProfileId) {

        return progressService
                .getLatestProgress(
                        learnerProfileId
                )
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    @GetMapping("/roadmap/{roadmapId}")
    public ResponseEntity<List<Progress>> getByRoadmap(
            @PathVariable UUID roadmapId) {

        return ResponseEntity.ok(
                progressService.getByRoadmap(
                        roadmapId
                )
        );
    }

    @PutMapping
    public ResponseEntity<Progress> updateProgress(
            @RequestBody Progress progress) {

        return ResponseEntity.ok(
                progressService.updateProgress(
                        progress
                )
        );
    }
}