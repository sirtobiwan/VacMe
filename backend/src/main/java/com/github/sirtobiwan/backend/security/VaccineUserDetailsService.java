package com.github.sirtobiwan.backend.security;

import com.github.sirtobiwan.backend.service.UuIdService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class VaccineUserDetailsService implements UserDetailsService {
    private final VaccineUserRepo vaccineUserRepo;

    private final PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    public VaccineUserDetailsService(VaccineUserRepo vaccineUserRepo) {
        this.vaccineUserRepo = vaccineUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        VaccineUser vaccineUser = vaccineUserRepo.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Username: " + username + " not found!"));
        return new User(vaccineUser.username(), vaccineUser.password(), Collections.emptyList());
    }

    public String register(VaccineUser vaccineUser) {
        String hashedPassword = encoder.encode(vaccineUser.password());
        VaccineUser newVaccineUser = new VaccineUser(UuIdService.getRandomId() ,vaccineUser.username(), hashedPassword);
        vaccineUserRepo.insert(newVaccineUser);
        return newVaccineUser.username();
    }
}
