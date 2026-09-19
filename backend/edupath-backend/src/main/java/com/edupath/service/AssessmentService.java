package com.edupath.service;

import com.edupath.entity.Assessment;
import com.edupath.repository.AssessmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;

    public AssessmentService(AssessmentRepository assessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }

    public Assessment createAssessment(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    public Optional<Assessment> getAssessmentById(UUID id) {
        return assessmentRepository.findById(id);
    }

    public List<Assessment> getAssessmentsByLearner(UUID learnerProfileId) {
        return assessmentRepository.findByLearnerProfileId(learnerProfileId);
    }
}