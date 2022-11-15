package com.example.hug.controller;

import com.example.hug.model.Classroom;
import com.example.hug.model.Student;
import com.example.hug.service.classroom.IClassroomService;
import com.example.hug.service.student.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/classroom")
@CrossOrigin("*")
public class ClassroomController {
    @Autowired
    private IClassroomService classroomService;

    @GetMapping
    public ResponseEntity<Iterable<Classroom>> findAllClass(Pageable pageable) {
        Page<Classroom> classrooms = classroomService.findAll(pageable);
        if (classrooms.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(classrooms, HttpStatus.OK);
    }
}
