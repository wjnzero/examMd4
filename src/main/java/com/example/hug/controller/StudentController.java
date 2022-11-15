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
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/student")
@CrossOrigin("*")
public class StudentController {
    @Autowired
    private IStudentService studentService;
    @Autowired
    private IClassroomService classroomService;

    @GetMapping
    public ResponseEntity<Iterable<Student>> findAllStudent(Pageable pageable) {
        Page<Student> students = studentService.findAll(pageable);
        if (students.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> findStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.findById(id);
        if (!student.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(student.get(), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Student> saveStudent(@RequestBody Student student) {
        long temp = Long.parseLong((student.getClassroom()).getName());
        student.setClassroom(classroomService.findById(temp).get());
        return new ResponseEntity<>(  studentService.save(student),HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Optional<Student> student1 = studentService.findById(id);
        if (!student1.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        student.setId(student1.get().getId());
        long temp = Long.parseLong((student.getClassroom()).getName());
        student.setClassroom(classroomService.findById(temp).get());
        return new ResponseEntity<>(studentService.save(student), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Student> deleteStudent(@PathVariable Long id) {
        Optional<Student> student = studentService.findById(id);
        if (!student.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        studentService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
