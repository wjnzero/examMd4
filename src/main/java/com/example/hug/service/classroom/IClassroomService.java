package com.example.hug.service.classroom;

import com.example.hug.model.Classroom;
import com.example.hug.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IClassroomService extends IGeneralService<Classroom> {
    Page<Classroom> findAll(Pageable pageable);
}
