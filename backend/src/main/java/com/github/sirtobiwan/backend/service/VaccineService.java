package com.github.sirtobiwan.backend.service;
import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineWithoutID;
import com.github.sirtobiwan.backend.repo.VaccineRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

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

    public Vaccine updateVaccineById(VaccineWithoutID vaccineWithoutID, String id) {
        Vaccine vaccine = this.vaccineRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Vaccine with ID " + id + " not found"));

        Vaccine updateVaccine = new Vaccine(vaccine.getId(), vaccineWithoutID.getDisease(), vaccineWithoutID.getVaccination(), vaccineWithoutID.getBatch(), vaccineWithoutID.getVaccineDate(), vaccineWithoutID.getDoctor(), vaccineWithoutID.getDue(), vaccineWithoutID.getDueDate());

        return this.vaccineRepo.save(updateVaccine);
    }

    public void deleteVaccineById(String idToDelete){
        Vaccine vaccine = this.vaccineRepo.findById(idToDelete)
                .orElseThrow(() -> new NoSuchElementException("Vaccine with ID " + idToDelete + " not found"));
        this.vaccineRepo.delete(vaccine);
    }


}
