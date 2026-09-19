package com.edupath.repository;

import com.edupath.entity.SkillGap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SkillGapRepository extends JpaRepository<SkillGap, UUID> {

    List<SkillGap> findByLearnerProfileId(UUID learnerProfileId);

    List<SkillGap> findBySkillId(UUID skillId);
}