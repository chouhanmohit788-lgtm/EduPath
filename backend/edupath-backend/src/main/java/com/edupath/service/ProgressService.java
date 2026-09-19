package com.edupath.service;

import com.edupath.entity.LearnerProfile;
import com.edupath.entity.Progress;
import com.edupath.entity.Roadmap;
import com.edupath.entity.RoadmapTask;
import com.edupath.repository.LearnerProfileRepository;
import com.edupath.repository.ProgressRepository;
import com.edupath.repository.RoadmapTaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;
    private final LearnerProfileRepository learnerProfileRepository;
    private final RoadmapTaskRepository roadmapTaskRepository;

    public ProgressService(
            ProgressRepository progressRepository,
            LearnerProfileRepository learnerProfileRepository,
            RoadmapTaskRepository roadmapTaskRepository) {

        this.progressRepository = progressRepository;
        this.learnerProfileRepository =
                learnerProfileRepository;
        this.roadmapTaskRepository =
                roadmapTaskRepository;
    }

    public Progress createProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    public Optional<Progress> getProgressById(UUID id) {
        return progressRepository.findById(id);
    }

    public List<Progress> getByLearnerProfile(
            UUID learnerProfileId) {

        return progressRepository
                .findByLearnerProfileId(
                        learnerProfileId
                );
    }

    public Optional<Progress> getLatestProgress(
            UUID learnerProfileId) {

        return progressRepository
                .findTopByLearnerProfileIdOrderByUpdatedAtDesc(
                        learnerProfileId
                );
    }

    public List<Progress> getByRoadmap(UUID roadmapId) {
        return progressRepository.findByRoadmapId(
                roadmapId
        );
    }

    public Progress updateProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    /*
     * Task complete hone ke baad progress calculate karo.
     */
    public Progress updateProgressFromTask(
            RoadmapTask completedTask) {

        if (completedTask == null
                || completedTask.getRoadmap() == null
                || completedTask.getRoadmap().getId() == null) {

            throw new RuntimeException(
                    "Task roadmap information is missing."
            );
        }

        Roadmap roadmap =
                completedTask.getRoadmap();

        if (roadmap.getLearnerProfile() == null
                || roadmap.getLearnerProfile().getId() == null) {

            throw new RuntimeException(
                    "Learner profile information is missing."
            );
        }

        UUID learnerProfileId =
                roadmap.getLearnerProfile().getId();

        UUID roadmapId =
                roadmap.getId();

        LearnerProfile learnerProfile =
                learnerProfileRepository
                        .findById(learnerProfileId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Learner profile not found."
                                )
                        );

        /*
         * Is roadmap ke saare tasks.
         */
        List<RoadmapTask> tasks =
                roadmapTaskRepository
                        .findByRoadmapId(roadmapId);

        int totalTasks = tasks.size();

        int completedTasks = 0;

        for (RoadmapTask task : tasks) {

            if ("COMPLETED".equals(
                    task.getStatus())) {

                completedTasks++;
            }
        }

        double completionPercentage = 0.0;

        if (totalTasks > 0) {

            completionPercentage =
                    (completedTasks * 100.0)
                            / totalTasks;
        }

        /*
         * Existing progress find karo.
         */
        Progress progress =
                progressRepository
                        .findByLearnerProfileIdAndRoadmapId(
                                learnerProfileId,
                                roadmapId
                        )
                        .orElse(null);

        if (progress == null) {

            progress = new Progress();

            progress.setLearnerProfile(
                    learnerProfile
            );

            progress.setRoadmap(
                    roadmap
            );

            progress.setCurrentStreak(0);
        }

        /*
         * Streak update.
         */
        LocalDateTime previousActivity =
                progress.getLastActivityAt();

        LocalDate today =
                LocalDate.now();

        if (previousActivity == null) {

            progress.setCurrentStreak(1);

        } else {

            LocalDate previousDate =
                    previousActivity.toLocalDate();

            if (previousDate.equals(today)) {

                /*
                 * Same day par streak increase nahi hogi.
                 */

            } else if (previousDate.equals(
                    today.minusDays(1))) {

                progress.setCurrentStreak(
                        progress.getCurrentStreak() + 1
                );

            } else {

                progress.setCurrentStreak(1);
            }
        }

        progress.setCompletedTasks(
                completedTasks
        );

        progress.setTotalTasks(
                totalTasks
        );

        progress.setCompletionPercentage(
                completionPercentage
        );

        progress.setLastActivityAt(
                LocalDateTime.now()
        );

        return progressRepository.save(
                progress
        );
    }
}