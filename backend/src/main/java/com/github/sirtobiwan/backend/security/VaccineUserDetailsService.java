package com.github.sirtobiwan.backend.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class VaccineUserDetailsService implements UserDetailsService {
    private final VaccineUserRepo vaccineUserRepo;

    public VaccineUserDetailsService(VaccineUserRepo vaccineUserRepo) {
        this.vaccineUserRepo = vaccineUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        VaccineUser vaccineUser = vaccineUserRepo.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Username: " + username + " not found!"));
        return new User(vaccineUser.username(), vaccineUser.password(), Collections.emptyList());
    }
}
