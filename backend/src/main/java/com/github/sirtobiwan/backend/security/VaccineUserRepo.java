package com.github.sirtobiwan.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VaccineUserRepo extends MongoRepository<VaccineUser, String> {
    Optional<VaccineUser> findByUsername(String username);
}
