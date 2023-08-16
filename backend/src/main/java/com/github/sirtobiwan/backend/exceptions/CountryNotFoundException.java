package com.github.sirtobiwan.backend.exceptions;

import org.springframework.web.bind.annotation.ResponseBody;
@ResponseBody
public class CountryNotFoundException extends RuntimeException {

    public CountryNotFoundException(String country) {
        super("Kein Land mit dem Namen " + country + " gefunden.");
    }
}
