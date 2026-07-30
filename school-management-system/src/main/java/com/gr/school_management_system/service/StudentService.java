package com.gr.school_management_system.service;

import com.gr.school_management_system.dto.StudentRequest;
import com.gr.school_management_system.dto.StudentResponse;

import java.util.List;

public interface StudentService {

    StudentResponse createStudent(StudentRequest request);

    List<StudentResponse> getAllStudents();

    StudentResponse getStudentById(String id);

    StudentResponse updateStudent(
            String id,
            StudentRequest request
    );

    void deleteStudent(String id);
}