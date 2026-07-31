package com.gr.school_management_system.repository;

import com.gr.school_management_system.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository
        extends MongoRepository<Student, String> {

}