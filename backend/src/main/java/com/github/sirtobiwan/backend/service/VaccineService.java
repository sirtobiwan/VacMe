package com.github.sirtobiwan.backend.service;

import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineWithoutID;
import com.github.sirtobiwan.backend.repo.VaccineRepo;
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

    public Vaccine addVaccine(Vaccine newVaccine){
        newVaccine.setId(IdService.uuid());
        vaccineRepo.insert(newVaccine);
        return newVaccine;
    }
}
