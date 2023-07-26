package com.github.sirtobiwan.backend.controllers;

import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.time.LocalDate;

@SpringBootTest
@AutoConfigureMockMvc
class VaccineControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    VaccineRepo vaccineRepo;

    @Test
    void expectAllVaccines_whenGetRequestForAllVaccines() throws Exception {
        Vaccine newVaccine = new Vaccine("123", "Corona", "Biontech", "2", LocalDate.of(2023, 07, 25), "Dr. Meier", true, LocalDate.of(2024, 07, 25));
        Vaccine newVaccine2 = new Vaccine("456", "Corona", "Johnson", "2", LocalDate.of(2023, 07, 25), "Dr. Meier", true, LocalDate.of(2024, 07, 25));
        vaccineRepo.save(newVaccine);
        vaccineRepo.insert(newVaccine2);
        String expectedList = """
                 [
                     {
                         "id":"123",
                         "disease":"Corona", 
                         "vaccine":"Biontech",
                          "batch":"2" ,
                           "vaccineDate":"2023-07-25",
                           "doctor":"Dr. Meier", 
                           "due":true, 
                           "dueDate":"2024-07-25"
                     },
                     {
                         "id":"456",
                         "disease":"Corona", 
                         "vaccine":"Johnson",
                          "batch":"2" ,
                           "vaccineDate":"2023-07-25",
                           "doctor":"Dr. Meier", 
                           "due":true, 
                           "dueDate":"2024-07-25"
                     }
                 ]
                 """;

        mockMvc.perform(MockMvcRequestBuilders.get("/api/vaccine"))

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }
}