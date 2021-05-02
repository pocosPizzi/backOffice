package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.domain.StatusBill;
import com.pocospizziback.api.domain.TypeBill;
import com.pocospizziback.api.model.Bill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BillReqDTO {

//    private String debtor;

    private String beneficiary;

    private StatusBill statusBill;

    private LocalDate dueDate;

    private TypeBill typeBill;

    private Double value;

    private Boolean isPaid;

    private String description;

    private Long idClient;

    public Bill toEntity(Bill entity) {

        entity.setTypeBill(this.typeBill);
        entity.setDueDate(this.dueDate);
        entity.setValue(this.value);
        entity.setBeneficiary(this.beneficiary);
        entity.setStatusBill(this.statusBill);
        entity.setIsPaid(this.isPaid == null ? false: this.isPaid);
        entity.setDescription(this.description);

        return entity;
    }
}
