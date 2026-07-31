package com.gr.school_management_system.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
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