package com.edupath.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
    name = "roadmaps",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_roadmap_profile_version",
            columnNames = {"profile_id", "version"}
        )
    }
)
public class Roadmap {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "profile_id", nullable = false)
    private LearnerProfile learnerProfile;

    @Column(nullable = false)
    private Integer version;

    @Column(name = "duration_days", nullable = false)
    private Integer durationDays;

    @Column(nullable = false, length = 20)
    private String status = "ACTIVE";

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Roadmap() {
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

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}