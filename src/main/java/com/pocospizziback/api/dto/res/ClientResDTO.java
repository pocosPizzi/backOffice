package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.model.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientResDTO {

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

    public ClientResDTO(Client entity) {

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
    }

    public static ClientResDTO of(Client entity) {

        return entity == null ? null : new ClientResDTO(entity);
    }
}
