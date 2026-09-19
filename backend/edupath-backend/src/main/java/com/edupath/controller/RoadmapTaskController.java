package com.edupath.controller;

import com.edupath.entity.RoadmapTask;
import com.edupath.service.RoadmapTaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/roadmap-tasks")
public class RoadmapTaskController {

    private final RoadmapTaskService roadmapTaskService;

    public RoadmapTaskController(
            RoadmapTaskService roadmapTaskService) {

        this.roadmapTaskService = roadmapTaskService;
    }

    @PostMapping
    public ResponseEntity<RoadmapTask> createTask(
            @RequestBody RoadmapTask task) {

        return ResponseEntity.ok(
                roadmapTaskService.createTask(task)
        );
    }

    @GetMapping
    public ResponseEntity<List<RoadmapTask>> getAllTasks() {

        return ResponseEntity.ok(
                roadmapTaskService.getAllTasks()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoadmapTask> getTaskById(
            @PathVariable UUID id) {

        return roadmapTaskService
                .getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    @GetMapping("/roadmap/{roadmapId}")
    public ResponseEntity<List<RoadmapTask>> getTasksByRoadmap(
            @PathVariable UUID roadmapId) {

        return ResponseEntity.ok(
                roadmapTaskService
                        .getTasksByRoadmap(roadmapId)
        );
    }

    @GetMapping("/skill/{skillId}")
    public ResponseEntity<List<RoadmapTask>> getTasksBySkill(
            @PathVariable UUID skillId) {

        return ResponseEntity.ok(
                roadmapTaskService
                        .getTasksBySkill(skillId)
        );
    }

    @GetMapping("/roadmap/{roadmapId}/status/{status}")
    public ResponseEntity<List<RoadmapTask>> getTasksByStatus(
            @PathVariable UUID roadmapId,
            @PathVariable String status) {

        return ResponseEntity.ok(
                roadmapTaskService
                        .getTasksByStatus(
                                roadmapId,
                                status
                        )
        );
    }

    /*
     * Start a task
     */
    @PutMapping("/{id}/start")
    public ResponseEntity<RoadmapTask> startTask(
            @PathVariable UUID id) {

        return ResponseEntity.ok(
                roadmapTaskService.startTask(id)
        );
    }

    /*
     * Complete a task
     */
    @PutMapping("/{id}/complete")
    public ResponseEntity<RoadmapTask> completeTask(
            @PathVariable UUID id) {

        return ResponseEntity.ok(
                roadmapTaskService.completeTask(id)
        );
    }

    /*
     * Update task
     */
    @PutMapping
    public ResponseEntity<RoadmapTask> updateTask(
            @RequestBody RoadmapTask task) {

        return ResponseEntity.ok(
                roadmapTaskService.updateTask(task)
        );
    }
}