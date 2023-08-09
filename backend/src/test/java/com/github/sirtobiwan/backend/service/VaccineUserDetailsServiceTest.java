package com.github.sirtobiwan.backend.service;

import static org.mockito.Mockito.*;

import com.github.sirtobiwan.backend.security.VaccineUser;
import com.github.sirtobiwan.backend.security.VaccineUserDetailsService;
import com.github.sirtobiwan.backend.security.VaccineUserRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;


class VaccineUserDetailsServiceTest {
    VaccineUserRepo vaccineUserRepo = mock(VaccineUserRepo.class);

    VaccineUserDetailsService vaccineUserDetailsService = new VaccineUserDetailsService(vaccineUserRepo);

    @Test
    void loadUserByUsername() {
        String givenUserName = "hans";
        VaccineUser expectedUser = new VaccineUser("123", "hans", "hans1");
        when(vaccineUserRepo.findByUsername(givenUserName)).thenReturn(Optional.of(expectedUser));
        UserDetails actualUser = vaccineUserDetailsService.loadUserByUsername(givenUserName);
        verify(vaccineUserRepo).findByUsername(givenUserName);
        Assertions.assertEquals(givenUserName, actualUser.getUsername());
    }

    @Test
    void expectUsernameNotFoundException_whenFindByUsername() {
        Assertions.assertThrows(UsernameNotFoundException.class, () -> vaccineUserDetailsService.loadUserByUsername("fritz"));
    }
}
