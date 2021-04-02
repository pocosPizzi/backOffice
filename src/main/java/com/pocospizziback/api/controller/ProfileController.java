package com.pocospizziback.api.controller;

import com.pocospizziback.api.dto.res.UserResDTO;
import com.pocospizziback.api.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public UserResDTO me() {

        return UserResDTO.of(this.profileService.findAuthenticatedUser());
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/logout")
    public void logout() {

        this.profileService.logout();
    }

}
