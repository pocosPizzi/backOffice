package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.domain.TypeService;
import com.pocospizziback.api.model.Perforation;
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
public class PerforationResDTO {

    private Long id;

    private boolean deleted;

    private String createdBy;

    private String updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String nameClient;

    private String cpf;

    private String rg;

    private LocalDate birthday;

    private String phone;

    private String email;

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

    private Integer mechanicalGeoCoatingMeters;

    private Boolean sealDisplacement;

    private LocalDate datePerforation;

    private List<ProductUsedResDTO> productTempList;

    public PerforationResDTO(Perforation entity) {

        this.id = entity.getId();
        this.deleted = entity.isDeleted();
        this.createdBy = entity.getCreatedBy();
        this.updatedBy = entity.getUpdatedBy();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.nameClient = entity.getNameClient();
        this.cpf = entity.getCpf();
        this.rg = entity.getRg();
        this.birthday = entity.getBirthday();
        this.phone = entity.getPhone();
        this.email = entity.getEmail();
        this.numberHouse = entity.getNumberHouse();
        this.street = entity.getStreet();
        this.district = entity.getDistrict();
        this.city = entity.getCity();
        this.uf = entity.getUf();
        this.description = entity.getDescription();
        this.perforatedMeters = entity.getPerforatedMeters();
        this.observation = entity.getObservation();
        this.valueService = entity.getValueService();
        this.mechanicalGeoCoatingMeters = entity.getMechanicalGeoCoatingMeters();
        this.sealDisplacement = entity.getSealDisplacement();
        this.datePerforation = entity.getDatePerforation();
        this.productTempList = entity.getProductsUsed() != null ? entity.getProductsUsed().stream().map(ProductUsedResDTO::of).collect(Collectors.toList()) : null;
    }

    public static PerforationResDTO of(Perforation entity) {

        return entity == null ? null : new PerforationResDTO(entity);
    }
}
