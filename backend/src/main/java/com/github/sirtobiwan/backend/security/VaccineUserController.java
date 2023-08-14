package com.github.sirtobiwan.backend.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class VaccineUserController {
    private final VaccineUserDetailsService vaccineUserDetailsService;

    public VaccineUserController(VaccineUserDetailsService vaccineUserDetailsService) {
        this.vaccineUserDetailsService = vaccineUserDetailsService;
    }

    @GetMapping("me")
    public String getUserInfo() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/login")
    public String login(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }


    @PostMapping("/register")
    public String register(@RequestBody DtoVaccineUser dtoVaccineUser) {
        return vaccineUserDetailsService.register(dtoVaccineUser);
    }


}
