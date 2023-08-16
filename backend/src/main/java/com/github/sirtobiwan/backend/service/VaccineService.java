package com.github.sirtobiwan.backend.service;
import com.github.sirtobiwan.backend.exceptions.CountryNotFoundException;
import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineWithoutID;
import com.github.sirtobiwan.backend.repo.VaccineRepo;
import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
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

    public List<String> getVaccinationRecommendation(String country) {
        try {
            String url = "https://tropeninstitut.de/ihr-reiseziel/" + country;
            Document doc = Jsoup.connect(url).get();
            Elements elements = doc.select("div.col-xs-12 h2:contains(Impfempfehlung) + p + ul li");
            List<String> recommendations = elements.eachText();
            if(recommendations.isEmpty()) {
                throw new CountryNotFoundException(country);
            }
            return recommendations;
        } catch (HttpStatusException e) {
            if (e.getStatusCode() == 404) {
                throw new CountryNotFoundException(country);
            }
            throw new RuntimeException("HTTP-Fehler beim Abrufen der Impfempfehlung", e);
        } catch (CountryNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Fehler beim Abrufen der Impfempfehlung", e);
        }
    }





}
