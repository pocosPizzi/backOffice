package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.domain.TypeJob;
import com.pocospizziback.api.model.Job;
import com.pocospizziback.api.model.ParcelPeriod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobReqDTO {

    private String description;

    private String observation;

    private Double downPayment;

    private Double valueTotalJob;

    private Double valueTotalPerforatedMeters;

    private Double valueTotalMechanicalGeoCoatingMeters;

    private Double valueTotalProduct;

    private Double valueTotalAssistance;

    private Integer perforatedMeters;

    private Integer mechanicalGeoCoatingMeters;

    private LocalDate dateJob;

    private TypeJob typeJob;

    private ParcelPeriod parcelPeriod;

    private Integer totalParcel;

    private LocalDate dateStartParcel;

    private List<ProductUsedReqDTO> productTempList;

    private Long idClient;

    private List<Long> idAssistanceList;

    public Job toEntity(Job entity) {

        entity.setDescription(this.description);
        entity.setObservation(this.observation);
        entity.setValueTotalJob(this.valueTotalJob);
        entity.setValueTotalProduct(this.valueTotalProduct);
        entity.setValueTotalAssistance(this.valueTotalAssistance);
        entity.setValueTotalMechanicalGeoCoatingMeters(this.valueTotalMechanicalGeoCoatingMeters);
        entity.setValueTotalPerforatedMeters(this.valueTotalPerforatedMeters);
        entity.setPerforatedMeters(this.perforatedMeters);
        entity.setMechanicalGeoCoatingMeters(this.mechanicalGeoCoatingMeters);
        entity.setDateJob(this.dateJob);
        entity.setTypeJob(this.typeJob);
        entity.setTotalParcel(this.totalParcel);
        entity.setDateStartParcel(this.dateStartParcel);
        entity.setParcelPeriod(this.parcelPeriod);
        entity.setDownPayment(this.downPayment);

        return entity;
    }
}
