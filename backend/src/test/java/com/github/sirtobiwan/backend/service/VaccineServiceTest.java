package com.github.sirtobiwan.backend.service;

import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineRepo;
import com.github.sirtobiwan.backend.models.VaccineService;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class VaccineServiceTest {
    VaccineRepo vaccineRepo = mock(VaccineRepo.class);
    VaccineService vaccineService = new VaccineService(vaccineRepo);

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
}