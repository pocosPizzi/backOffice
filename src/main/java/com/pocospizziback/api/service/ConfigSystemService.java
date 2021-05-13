package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.model.ConfigSystem;
import com.pocospizziback.api.repository.ConfigSystemRepository;
import com.pocospizziback.api.util.SearchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ConfigSystemService {

    @Autowired
    private ConfigSystemRepository repository;

    public ConfigSystem save(ConfigSystem configSystem) {
        return this.repository.save(configSystem);
    }

    public ConfigSystem findById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.config_not_found));
    }

    public ConfigSystem update(Long id, ConfigSystem configSystem) {

        ConfigSystem oldConfigSystem = this.findById(id);

        oldConfigSystem.setValueMechanicalGeoCoatingMeters(configSystem.getValueMechanicalGeoCoatingMeters());
        oldConfigSystem.setValuePerforatedMeters(configSystem.getValuePerforatedMeters());

        return this.save(configSystem);
    }

    public PageRes<ConfigSystem> findAll(PageReq query) {

        Specification<ConfigSystem> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<ConfigSystem> filters = SearchUtils.specByFilter(query.getFilter(), "id");
        Page<ConfigSystem> page = this.repository.findAll(deleted.and(filters), query.toPageRequest());

        return new PageRes<>(page.getContent(),
                page.getTotalElements(), page.getTotalPages());
    }

    public Boolean verifyBaseIsEmpty(){
        return this.repository.findAll().isEmpty() ? true : false;
    }
}
