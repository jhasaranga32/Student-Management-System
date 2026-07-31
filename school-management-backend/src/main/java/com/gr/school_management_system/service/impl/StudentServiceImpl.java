package com.gr.school_management_system.service.impl;

import com.gr.school_management_system.dto.StudentRequest;
import com.gr.school_management_system.dto.StudentResponse;
import com.gr.school_management_system.model.Student;
import com.gr.school_management_system.repository.StudentRepository;
import com.gr.school_management_system.service.StudentService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl
        implements StudentService {

    private final StudentRepository repository;

    @Override
    public StudentResponse createStudent(StudentRequest request) {

        Student student = Student.builder()
                .studentId(request.getStudentId())
                .fullName(request.getFullName())
                .emailAddress(request.getEmailAddress())
                .phoneNumber(request.getPhoneNumber())
                .course(request.getCourse())
                .age(request.getAge())
                .gender(request.getGender())
                .address(request.getAddress())
                .build();

        repository.save(student);

        return mapToResponse(student);
    }


    @Override
    public List<StudentResponse> getAllStudents() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public StudentResponse getStudentById(String id) {

        Student student =
                repository.findById(id)
                        .orElseThrow();

        return mapToResponse(student);
    }


    @Override
    public StudentResponse updateStudent(
            String id,
            StudentRequest request
    ) {

        Student student =
                repository.findById(id)
                        .orElseThrow();

        student.setStudentId(request.getStudentId());
        student.setFullName(request.getFullName());
        student.setEmailAddress(request.getEmailAddress());
        student.setPhoneNumber(request.getPhoneNumber());
        student.setCourse(request.getCourse());
        student.setAge(request.getAge());
        student.setGender(request.getGender());
        student.setAddress(request.getAddress());

        repository.save(student);

        return mapToResponse(student);
    }


    @Override
    public void deleteStudent(String id) {
        repository.deleteById(id);
    }


    private StudentResponse mapToResponse(Student student) {

        return StudentResponse.builder()
                .id(student.getId())
                .studentId(student.getStudentId())
                .fullName(student.getFullName())
                .emailAddress(student.getEmailAddress())
                .phoneNumber(student.getPhoneNumber())
                .course(student.getCourse())
                .age(student.getAge())
                .gender(student.getGender())
                .address(student.getAddress())
                .build();
    }

}