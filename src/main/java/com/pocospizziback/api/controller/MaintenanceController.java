package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.dto.req.MaintenanceReqDTO;
import com.pocospizziback.api.dto.res.MaintenanceResDTO;
import com.pocospizziback.api.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService service;

    @PostMapping
    public MaintenanceResDTO store(@Valid @RequestBody MaintenanceReqDTO dto) {

        return this.service.save(dto);
    }

    @GetMapping
    public PageRes<MaintenanceResDTO> index(PageReq query) {

        return this.service.findAll(query);
    }

    @GetMapping("/{id}")
    public MaintenanceResDTO show(@PathVariable("id") Long id) {

        return this.service.findByIdDTO(id);
    }

    @PutMapping("/{id}")
    public MaintenanceResDTO update(@PathVariable("id") Long id, @Valid @RequestBody MaintenanceReqDTO dto) {

        return this.service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void logicalExclusion(@PathVariable("id") Long id) {

        this.service.logicalExclusion(id);
    }

}
