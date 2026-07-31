package com.gr.school_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gr.school_management_system.dto.LoginRequest;
import com.gr.school_management_system.dto.LoginResponse;
import com.gr.school_management_system.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request){

        String token = authService.login(request);

        return ResponseEntity.ok(
                new LoginResponse(token));

    }

}