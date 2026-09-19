package com.edupath.service;

import com.edupath.entity.Roadmap;
import com.edupath.entity.RoadmapTask;
import com.edupath.entity.Skill;
import com.edupath.repository.RoadmapTaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoadmapTaskService {

    private final RoadmapTaskRepository roadmapTaskRepository;
    private final ProgressService progressService;

    public RoadmapTaskService(
            RoadmapTaskRepository roadmapTaskRepository,
            ProgressService progressService) {

        this.roadmapTaskRepository =
                roadmapTaskRepository;

        this.progressService =
                progressService;
    }

    public RoadmapTask createTask(RoadmapTask task) {
        return roadmapTaskRepository.save(task);
    }

    public List<RoadmapTask> getAllTasks() {
        return roadmapTaskRepository.findAll();
    }

    public Optional<RoadmapTask> getTaskById(UUID id) {
        return roadmapTaskRepository.findById(id);
    }

    public List<RoadmapTask> getTasksByRoadmap(
            UUID roadmapId) {

        return roadmapTaskRepository
                .findByRoadmapId(roadmapId);
    }

    public List<RoadmapTask> getTasksBySkill(
            UUID skillId) {

        return roadmapTaskRepository
                .findBySkillId(skillId);
    }

    public List<RoadmapTask> getTasksByStatus(
            UUID roadmapId,
            String status) {

        return roadmapTaskRepository
                .findByRoadmapIdAndStatus(
                        roadmapId,
                        status
                );
    }

    public RoadmapTask updateTask(
            RoadmapTask task) {

        return roadmapTaskRepository.save(task);
    }

    public List<RoadmapTask> generateTasks(
            Roadmap roadmap,
            List<Skill> prioritySkills) {

        List<RoadmapTask> tasks =
                new ArrayList<>();

        if (roadmap == null
                || roadmap.getId() == null) {

            throw new RuntimeException(
                    "Roadmap is required to generate tasks."
            );
        }

        if (prioritySkills == null
                || prioritySkills.isEmpty()) {

            return tasks;
        }

        int dayNumber = 1;

        for (Skill skill : prioritySkills) {

            if (skill == null) {
                continue;
            }

            RoadmapTask task =
                    new RoadmapTask();

            task.setRoadmap(roadmap);
            task.setSkill(skill);
            task.setDayNumber(dayNumber);

            task.setTitle(
                    "Learn "
                            + skill.getName()
                            + " Fundamentals"
            );

            task.setDescription(
                    "Study the core concepts of "
                            + skill.getName()
                            + ", understand the fundamentals, "
                            + "and practice basic problems."
            );

            task.setEstimatedMinutes(60);

            task.setStatus(
                    dayNumber == 1
                            ? "IN_PROGRESS"
                            : "LOCKED"
            );

            RoadmapTask savedTask =
                    roadmapTaskRepository.save(task);

            tasks.add(savedTask);

            dayNumber++;
        }

        return tasks;
    }

    public RoadmapTask startTask(UUID taskId) {

        RoadmapTask task =
                roadmapTaskRepository
                        .findById(taskId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Roadmap task not found."
                                )
                        );

        task.setStatus("IN_PROGRESS");

        return roadmapTaskRepository.save(task);
    }

    public RoadmapTask completeTask(UUID taskId) {

        RoadmapTask task =
                roadmapTaskRepository
                        .findById(taskId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Roadmap task not found."
                                )
                        );

        task.setStatus("COMPLETED");

        RoadmapTask completedTask =
                roadmapTaskRepository.save(task);

        /*
         * Next task unlock.
         */
        unlockNextTask(
                completedTask
        );

        /*
         * Database progress update.
         */
        progressService.updateProgressFromTask(
                completedTask
        );

        return completedTask;
    }

    private void unlockNextTask(
            RoadmapTask completedTask) {

        if (completedTask.getRoadmap() == null) {
            return;
        }

        UUID roadmapId =
                completedTask
                        .getRoadmap()
                        .getId();

        List<RoadmapTask> tasks =
                roadmapTaskRepository
                        .findByRoadmapId(
                                roadmapId
                        );

        int completedDay =
                completedTask.getDayNumber();

        for (RoadmapTask task : tasks) {

            if (task.getDayNumber() != null
                    && task.getDayNumber()
                    == completedDay + 1
                    && "LOCKED".equals(
                            task.getStatus())) {

                task.setStatus(
                        "IN_PROGRESS"
                );

                roadmapTaskRepository.save(
                        task
                );

                break;
            }
        }
    }
}