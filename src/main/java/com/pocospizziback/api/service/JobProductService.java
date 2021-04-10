package com.pocospizziback.api.service;

import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.model.JobProduct;
import com.pocospizziback.api.repository.JobProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobProductService {

    @Autowired
    private JobProductRepository repository;

    public JobProduct save(JobProduct entity) {

        return this.repository.save(entity);
    }

    public JobProduct findById(Long id) {
        return this.repository.findById(id).orElseThrow(
                () -> new ServiceException(Messages.service_produto_not_found));
    }
}
