package com.gr.school_management_system.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gr.school_management_system.dto.LoginRequest;
import com.gr.school_management_system.model.Admin;
import com.gr.school_management_system.repository.AdminRepository;
import com.gr.school_management_system.security.JwtService;

@Service
public class AuthService {

    @Autowired
    private AdminRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtService jwtService;

    public String login(LoginRequest request){

        Optional<Admin> admin =
                repository.findByUsername(
                        request.getUsername());

        if(admin.isEmpty()){
            throw new RuntimeException("Invalid Username");
        }

        boolean isValid =
                encoder.matches(
                        request.getPassword(),
                        admin.get().getPassword());

        if(!isValid){
            throw new RuntimeException("Invalid Password");
        }

        return jwtService.generateToken(
                admin.get().getUsername());

    }

}