package com.gr.school_management_system.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentResponse {

    private String id;
    private String studentId;
    private String fullName;
    private String emailAddress;
    private String phoneNumber;
    private String course;
    private int age;
    private String gender;
    private String address;
}