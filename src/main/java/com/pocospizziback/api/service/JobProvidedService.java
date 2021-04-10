package com.pocospizziback.api.service;

import com.pocospizziback.api.dto.req.JobProvidedReqDTO;
import com.pocospizziback.api.dto.res.JobProvidedResDTO;
import com.pocospizziback.api.model.JobProvided;
import com.pocospizziback.api.repository.JobProvidedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobProvidedService {

    @Autowired
    private JobProvidedRepository repository;

    public JobProvidedResDTO save(JobProvidedReqDTO dto) {

        JobProvided entity = dto.toEntity(new JobProvided());

        return JobProvidedResDTO.of(this.repository.save(entity));
    }
}
