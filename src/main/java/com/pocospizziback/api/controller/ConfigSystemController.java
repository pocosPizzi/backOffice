package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.model.ConfigSystem;
import com.pocospizziback.api.service.ConfigSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/config-system")
public class ConfigSystemController {

    @Autowired
    private ConfigSystemService service;

    @GetMapping("/{id}")
    public ConfigSystem findById(@PathVariable("id") Long id){
        return this.service.findById(id);
    }

    @GetMapping
    public PageRes<ConfigSystem> index(PageReq query) {

        return this.service.findAll(query);
    }

    @PutMapping("/{id}")
    public ConfigSystem update(@PathVariable("id") Long id, @RequestBody ConfigSystem configSystem){
        return this.service.update(id, configSystem);
    }
}
