package com.example.hug.service.student;

import com.example.hug.model.Student;
import com.example.hug.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IStudentService extends IGeneralService<Student> {
    Page<Student> findAll(Pageable pageable);
}
