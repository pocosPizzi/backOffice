package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.model.Maintenance;
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
public class MaintenanceReqDTO {

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

    private Integer perforatedMeters;

    private String observation;

    private Double valueService;

    private LocalDate dateMaintenance;

    private List<ProductUsedReqDTO> productTempList;

    public Maintenance toEntity(Maintenance entity) {

        entity.setNameClient(this.nameClient);
        entity.setCpf(this.cpf);
        entity.setRg(this.rg);
        entity.setBirthday(this.birthday);
        entity.setPhone(this.phone);
        entity.setEmail(this.email);
        entity.setNumberHouse(this.numberHouse);
        entity.setStreet(this.street);
        entity.setDistrict(this.district);
        entity.setCity(this.city);
        entity.setUf(this.uf);
        entity.setDescription(this.description);
        entity.setObservation(this.observation);
        entity.setValueService(this.valueService);
        entity.setDateMaintenance(this.dateMaintenance);

        return entity;
    }
}
