package com.gr.school_management_system.controller;

import com.gr.school_management_system.dto.StudentRequest;
import com.gr.school_management_system.dto.StudentResponse;
import com.gr.school_management_system.service.StudentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService service;


    @PostMapping
    public StudentResponse createStudent(
            @Valid @RequestBody StudentRequest request
    ) {
        return service.createStudent(request);
    }


    @GetMapping
    public List<StudentResponse> getAllStudents() {
        return service.getAllStudents();
    }


    @GetMapping("/{id}")
    public StudentResponse getStudentById(
            @PathVariable String id
    ) {
        return service.getStudentById(id);
    }


    @PutMapping("/{id}")
    public StudentResponse updateStudent(
            @PathVariable String id,
            @RequestBody StudentRequest request
    ) {
        return service.updateStudent(id, request);
    }


    @DeleteMapping("/{id}")
    public void deleteStudent(
            @PathVariable String id
    ) {
        service.deleteStudent(id);
    }

}