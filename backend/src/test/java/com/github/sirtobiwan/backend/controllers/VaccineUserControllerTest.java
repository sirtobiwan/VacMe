package com.github.sirtobiwan.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
class VaccineUserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void getAnonymousUser_whenEndpointIsCalled() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(
                        "anonymousUser"));
    }

    @Test
    @WithMockUser(username = "hans")
    void getUsername_whenEndpointIsCalled() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(
                        "hans"));
    }

}