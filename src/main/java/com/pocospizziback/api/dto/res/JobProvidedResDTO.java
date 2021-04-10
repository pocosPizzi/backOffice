package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.domain.TypeService;
import com.pocospizziback.api.model.JobProvided;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobProvidedResDTO {

    private Long id;

    private boolean deleted;

    private String createdBy;

    private String updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

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

    private List<ProductTempResDTO> productTempList;

    public JobProvidedResDTO(JobProvided entity) {

        this.id = entity.getId();
        this.deleted = entity.isDeleted();
        this.createdBy = entity.getCreatedBy();
        this.updatedBy = entity.getUpdatedBy();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.client = entity.getClient();
        this.numberHouse = entity.getNumberHouse();
        this.street = entity.getStreet();
        this.district = entity.getDistrict();
        this.city = entity.getCity();
        this.uf = entity.getUf();
        this.description = entity.getDescription();
        this.typeService = entity.getTypeService();
        this.perforatedMeters = entity.getPerforatedMeters();
        this.observation = entity.getObservation();
        this.valueService = entity.getValueService();
    }

    public static JobProvidedResDTO of(JobProvided entity) {

        return entity == null ? null : new JobProvidedResDTO(entity);
    }
}
