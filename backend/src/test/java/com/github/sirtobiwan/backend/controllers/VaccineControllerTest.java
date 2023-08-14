package com.github.sirtobiwan.backend.controllers;

import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineWithoutID;
import com.github.sirtobiwan.backend.repo.VaccineRepo;
import com.github.sirtobiwan.backend.service.VaccineService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.time.LocalDate;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
class VaccineControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    VaccineRepo vaccineRepo;

    @Autowired
    private VaccineService vaccineService;

    @Test
    @WithMockUser
    void expectAllVaccines_whenGetRequestForAllVaccines() throws Exception {
        Vaccine newVaccine = new Vaccine("123", "Corona", "Biontech", "2", LocalDate.of(2023, 07, 25), "Dr. Meier", true, LocalDate.of(2024, 07, 25));
        Vaccine newVaccine2 = new Vaccine("456", "Corona", "Johnson", "2", LocalDate.of(2023, 07, 25), "Dr. Meier", true, LocalDate.of(2024, 07, 25));
        vaccineRepo.save(newVaccine);
        vaccineRepo.save(newVaccine2);
        String expectedList = """
                 [
                     {
                         "id":"123",
                         "disease":"Corona", 
                         "vaccination":"Biontech",
                          "batch":"2" ,
                           "vaccineDate":"2023-07-25",
                           "doctor":"Dr. Meier", 
                           "due":true, 
                           "dueDate":"2024-07-25"
                     },
                     {
                         "id":"456",
                         "disease":"Corona", 
                         "vaccination":"Johnson",
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

    @Test
    @DirtiesContext
    @WithMockUser
    void expectNewVaccine_whenAddNewVaccine() throws Exception {
        String expectedVaccine= """
                     [
                     {
                         
                         "disease":"Corona", 
                         "vaccination":"Johnson",
                          "batch":"2" ,
                           "vaccineDate":"2023-07-25",
                           "doctor":"Dr. Meier", 
                           "due":true, 
                           "dueDate":"2024-07-25"
                     }
                     ]
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/vaccine")
                        .contentType(MediaType.APPLICATION_JSON).content("""
                                                                  {
                         
                         "disease":"Corona", 
                         "vaccination":"Johnson",
                          "batch":"2" ,
                           "vaccineDate":"2023-07-25",
                           "doctor":"Dr. Meier", 
                           "due":true, 
                           "dueDate":"2024-07-25"
                     }
                                            """).with(csrf())
                        )

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedVaccine));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectUpdatedVaccine_whenUpdateVaccine()throws Exception{
        VaccineWithoutID newVaccine = new VaccineWithoutID("Corona", "Biontech", "2", LocalDate.of(2023, 07, 25), "Dr. Meier", true, LocalDate.of(2024, 07, 25));
        vaccineService.addVaccine(newVaccine);
        String id = vaccineService.allVaccines().get(0).getId();
        String updatedVaccine = """
                     
                     {
                         "id": "%s",
                         "disease":"Corona", 
                         "vaccination":"Johnson",
                          "batch":"2" ,
                           "vaccineDate":"2023-07-25",
                           "doctor":"Dr. Meier", 
                           "due":true, 
                           "dueDate":"2024-07-25"
                     }
                     
                """.formatted(id);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/vaccine/" + id)
                        .contentType(MediaType.APPLICATION_JSON).content("""
                                                                  {
                         
                         "disease":"Corona", 
                         "vaccination":"Johnson",
                          "batch":"2" ,
                           "vaccineDate":"2023-07-25",
                           "doctor":"Dr. Meier", 
                           "due":true, 
                           "dueDate":"2024-07-25"
                     }
                                            """)
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(updatedVaccine));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectDeletedVaccine_whenDeleteVaccine()throws Exception{
        VaccineWithoutID newVaccine = new VaccineWithoutID("Corona", "Biontech", "2", LocalDate.of(2023, 07, 25), "Dr. Meier", true, LocalDate.of(2024, 07, 25));
        vaccineService.addVaccine(newVaccine);
        String id = vaccineService.allVaccines().get(0).getId();
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/vaccine/" + id) .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
