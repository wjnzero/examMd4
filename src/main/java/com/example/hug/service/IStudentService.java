package com.example.hug.service;

import com.example.hug.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IStudentService extends IGeneralService<Student>{
    Page<Student> findAll(Pageable pageable);
}
