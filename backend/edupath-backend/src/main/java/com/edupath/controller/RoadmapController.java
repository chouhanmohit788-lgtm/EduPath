package com.edupath.controller;

import com.edupath.entity.Roadmap;
import com.edupath.service.RoadmapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/roadmaps")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @PostMapping
    public ResponseEntity<Roadmap> createRoadmap(
            @RequestBody Roadmap roadmap) {

        return ResponseEntity.ok(
                roadmapService.createRoadmap(roadmap)
        );
    }

    @PostMapping("/generate/{learnerProfileId}")
    public ResponseEntity<Roadmap> generateRoadmap(
            @PathVariable UUID learnerProfileId) {

        return ResponseEntity.ok(
                roadmapService.generateRoadmap(
                        learnerProfileId
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<Roadmap>> getAllRoadmaps() {

        return ResponseEntity.ok(
                roadmapService.getAllRoadmaps()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roadmap> getRoadmapById(
            @PathVariable UUID id) {

        return roadmapService
                .getRoadmapById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/learner/{learnerProfileId}")
    public ResponseEntity<List<Roadmap>> getRoadmapsByLearner(
            @PathVariable UUID learnerProfileId) {

        return ResponseEntity.ok(
                roadmapService.getRoadmapsByLearner(
                        learnerProfileId
                )
        );
    }

    @GetMapping("/learner/{learnerProfileId}/active")
    public ResponseEntity<Roadmap> getActiveRoadmap(
            @PathVariable UUID learnerProfileId) {

        return roadmapService
                .getActiveRoadmap(learnerProfileId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/learner/{learnerProfileId}/version/{version}")
    public ResponseEntity<Roadmap> getRoadmapByVersion(
            @PathVariable UUID learnerProfileId,
            @PathVariable Integer version) {

        return roadmapService
                .getRoadmapByVersion(
                        learnerProfileId,
                        version
                )
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<Roadmap> updateRoadmap(
            @RequestBody Roadmap roadmap) {

        return ResponseEntity.ok(
                roadmapService.updateRoadmap(
                        roadmap
                )
        );
    }
}