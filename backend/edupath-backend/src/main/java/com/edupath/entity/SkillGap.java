package com.edupath.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "skill_gaps")
public class SkillGap {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "learner_profile_id", nullable = false)
    private LearnerProfile learnerProfile;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(nullable = false)
    private Integer currentLevel;

    @Column(nullable = false)
    private Integer requiredLevel;

    @Column(nullable = false)
    private Integer gap;

    public SkillGap() {
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

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public Integer getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Integer currentLevel) {
        this.currentLevel = currentLevel;
    }

    public Integer getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(Integer requiredLevel) {
        this.requiredLevel = requiredLevel;
    }

    public Integer getGap() {
        return gap;
    }

    public void setGap(Integer gap) {
        this.gap = gap;
    }
}