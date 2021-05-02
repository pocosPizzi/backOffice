package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.model.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientReqDTO {

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

    public Client toEntity(Client entity) {

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

        return entity;
    }
}
