package com.gr.school_management_system.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class StudentRequest {

    @NotBlank
    private String studentId;

    @NotBlank
    private String fullName;

    @Email
    private String emailAddress;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String course;

    @Min(1)
    private int age;

    @NotBlank
    private String gender;

    @NotBlank
    private String address;
}