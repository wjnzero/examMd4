package com.example.hug.repository;

import com.example.hug.model.Classroom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IClassroomRepository extends JpaRepository<Classroom,Long> {
    Page<Classroom> findAll(Pageable pageable);
}
