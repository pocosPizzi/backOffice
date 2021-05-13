package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.domain.StatusBill;
import com.pocospizziback.api.domain.TypeBill;
import com.pocospizziback.api.model.Bill;
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
public class BillResDTO {

    private Long id;

    private Boolean isPaid;

    private boolean deleted;

    private String createdBy;

    private String updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Long idClient;

    private String beneficiary;

    private StatusBill statusBill;

    private LocalDate dueDate;

    private TypeBill typeBill;

    private Double value;

    private String description;

    private String name;

    public BillResDTO(Bill entity) {

        this.id = entity.getId();
        this.deleted = entity.isDeleted();
        this.createdBy = entity.getCreatedBy();
        this.updatedBy = entity.getUpdatedBy();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.dueDate = entity.getDueDate();
        this.typeBill = entity.getTypeBill();
        this.value = entity.getValue();
        this.idClient = entity.getClient() != null ? entity.getClient().getId() : null;
        this.beneficiary = entity.getBeneficiary();
        this.statusBill = entity.getStatusBill();
        this.isPaid = entity.getIsPaid();
        this.description = entity.getDescription();
        this.name = entity.getName();
    }

    public static BillResDTO of(Bill entity) {

        return entity == null ? null : new BillResDTO(entity);
    }
}
