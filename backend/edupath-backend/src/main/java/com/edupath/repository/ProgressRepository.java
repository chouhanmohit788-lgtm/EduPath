package com.edupath.repository;

import com.edupath.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProgressRepository
        extends JpaRepository<Progress, UUID> {

    List<Progress> findByLearnerProfileId(
            UUID learnerProfileId
    );

    Optional<Progress> findByLearnerProfileIdAndRoadmapId(
            UUID learnerProfileId,
            UUID roadmapId
    );

    Optional<Progress> findTopByLearnerProfileIdOrderByUpdatedAtDesc(
            UUID learnerProfileId
    );

    List<Progress> findByRoadmapId(
            UUID roadmapId
    );
}