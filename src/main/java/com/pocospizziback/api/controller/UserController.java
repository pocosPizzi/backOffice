package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.dto.req.UserReqDTO;
import com.pocospizziback.api.dto.res.UserResDTO;
import com.pocospizziback.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@PreAuthorize("hasAuthority('ADMIN')")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public PageRes<UserResDTO> index(PageReq query) {

        return this.service.findAll(query);
    }

    @PostMapping
    public UserResDTO store(@Valid @RequestBody UserReqDTO dto) {

        return this.service.save(dto);
    }

    @GetMapping("/{id}")
    public UserResDTO show(@PathVariable("id") Long id) {

        return this.service.findByIdDto(id);
    }

    @PutMapping("/{id}")
    public UserResDTO update(@PathVariable("id") Long id, @Valid @RequestBody UserReqDTO dto) {

        return this.service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void logicalExclusion(@PathVariable("id") Long id) {

        this.service.logicalExclusion(id);
    }

}
