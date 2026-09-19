package com.edupath.controller;

import com.edupath.entity.Assessment;
import com.edupath.service.AssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @PostMapping
    public ResponseEntity<Assessment> createAssessment(
            @RequestBody Assessment assessment) {
        return ResponseEntity.ok(
                assessmentService.createAssessment(assessment)
        );
    }

    @GetMapping
    public ResponseEntity<List<Assessment>> getAllAssessments() {
        return ResponseEntity.ok(
                assessmentService.getAllAssessments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assessment> getAssessmentById(
            @PathVariable UUID id) {
        return assessmentService.getAssessmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/learner/{learnerProfileId}")
    public ResponseEntity<List<Assessment>> getAssessmentsByLearner(
            @PathVariable UUID learnerProfileId) {
        return ResponseEntity.ok(
                assessmentService.getAssessmentsByLearner(learnerProfileId)
        );
    }
}