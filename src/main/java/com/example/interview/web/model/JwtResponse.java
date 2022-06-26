package com.example.interview.web.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private UserResource user;

    public JwtResponse(String token, UserResource user) {
        this.token = token;
        this.user = user;
    }
}