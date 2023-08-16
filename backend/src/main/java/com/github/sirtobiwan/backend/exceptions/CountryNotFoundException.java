package com.github.sirtobiwan.backend.exceptions;

public class CountryNotFoundException extends RuntimeException {
    public CountryNotFoundException(String country) {
        super("Kein Land mit dem Namen " + country + " gefunden.");
    }
}
