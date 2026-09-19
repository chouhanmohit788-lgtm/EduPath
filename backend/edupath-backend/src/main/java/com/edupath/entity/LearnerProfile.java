package com.edupath.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "learner_profiles")
public class LearnerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT")
    private String education;

    @Column(name = "experience_level", length = 40)
    private String experienceLevel;

    @Column(name = "target_role_id")
    private UUID targetRoleId;

    @Column(name = "study_hours_per_week")
    private Integer studyHoursPerWeek;

    @Column(columnDefinition = "TEXT")
    private String careerGoal;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public UUID getTargetRoleId() {
        return targetRoleId;
    }

    public void setTargetRoleId(UUID targetRoleId) {
        this.targetRoleId = targetRoleId;
    }

    public Integer getStudyHoursPerWeek() {
        return studyHoursPerWeek;
    }

    public void setStudyHoursPerWeek(Integer studyHoursPerWeek) {
        this.studyHoursPerWeek = studyHoursPerWeek;
    }

    public String getCareerGoal() {
        return careerGoal;
    }

    public void setCareerGoal(String careerGoal) {
        this.careerGoal = careerGoal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}