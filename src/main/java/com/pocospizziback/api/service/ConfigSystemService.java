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
        oldConfigSystem.setValue0To100PerforatedMeters(configSystem.getValue0To100PerforatedMeters());
        oldConfigSystem.setValue100To150PerforatedMeters(configSystem.getValue100To150PerforatedMeters());
        oldConfigSystem.setValue150To200PerforatedMeters(configSystem.getValue150To200PerforatedMeters());
        oldConfigSystem.setValue200To250PerforatedMeters(configSystem.getValue200To250PerforatedMeters());
        oldConfigSystem.setValue250To300PerforatedMeters(configSystem.getValue250To300PerforatedMeters());

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

    public Double calcTotalValueMechanicalGeoCoatingMeters(Integer meters){
        ConfigSystem config = this.findById(1L);

        return config.getValueMechanicalGeoCoatingMeters()*meters;
    }

    public Double calcTotalValueMetersPerforation(Integer meters){

        ConfigSystem config = this.findById(1L);

        Double result = 0D;

        if(meters <= 100){

            result = config.getValue0To100PerforatedMeters() * meters;

        }else if(meters > 100 && meters <= 150 ){

            result = config.getValue100To150PerforatedMeters() * meters;

        } else if(meters > 150 && meters <= 200){

            result = config.getValue150To200PerforatedMeters() * meters;

        } else if(meters > 200 && meters <= 250){

            result = config.getValue200To250PerforatedMeters() * meters;

        } else if(meters > 250){

            result = config.getValue250To300PerforatedMeters() * meters;

        }

        return result;
    }

    public Double valueMeterPerforation(Integer meters){

        ConfigSystem config = this.findById(1L);

        Double result = 0D;

        if(meters <= 100){

            result = config.getValue0To100PerforatedMeters();

        }else if(meters > 100 && meters <= 150 ){

            result = config.getValue100To150PerforatedMeters();

        } else if(meters > 150 && meters <= 200){

            result = config.getValue150To200PerforatedMeters();

        } else if(meters > 200 && meters <= 250){

            result = config.getValue200To250PerforatedMeters();

        } else if(meters > 250){

            result = config.getValue250To300PerforatedMeters();

        }

        return result;
    }
}
