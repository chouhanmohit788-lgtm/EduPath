package com.edupath.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "learner_profile_id", nullable = false)
    private LearnerProfile learnerProfile;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Assessment() {
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}