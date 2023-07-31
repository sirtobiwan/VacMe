package com.github.sirtobiwan.backend.service;

import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineWithoutID;
import com.github.sirtobiwan.backend.repo.VaccineRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaccineService {
    private final VaccineRepo vaccineRepo;
    private final UuIdService uuIdService;

    public VaccineService(VaccineRepo vaccineRepo, UuIdService uuidIdService) {
        this.vaccineRepo = vaccineRepo;
        this.uuIdService = uuidIdService;
    }

    public List<Vaccine> allVaccines(){
        return vaccineRepo.findAll();
    }

    public Vaccine addVaccine(VaccineWithoutID vaccineWithoutID){
        String id = uuIdService.getRandomId();
        Vaccine vaccine = new Vaccine(id, vaccineWithoutID.getDisease(), vaccineWithoutID.getVaccination(), vaccineWithoutID.getBatch(), vaccineWithoutID.getVaccineDate(), vaccineWithoutID.getDoctor(), vaccineWithoutID.getDue(), vaccineWithoutID.getDueDate());
        return this.vaccineRepo.insert(vaccine);
    }
}
