package com.edupath.controller;

import com.edupath.entity.AssessmentResult;
import com.edupath.service.AssessmentResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/assessment-results")
public class AssessmentResultController {

    private final AssessmentResultService assessmentResultService;

    public AssessmentResultController(
            AssessmentResultService assessmentResultService) {
        this.assessmentResultService = assessmentResultService;
    }

    @PostMapping
    public ResponseEntity<AssessmentResult> createResult(
            @RequestBody AssessmentResult result) {
        return ResponseEntity.ok(
                assessmentResultService.createResult(result)
        );
    }

    @GetMapping
    public ResponseEntity<List<AssessmentResult>> getAllResults() {
        return ResponseEntity.ok(
                assessmentResultService.getAllResults()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentResult> getResultById(
            @PathVariable UUID id) {
        return assessmentResultService.getResultById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/assessment/{assessmentId}")
    public ResponseEntity<List<AssessmentResult>> getResultsByAssessment(
            @PathVariable UUID assessmentId) {
        return ResponseEntity.ok(
                assessmentResultService
                        .getResultsByAssessment(assessmentId)
        );
    }

    @GetMapping("/assessment/{assessmentId}/latest")
    public ResponseEntity<AssessmentResult> getLatestResult(
            @PathVariable UUID assessmentId) {
        return assessmentResultService
                .getLatestResult(assessmentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}