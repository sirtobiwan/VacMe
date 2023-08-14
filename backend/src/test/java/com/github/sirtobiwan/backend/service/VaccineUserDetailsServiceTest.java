package com.github.sirtobiwan.backend.service;

import static org.mockito.Mockito.*;

import com.github.sirtobiwan.backend.security.DtoVaccineUser;
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

    VaccineUserDetailsService vaccineUserDetailsService = new VaccineUserDetailsService(vaccineUserRepo , new UuIdService());

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

    @Test
    void register(){
        //GIVEN
        DtoVaccineUser newDtoVaccineUser = new DtoVaccineUser( "TestUser", "123456");
        String expectedUserName = "TestUser";
        //WHEN
        String actualUserName = vaccineUserDetailsService.register(newDtoVaccineUser);
        //THEN
        Assertions.assertEquals(expectedUserName, actualUserName);
    }
}
