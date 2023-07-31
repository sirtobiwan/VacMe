package com.github.sirtobiwan.backend.service;

import java.util.UUID;

public class IdService {
    private IdService() {
    }

    public static String uuid(){
        return UUID.randomUUID().toString();
    }
}

