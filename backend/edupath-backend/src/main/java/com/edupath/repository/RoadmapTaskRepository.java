package com.edupath.repository;

import com.edupath.entity.RoadmapTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RoadmapTaskRepository extends JpaRepository<RoadmapTask, UUID> {

    List<RoadmapTask> findByRoadmapId(UUID roadmapId);

    List<RoadmapTask> findBySkillId(UUID skillId);

    List<RoadmapTask> findByRoadmapIdAndStatus(
            UUID roadmapId,
            String status
    );
}