package com.github.sirtobiwan.backend.controllers;
import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
