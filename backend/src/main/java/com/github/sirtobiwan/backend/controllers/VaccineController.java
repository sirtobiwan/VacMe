package com.github.sirtobiwan.backend.controllers;
import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.service.VaccineService;
import com.github.sirtobiwan.backend.models.VaccineWithoutID;
import org.jsoup.Jsoup;

import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
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
        return this.vaccineService.allVaccines();
    }

    @PostMapping
    public List<Vaccine> addVaccine (@RequestBody VaccineWithoutID vaccineWithoutID){
        this.vaccineService.addVaccine(vaccineWithoutID);
        return this.vaccineService.allVaccines();}

    @PutMapping("/{id}")
    public Vaccine updateVaccineById(@PathVariable String id, @RequestBody VaccineWithoutID vaccineWithoutID) {
        return vaccineService.updateVaccineById(vaccineWithoutID, id);
    }

    @DeleteMapping("/{id}")
    public void deleteVaccineById(@PathVariable String id){
        this.vaccineService.deleteVaccineById(id);
    }

    @GetMapping("/recommendation/{country}")
    public List<String> getVaccinationRecommendation(@PathVariable String country) {
        try {
            String url = "https://tropeninstitut.de/ihr-reiseziel/" + country;
            Document doc = Jsoup.connect(url).get();
            Elements elements = doc.select("div.col-xs-12 h2:contains(Impfempfehlung) + p + ul li");
            return elements.eachText();
        } catch (Exception e) {
            throw new RuntimeException("Fehler beim Abrufen der Impfempfehlung", e);
        }
    }
}
