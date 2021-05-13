package com.pocospizziback.api.controller;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.domain.TypeJob;
import com.pocospizziback.api.dto.req.JobReqDTO;
import com.pocospizziback.api.dto.req.ProductUsedReqDTO;
import com.pocospizziback.api.dto.res.JobResDTO;
import com.pocospizziback.api.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job-maintenance")
public class JobMaintenanceController {

    @Autowired
    private JobService service;

    @GetMapping
    public PageRes<JobResDTO> index(PageReq query) {

        return this.service.findAll(query, TypeJob.MAINTENANCE);
    }

    @GetMapping("/{id}")
    public JobResDTO show(@PathVariable("id") Long id) {

        return this.service.findByIdDTO(id);
    }

    @PutMapping("/{id}")
    public JobResDTO update(@PathVariable("id") Long id, @RequestBody JobReqDTO dto){
        return this.service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void logicalExclusion(@PathVariable("id") Long id) {

        this.service.logicalExclusion(id);
    }

    //    1 step
    @PostMapping("/client/{idClient}")
    public JobResDTO saveClientInJob(@PathVariable("idClient") Long idClient){
        return this.service.saveClientJob(idClient, TypeJob.MAINTENANCE);
    }

    //    2 step
    @PutMapping("/{idJob}/general")
    public JobResDTO saveGeneralInJob(@PathVariable("idJob") Long idJob, @RequestBody JobReqDTO dto){
        return this.service.saveGeneralMaintenanceInJob(idJob, dto);
    }

    //    3 step
    @PutMapping("/{idJob}/products-used")
    public JobResDTO saveListProductsUsed(@PathVariable("idJob") Long idJob, @RequestBody List<ProductUsedReqDTO> dtos){
        return this.service.saveListProductUsedInJob(idJob, dtos);
    }

    //    4 step
    @PutMapping("/{idJob}/assistance")
    public JobResDTO saveListAssistance(@PathVariable("idJob") Long idJob, @RequestBody List<Long> idAssistanceList){
        return this.service.saveListAssistanceInJob(idJob, idAssistanceList);
    }

    //    5 step
    @PutMapping("/{idJob}/total")
    public JobResDTO saveTotal(@PathVariable("idJob") Long idJob, @RequestBody JobReqDTO dto){
        return this.service.saveTotalInJob(idJob, dto);
    }
}
