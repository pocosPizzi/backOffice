package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.dto.req.ProductReqDTO;
import com.pocospizziback.api.dto.res.ProductResDTO;
import com.pocospizziback.api.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@PreAuthorize("hasAuthority('ADMIN')")
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public PageRes<ProductResDTO> index(PageReq query) {

        return this.service.findAll(query);
    }

    @PostMapping
    public ProductResDTO store(@Valid @RequestBody ProductReqDTO dto) {

        return this.service.save(dto);
    }

    @GetMapping("/{id}")
    public ProductResDTO show(@PathVariable("id") Long id) {

        return this.service.findByIdDTO(id);
    }

    @PutMapping("/{id}")
    public ProductResDTO update(@PathVariable("id") Long id, @Valid @RequestBody ProductReqDTO dto) {

        return this.service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void logicalExclusion(@PathVariable("id") Long id) {

        this.service.logicalExclusion(id);
    }
}
