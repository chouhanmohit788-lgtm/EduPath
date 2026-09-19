package com.edupath.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(
        name = "role_requirements",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"target_role_id", "skill_id"}
                )
        }
)
public class RoleRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "target_role_id", nullable = false)
    private TargetRole targetRole;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "required_level", nullable = false)
    private Integer requiredLevel;

    public RoleRequirement() {
    }

    public UUID getId() {
        return id;
    }

    public TargetRole getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(TargetRole targetRole) {
        this.targetRole = targetRole;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public Integer getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(Integer requiredLevel) {
        this.requiredLevel = requiredLevel;
    }
}