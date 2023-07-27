package com.github.sirtobiwan.backend.models;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VaccineService {
    private final VaccineRepo vaccineRepo;

    public List<Vaccine> allVaccines(){
        return vaccineRepo.findAll();
    }
}
