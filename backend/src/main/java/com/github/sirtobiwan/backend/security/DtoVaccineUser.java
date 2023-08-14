package com.github.sirtobiwan.backend.security;

import org.springframework.data.annotation.Id;

public record DtoVaccineUser(@Id
                             String id,
                             String username,
                             String password) {
}
