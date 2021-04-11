package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.dto.req.PerforationReqDTO;
import com.pocospizziback.api.dto.res.PerforationResDTO;
import com.pocospizziback.api.service.PerforationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/perforations")
public class PerforationController {

    @Autowired
    private PerforationService service;

    @PostMapping
    public PerforationResDTO store(@Valid @RequestBody PerforationReqDTO dto) {
        return this.service.save(dto);
    }

    @GetMapping
    public PageRes<PerforationResDTO> index(PageReq query) {
        return this.service.findAll(query);
    }

    @GetMapping("/{id}")
    public PerforationResDTO show(@PathVariable("id") Long id) {

        return this.service.findByIdDTO(id);
    }

    @PutMapping("/{id}")
    public PerforationResDTO update(@PathVariable("id") Long id, @Valid @RequestBody PerforationReqDTO dto) {

        return this.service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void logicalExclusion(@PathVariable("id") Long id) {

        this.service.logicalExclusion(id);
    }

}
