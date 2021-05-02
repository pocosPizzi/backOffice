package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.model.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BillByClientResDTO {

    private String nameClient;
    private String cpf;
    private String phone;
    private String city;
    private List<BillResDTO> bills;

    public BillByClientResDTO(Client client, List<BillResDTO> billResDTOS) {
        this.nameClient = client.getNameClient();
        this.cpf = client.getCpf();
        this.phone = client.getPhone();
        this.city = client.getCity();
        bills = billResDTOS;
    }

    public static BillByClientResDTO of(Client client, List<BillResDTO> billResDTOS) {

        return client == null ? null : new BillByClientResDTO(client, billResDTOS);
    }
}
