package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.dto.req.BillReqDTO;
import com.pocospizziback.api.dto.res.BillResDTO;
import com.pocospizziback.api.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillService service;

    @PostMapping
    public BillResDTO store(@Valid @RequestBody BillReqDTO dto) {

        return this.service.save(dto);
    }

    @GetMapping
    public PageRes<BillResDTO> index(PageReq query) {

        return this.service.findAll(query);
    }

    @GetMapping("/{id}")
    public BillResDTO show(@PathVariable("id") Long id) {

        return this.service.findByIdDTO(id);
    }

    @PutMapping("/{id}")
    public BillResDTO update(@PathVariable("id") Long id, @Valid @RequestBody BillReqDTO dto) {

        return this.service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void logicalExclusion(@PathVariable("id") Long id) {

        this.service.logicalExclusion(id);
    }
}
