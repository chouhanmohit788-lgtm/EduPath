package com.edupath.repository;

import com.edupath.entity.AssessmentResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AssessmentResultRepository
        extends JpaRepository<AssessmentResult, UUID> {

    List<AssessmentResult> findByAssessmentId(UUID assessmentId);

    Optional<AssessmentResult> findTopByAssessmentIdOrderByCompletedAtDesc(
            UUID assessmentId
    );
}