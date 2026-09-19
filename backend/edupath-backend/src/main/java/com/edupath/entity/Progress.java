package com.edupath.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "progress")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "learner_profile_id", nullable = false)
    private LearnerProfile learnerProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roadmap_id")
    private Roadmap roadmap;

    @Column(name = "completed_tasks", nullable = false)
    private Integer completedTasks = 0;

    @Column(name = "total_tasks", nullable = false)
    private Integer totalTasks = 0;

    @Column(name = "completion_percentage", nullable = false)
    private Double completionPercentage = 0.0;

    @Column(name = "current_streak")
    private Integer currentStreak = 0;

    @Column(name = "last_activity_at")
    private LocalDateTime lastActivityAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Progress() {
    }

    @PrePersist
    protected void onCreate() {
        updatedAt = LocalDateTime.now();
        if (lastActivityAt == null) {
            lastActivityAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public LearnerProfile getLearnerProfile() {
        return learnerProfile;
    }

    public void setLearnerProfile(LearnerProfile learnerProfile) {
        this.learnerProfile = learnerProfile;
    }

    public Roadmap getRoadmap() {
        return roadmap;
    }

    public void setRoadmap(Roadmap roadmap) {
        this.roadmap = roadmap;
    }

    public Integer getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(Integer completedTasks) {
        this.completedTasks = completedTasks;
    }

    public Integer getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(Integer totalTasks) {
        this.totalTasks = totalTasks;
    }

    public Double getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(Double completionPercentage) {
        this.completionPercentage = completionPercentage;
    }

    public Integer getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(Integer currentStreak) {
        this.currentStreak = currentStreak;
    }

    public LocalDateTime getLastActivityAt() {
        return lastActivityAt;
    }

    public void setLastActivityAt(LocalDateTime lastActivityAt) {
        this.lastActivityAt = lastActivityAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}