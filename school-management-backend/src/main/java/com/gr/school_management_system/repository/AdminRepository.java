package com.gr.school_management_system.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gr.school_management_system.model.Admin;

public interface AdminRepository
        extends MongoRepository<Admin, String> {

    Optional<Admin> findByUsername(String username);

}