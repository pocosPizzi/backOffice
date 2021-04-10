package com.pocospizziback.api.controller;

import com.pocospizziback.api.dto.req.JobProvidedReqDTO;
import com.pocospizziback.api.dto.res.JobProvidedResDTO;
import com.pocospizziback.api.service.JobProvidedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/jobs-provided")
public class JobProvidedController {

    @Autowired
    private JobProvidedService service;

    @PostMapping
    public JobProvidedResDTO store(@Valid @RequestBody JobProvidedReqDTO dto) {
        return this.service.save(dto);
    }

}
