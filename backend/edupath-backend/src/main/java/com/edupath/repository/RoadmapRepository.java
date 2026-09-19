package com.edupath.repository;

import com.edupath.entity.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoadmapRepository extends JpaRepository<Roadmap, UUID> {

    List<Roadmap> findByLearnerProfileId(UUID learnerProfileId);

    Optional<Roadmap> findByLearnerProfileIdAndStatus(
            UUID learnerProfileId,
            String status
    );

    Optional<Roadmap> findByLearnerProfileIdAndVersion(
            UUID learnerProfileId,
            Integer version
    );
}