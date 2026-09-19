package com.edupath.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "roadmap_tasks")
public class RoadmapTask {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "roadmap_id", nullable = false)
    private Roadmap roadmap;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "day_number", nullable = false)
    private Integer dayNumber;

    @Column(name = "estimated_minutes", nullable = false)
    private Integer estimatedMinutes;

    @Column(name = "resource_url", length = 500)
    private String resourceUrl;

    @Column(nullable = false, length = 20)
    private String status = "PENDING";

    public RoadmapTask() {
    }

    public UUID getId() {
        return id;
    }

    public Roadmap getRoadmap() {
        return roadmap;
    }

    public void setRoadmap(Roadmap roadmap) {
        this.roadmap = roadmap;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
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

    public Integer getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(Integer dayNumber) {
        this.dayNumber = dayNumber;
    }

    public Integer getEstimatedMinutes() {
        return estimatedMinutes;
    }

    public void setEstimatedMinutes(Integer estimatedMinutes) {
        this.estimatedMinutes = estimatedMinutes;
    }

    public String getResourceUrl() {
        return resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}