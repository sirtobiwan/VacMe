package com.github.sirtobiwan.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VaccineWithoutID {
    private String disease;
    private String vaccination;
    private String batch;
    private LocalDate vaccineDate;
    private String doctor;
    private Boolean due;
    private LocalDate dueDate;
}
