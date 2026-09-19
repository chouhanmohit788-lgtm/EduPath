package com.edupath.controller;

import com.edupath.entity.LearnerProfile;
import com.edupath.entity.User;
import com.edupath.service.LearnerProfileService;
import com.edupath.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class LearnerProfileController {

    private final LearnerProfileService learnerProfileService;
    private final UserService userService;

    public LearnerProfileController(
            LearnerProfileService learnerProfileService,
            UserService userService) {

        this.learnerProfileService = learnerProfileService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createProfile(
            @RequestBody LearnerProfile profile) {

        if (profile == null
                || profile.getUser() == null
                || profile.getUser().getId() == null) {

            return ResponseEntity.badRequest()
                    .body("User is required to create profile.");
        }

        UUID userId = profile.getUser().getId();

        var userOptional = userService.getUserById(userId);

        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();

        if (learnerProfileService.profileExistsForUser(userId)) {
            return ResponseEntity.badRequest()
                    .body("Profile already exists for this user.");
        }

        profile.setUser(user);

        LearnerProfile savedProfile =
                learnerProfileService.createProfile(profile);

        return ResponseEntity.ok(savedProfile);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createProfileForUser(
            @PathVariable UUID userId,
            @RequestBody LearnerProfile profile) {

        var userOptional = userService.getUserById(userId);

        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();

        if (learnerProfileService.profileExistsForUser(userId)) {
            return ResponseEntity.badRequest()
                    .body("Profile already exists for this user.");
        }

        profile.setUser(user);

        LearnerProfile savedProfile =
                learnerProfileService.createProfile(profile);

        return ResponseEntity.ok(savedProfile);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearnerProfile> getProfileById(
            @PathVariable UUID id) {

        return learnerProfileService.getProfileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<LearnerProfile> getProfileByUserId(
            @PathVariable UUID userId) {

        return learnerProfileService.getProfileByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<LearnerProfile> updateProfile(
            @RequestBody LearnerProfile profile) {

        return ResponseEntity.ok(
                learnerProfileService.updateProfile(profile)
        );
    }
}