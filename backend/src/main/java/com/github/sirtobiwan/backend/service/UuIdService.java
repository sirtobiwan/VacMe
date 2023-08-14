package com.github.sirtobiwan.backend.service;

import org.springframework.stereotype.Service;
import java.util.UUID;

@Service

public class UuIdService {
    public String getRandomId() {
        return UUID.randomUUID().toString();
    }
}

