package com.example.hug.model;


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name ="student" )
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDate dateBirth;
    private String phone;
    private String email;
    @ManyToOne
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    public Student(String name, LocalDate dateBirth, String phone, String email, Classroom aClassroom) {
        this.name = name;
        this.dateBirth = dateBirth;
        this.phone = phone;
        this.email = email;
        classroom = aClassroom;
    }

    public Student() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateBirth() {
        return dateBirth;
    }

    public void setDateBirth(LocalDate dateBirth) {
        this.dateBirth = dateBirth;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }
}
