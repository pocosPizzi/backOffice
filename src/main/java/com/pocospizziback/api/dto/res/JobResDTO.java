package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.domain.TypeJob;
import com.pocospizziback.api.model.Job;
import com.pocospizziback.api.model.ParcelPeriod;
import com.pocospizziback.api.util.FormatDouble2;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobResDTO {

    private Long id;

    private boolean deleted;

    private String createdBy;

    private String updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String description;

    private String observation;

    private Double valueTotalJob;

    private Double valueTotalProduct;

    private Double valueTotalAssistance;

    private Integer perforatedMeters;

    private Integer mechanicalGeoCoatingMeters;

    private LocalDate dateJob;

    private TypeJob typeJob;

    private String nameClient;

    private List<ProductUsedResDTO> productTempList;

    private ClientResDTO clientResDTO;

    private List<AssistanceUsedResDTO> assistanceUsedResDTOS;

    private Double valueTotalPerforatedMeters;

    private Double valueTotalMechanicalGeoCoatingMeters;

    private ParcelPeriod parcelPeriod;

    private LocalDate dateStartParcel;

    private Integer totalParcel;

    private Double downPayment;

    private Double valueMeterPerforation;

    public JobResDTO(Job entity) {

        this.id = entity.getId();
        this.deleted = entity.isDeleted();
        this.createdBy = entity.getCreatedBy();
        this.updatedBy = entity.getUpdatedBy();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.description = entity.getDescription();
        this.observation = entity.getObservation();
        this.valueTotalJob = FormatDouble2.format(entity.getValueTotalJob());
        this.valueTotalProduct = FormatDouble2.format(entity.getValueTotalProduct());
        this.valueTotalAssistance = FormatDouble2.format(entity.getValueTotalAssistance());
        this.perforatedMeters = entity.getPerforatedMeters();
        this.mechanicalGeoCoatingMeters = entity.getMechanicalGeoCoatingMeters();
        this.dateJob = entity.getDateJob();
        this.typeJob = entity.getTypeJob();
        this.nameClient = entity.getNameClient();
        this.productTempList = entity.getProductsUsed() != null ? entity.getProductsUsed().stream().map(ProductUsedResDTO::of).collect(Collectors.toList()) : null;
        this.clientResDTO = entity.getClient() != null ? ClientResDTO.of(entity.getClient()) : null;
        this.assistanceUsedResDTOS = entity.getAssistanceUsed() != null ? entity.getAssistanceUsed().stream().map(AssistanceUsedResDTO::of).collect(Collectors.toList()) : null;
        this.valueTotalPerforatedMeters = FormatDouble2.format(entity.getValueTotalPerforatedMeters());
        this.valueTotalMechanicalGeoCoatingMeters = FormatDouble2.format(entity.getValueTotalMechanicalGeoCoatingMeters());
        this.parcelPeriod = entity.getParcelPeriod();
        this.dateStartParcel = entity.getDateStartParcel();
        this.totalParcel = entity.getTotalParcel();
        this.downPayment = FormatDouble2.format(entity.getDownPayment());
        this.valueMeterPerforation = entity.getValueMeterPerforation();

    }

    public static JobResDTO of(Job entity) {

        return entity == null ? null : new JobResDTO(entity);
    }
}
