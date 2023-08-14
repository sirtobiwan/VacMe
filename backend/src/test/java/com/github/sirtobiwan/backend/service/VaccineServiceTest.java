package com.github.sirtobiwan.backend.service;

import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineWithoutID;
import com.github.sirtobiwan.backend.repo.VaccineRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class VaccineServiceTest {
    VaccineRepo vaccineRepo = mock(VaccineRepo.class);
    UuIdService uuIdService = mock(UuIdService.class);
    VaccineService vaccineService = new VaccineService(vaccineRepo, uuIdService);


    @Test
    void expectAllVaccines_whenAllVaccinesAreCalled() {
        //GIVEN
        Vaccine vaccine1 = new Vaccine("123","Corona", "Biontech", "2" , LocalDate.now(),"Dr. Meier", true, LocalDate.now());
        Vaccine vaccine2 = new Vaccine("456","Corona", "Johnson", "3" , LocalDate.now(),"Dr. Meier", true, LocalDate.now());
        List<Vaccine> expectedList = List.of(vaccine1, vaccine2);
        //WHEN
        when(vaccineRepo.findAll()).thenReturn(expectedList);
        List<Vaccine> actualList = vaccineService.allVaccines();
        //THEN
        verify(vaccineRepo).findAll();
        assertEquals(expectedList, actualList);
    }

    @Test
    void expectVaccine_whenAddVaccine(){
        //GIVEN
        VaccineWithoutID vaccineWithoutID = new VaccineWithoutID("Corona", "Biontech", "2" , LocalDate.now(),"Dr. Meier", true, LocalDate.now());
        String randomId = "123";
        Vaccine expectedVaccine = new Vaccine(randomId,"Corona", "Biontech", "2" , LocalDate.now(),"Dr. Meier", true, LocalDate.now());
        //WHEN
        when(uuIdService.getRandomId()).thenReturn(randomId);
        when(vaccineRepo.insert(expectedVaccine)).thenReturn(expectedVaccine);
        Vaccine actualVaccine = vaccineService.addVaccine(vaccineWithoutID);
        //THEN
        verify(uuIdService).getRandomId();
        verify(vaccineRepo).insert(expectedVaccine);
        Assertions.assertEquals(expectedVaccine, actualVaccine);

    }

    @Test
    void expectUpdatedVaccine_whenUpdateVaccine(){
        //GIVEN
        VaccineWithoutID vaccineWithoutID = new VaccineWithoutID("Corona", "Biontech", "2" , LocalDate.now(),"Dr. Meier", true, LocalDate.now());
        String randomId = "123";
        Vaccine expectedVaccine = new Vaccine(randomId,"Corona", "Biontech", "2" , LocalDate.now(),"Dr. Meier", true, LocalDate.now());
        //WHEN
        when(vaccineRepo.findById(randomId)).thenReturn(java.util.Optional.of(expectedVaccine));
        when(vaccineRepo.save(expectedVaccine)).thenReturn(expectedVaccine);
        Vaccine actualVaccine = vaccineService.updateVaccineById(vaccineWithoutID, randomId);
        //THEN
        verify(vaccineRepo).findById(randomId);
        verify(vaccineRepo).save(expectedVaccine);
        assertEquals(expectedVaccine, actualVaccine);
    }

    @Test
    void deleteVaccine_whenDeleteVaccineByIdIsCalled(){
        //GIVEN
        String randomId = "123";
        Vaccine vaccine = new Vaccine(randomId,"Corona", "Biontech", "2" , LocalDate.now(),"Dr. Meier", true, LocalDate.now());
        //WHEN
        when(vaccineRepo.findById(randomId)).thenReturn(java.util.Optional.of(vaccine));
        vaccineService.deleteVaccineById(randomId);
        //THEN
        verify(vaccineRepo).findById(randomId);
        verify(vaccineRepo).delete(vaccine);
    }
}