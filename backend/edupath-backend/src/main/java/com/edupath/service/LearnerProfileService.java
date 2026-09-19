package com.edupath.service;

import com.edupath.entity.LearnerProfile;
import com.edupath.repository.LearnerProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class LearnerProfileService {

    private final LearnerProfileRepository learnerProfileRepository;

    public LearnerProfileService(
            LearnerProfileRepository learnerProfileRepository) {

        this.learnerProfileRepository =
                learnerProfileRepository;
    }

    public LearnerProfile createProfile(
            LearnerProfile profile) {

        return learnerProfileRepository.save(profile);
    }

    public Optional<LearnerProfile> getProfileById(
            UUID id) {

        return learnerProfileRepository.findById(id);
    }

    public Optional<LearnerProfile> getProfileByUserId(
            UUID userId) {

        return learnerProfileRepository.findByUserId(userId);
    }

    public boolean profileExistsForUser(
            UUID userId) {

        return learnerProfileRepository
                .existsByUserId(userId);
    }

    public LearnerProfile updateProfile(
            LearnerProfile profile) {

        LearnerProfile existingProfile =
                learnerProfileRepository
                        .findById(profile.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Learner profile not found."
                                ));

        // Keep existing database values
        // that should not be replaced by null.
        existingProfile.setEducation(
                profile.getEducation()
        );

        existingProfile.setExperienceLevel(
                profile.getExperienceLevel()
        );

        existingProfile.setTargetRoleId(
                profile.getTargetRoleId()
        );

        existingProfile.setStudyHoursPerWeek(
                profile.getStudyHoursPerWeek()
        );

        existingProfile.setCareerGoal(
                profile.getCareerGoal()
        );

        // Do NOT set createdAt here.
        // Existing createdAt will remain unchanged.

        return learnerProfileRepository.save(
                existingProfile
        );
    }
}