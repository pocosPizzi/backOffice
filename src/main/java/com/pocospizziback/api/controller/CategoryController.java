package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.dto.req.CategoryReqDTO;
import com.pocospizziback.api.dto.res.CategoryChoiceResDTO;
import com.pocospizziback.api.dto.res.CategoryResDTO;
import com.pocospizziback.api.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping
    public PageRes<CategoryResDTO> index(PageReq query) {

        return this.service.findAll(query);
    }

    @GetMapping("/choice")
    public List<CategoryChoiceResDTO> findAllChoiceCategory(){

        return this.service.findAllChoice();
    }

    @PostMapping
    public CategoryResDTO store(@Valid @RequestBody CategoryReqDTO dto) {

        return this.service.save(dto);
    }

    @GetMapping("/{id}")
    public CategoryResDTO show(@PathVariable("id") Long id) {

        return this.service.findByIdDTO(id);
    }

    @PutMapping("/{id}")
    public CategoryResDTO update(@PathVariable("id") Long id, @Valid @RequestBody CategoryReqDTO dto) {

        return this.service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void logicalExclusion(@PathVariable("id") Long id) {

        this.service.logicalExclusion(id);
    }

}
