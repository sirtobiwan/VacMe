package com.github.sirtobiwan.backend.models;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccineRepo extends MongoRepository<Vaccine, String> {
}
