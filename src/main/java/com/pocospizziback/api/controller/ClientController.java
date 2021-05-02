package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.dto.req.ClientReqDTO;
import com.pocospizziback.api.dto.res.ClientChoiceResDTO;
import com.pocospizziback.api.dto.res.ClientResDTO;
import com.pocospizziback.api.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientService service;

    @GetMapping
    public PageRes<ClientResDTO> index(PageReq query) {

        return this.service.findAll(query);
    }

    @PostMapping
    public ClientResDTO store(@RequestBody ClientReqDTO dto) {
        return this.service.save(dto);
    }

    @GetMapping("/{id}")
    public ClientResDTO show(@PathVariable("id") Long id) {

        return this.service.findByIdDTO(id);
    }

    @PutMapping("/{id}")
    public ClientResDTO update(@PathVariable("id") Long id, @Valid @RequestBody ClientReqDTO dto) {

        return this.service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void logicalExclusion(@PathVariable("id") Long id) {

        this.service.logicalExclusion(id);
    }

    @GetMapping("/choice")
    public List<ClientChoiceResDTO> findAllChoiceCategory() {

        return this.service.findAllChoice();
    }
}
