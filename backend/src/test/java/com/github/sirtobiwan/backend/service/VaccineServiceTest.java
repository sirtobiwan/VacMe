package com.github.sirtobiwan.backend.service;

import com.github.sirtobiwan.backend.exceptions.CountryNotFoundException;
import com.github.sirtobiwan.backend.models.Vaccine;
import com.github.sirtobiwan.backend.models.VaccineWithoutID;
import com.github.sirtobiwan.backend.repo.VaccineRepo;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class VaccineServiceTest {
    VaccineRepo vaccineRepo = mock(VaccineRepo.class);
    UuIdService uuIdService = mock(UuIdService.class);
    VaccineService vaccineService = new VaccineService(vaccineRepo, uuIdService);


    @Test
    void expectAllVaccines_whenAllVaccinesAreCalled() {
        //GIVEN
        Vaccine vaccine1 = new Vaccine("123", "Corona", "Biontech", "2", LocalDate.now(), "Dr. Meier", true, LocalDate.now());
        Vaccine vaccine2 = new Vaccine("456", "Corona", "Johnson", "3", LocalDate.now(), "Dr. Meier", true, LocalDate.now());
        List<Vaccine> expectedList = List.of(vaccine1, vaccine2);
        //WHEN
        when(vaccineRepo.findAll()).thenReturn(expectedList);
        List<Vaccine> actualList = vaccineService.allVaccines();
        //THEN
        verify(vaccineRepo).findAll();
        assertEquals(expectedList, actualList);
    }

    @Test
    void expectVaccine_whenAddVaccine() {
        //GIVEN
        VaccineWithoutID vaccineWithoutID = new VaccineWithoutID("Corona", "Biontech", "2", LocalDate.now(), "Dr. Meier", true, LocalDate.now());
        String randomId = "123";
        Vaccine expectedVaccine = new Vaccine(randomId, "Corona", "Biontech", "2", LocalDate.now(), "Dr. Meier", true, LocalDate.now());
        //WHEN
        when(uuIdService.getRandomId()).thenReturn(randomId);
        when(vaccineRepo.insert(any(Vaccine.class))).thenReturn(expectedVaccine);
        Vaccine actualVaccine = vaccineService.addVaccine(vaccineWithoutID);
        //THEN
        verify(uuIdService).getRandomId();
        verify(vaccineRepo).insert(expectedVaccine);
        Assertions.assertEquals(expectedVaccine, actualVaccine);

    }

    @Test
    void expectUpdatedVaccine_whenUpdateVaccine() {
        //GIVEN
        VaccineWithoutID vaccineWithoutID = new VaccineWithoutID("Corona", "Biontech", "2", LocalDate.now(), "Dr. Meier", true, LocalDate.now());
        String randomId = "123";
        Vaccine expectedVaccine = new Vaccine(randomId, "Corona", "Biontech", "2", LocalDate.now(), "Dr. Meier", true, LocalDate.now());
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
    void deleteVaccine_whenDeleteVaccineByIdIsCalled() {
        //GIVEN
        String randomId = "123";
        Vaccine vaccine = new Vaccine(randomId, "Corona", "Biontech", "2", LocalDate.now(), "Dr. Meier", true, LocalDate.now());
        //WHEN
        when(vaccineRepo.findById(randomId)).thenReturn(java.util.Optional.of(vaccine));
        vaccineService.deleteVaccineById(randomId);
        //THEN
        verify(vaccineRepo).findById(randomId);
        verify(vaccineRepo).delete(vaccine);
    }

    @Test
    void expectVaccinationRecommendation_whenCountryIsValid() throws IOException {
        // Given
        String country = "Deutschland";
        Document mockDoc = mock(Document.class);
        Elements mockElements = mock(Elements.class);
        Connection mockConnection = mock(Connection.class);

        when(mockElements.eachText()).thenReturn(List.of("Diphtherie", "Tetanus"));
        when(mockDoc.select("div.col-xs-12 h2:contains(Impfempfehlung) + p + ul li")).thenReturn(mockElements);
        when(mockConnection.get()).thenReturn(mockDoc);

        try (MockedStatic<Jsoup> mockedJsoup = mockStatic(Jsoup.class)) {
            mockedJsoup.when(() -> Jsoup.connect("https://tropeninstitut.de/ihr-reiseziel/" + country)).thenReturn(mockConnection);

            // When
            List<String> actualRecommendations = vaccineService.getVaccinationRecommendation(country);

            // Then
            assertEquals(List.of("Diphtherie", "Tetanus"), actualRecommendations);
        }
    }

    @Test
    void expectCountryNotFoundException_whenCountryIsNotFound() throws IOException {
        // Given
        String country = "NonExistentCountry";
        Connection mockConnection = mock(Connection.class);
        Document mockDoc = mock(Document.class);

        when(mockConnection.get()).thenReturn(mockDoc);
        when(mockDoc.toString()).thenReturn("404 - Seite nicht gefunden");

        try (MockedStatic<Jsoup> mockedJsoup = mockStatic(Jsoup.class)) {
            mockedJsoup.when(() -> Jsoup.connect("https://tropeninstitut.de/ihr-reiseziel/" + country)).thenReturn(mockConnection);

            // When & Then
            assertThrows(CountryNotFoundException.class, () ->
                    vaccineService.getVaccinationRecommendation(country)
            );
        }
    }

    @Test
    void expectCountryNotFoundException_whenCountryIsInvalid() throws IOException {
        // Given
        String invalidCountry = "InvalidCountry";
        Connection mockConnection = mock(Connection.class);

        when(mockConnection.get()).thenThrow(new IOException());

        try (MockedStatic<Jsoup> mockedJsoup = mockStatic(Jsoup.class)) {
            mockedJsoup.when(() -> Jsoup.connect("https://tropeninstitut.de/ihr-reiseziel/" + invalidCountry)).thenReturn(mockConnection);

            // When & Then
            assertThrows(CountryNotFoundException.class, () ->
                    vaccineService.getVaccinationRecommendation(invalidCountry)
            );
        }
    }
    @Test
    void expectInternalServerError_whenUnexpectedExceptionOccurs() {
        // Given
        VaccineWithoutID vaccineWithoutID = new VaccineWithoutID("Corona", "Biontech", "2", LocalDate.now(), "Dr. Meier", true, LocalDate.now());
        when(uuIdService.getRandomId()).thenReturn("123");
        when(vaccineRepo.insert(any(Vaccine.class))).thenThrow(new RuntimeException("Unexpected exception"));

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            vaccineService.addVaccine(vaccineWithoutID);
        });
    }
}
