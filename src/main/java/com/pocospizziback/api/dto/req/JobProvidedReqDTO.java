package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.domain.TypeService;
import com.pocospizziback.api.model.JobProvided;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobProvidedReqDTO {

    private String client;

    private String numberHouse;

    private String street;

    private String district;

    private String city;

    private String uf;

    private String description;

    private TypeService typeService;

    private Integer perforatedMeters;

    private String observation;

    private Double valueService;

    private List<ProductTempReqDTO> productTempList;

    public JobProvided toEntity(JobProvided entity) {

        entity.setClient(this.client);
        entity.setNumberHouse(this.numberHouse);
        entity.setStreet(this.street);
        entity.setDistrict(this.district);
        entity.setCity(this.city);
        entity.setUf(this.uf);
        entity.setDescription(this.description);
        entity.setTypeService(this.typeService);
        entity.setPerforatedMeters(this.perforatedMeters);
        entity.setObservation(this.observation);
        entity.setValueService(this.valueService);

        return entity;
    }
}
