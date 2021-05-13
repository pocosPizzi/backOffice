package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.dto.req.AssistanceReqDTO;
import com.pocospizziback.api.dto.res.*;
import com.pocospizziback.api.service.AssistanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/assistance")
public class AssistanceController {

    @Autowired
    private AssistanceService service;

    @GetMapping
    public PageRes<AssistanceResDTO> index(PageReq query) {

        return this.service.findAll(query);
    }

    @PostMapping
    public AssistanceResDTO store(@Valid @RequestBody AssistanceReqDTO dto) {

        return this.service.save(dto);
    }

    @GetMapping("/{id}")
    public AssistanceResDTO show(@PathVariable("id") Long id) {

        return this.service.findByIdDTO(id);
    }

    @GetMapping("/choice")
    public List<AssistanceChoiceResDTO> choiceProduct(){

        return this.service.findAllChoice();
    }

    @PutMapping("/{id}")
    public AssistanceResDTO update(@PathVariable("id") Long id, @Valid @RequestBody AssistanceReqDTO dto) {

        return this.service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void logicalExclusion(@PathVariable("id") Long id) {

        this.service.logicalExclusion(id);
    }
}
