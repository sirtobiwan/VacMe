package com.github.sirtobiwan.backend.controllers;
import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.service.VaccineService;
import com.github.sirtobiwan.backend.models.VaccineWithoutID;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/vaccine")
public class VaccineController {
    private final VaccineService vaccineService;

    public VaccineController(VaccineService vaccineService) {
        this.vaccineService = vaccineService;
    }

    @GetMapping
    public List<Vaccine> allVaccines(){
        return vaccineService.allVaccines();
    }

    @PostMapping
    public Vaccine addVaccine(@RequestBody VaccineWithoutID newVaccineWithoutID){
        Vaccine newVaccine = new Vaccine("noID", newVaccineWithoutID.getDisease())
        return vaccineService.addVaccine(newVaccine);
}
}
