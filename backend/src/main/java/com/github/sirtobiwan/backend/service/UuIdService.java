package com.github.sirtobiwan.backend.service;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@NoArgsConstructor
public class UuIdService {
    public String getRandomId() {
        return UUID.randomUUID().toString();
    }
}

