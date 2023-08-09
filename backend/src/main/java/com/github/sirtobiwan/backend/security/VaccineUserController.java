package com.github.sirtobiwan.backend.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/users")
public class VaccineUserController {
    @GetMapping("me")
    public String getUserInfo() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
}
