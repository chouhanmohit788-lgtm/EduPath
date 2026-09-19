package com.edupath.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "assessment_results")
public class AssessmentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessment assessment;

    @Column(nullable = false)
    private Integer score;

    @Column(name = "percentage", nullable = false)
    private Double percentage;

    @Column(name = "correct_answers", nullable = false)
    private Integer correctAnswers;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Column(columnDefinition = "TEXT")
    private String weakTopics;

    @Column(name = "completed_at", nullable = false)
    private LocalDateTime completedAt;

    public AssessmentResult() {
    }

    @PrePersist
    protected void onCreate() {
        completedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public String getWeakTopics() {
        return weakTopics;
    }

    public void setWeakTopics(String weakTopics) {
        this.weakTopics = weakTopics;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
}