package com.pocospizziback.api.model;

import com.pocospizziback.api.bases.BaseEntity;
import com.pocospizziback.api.domain.StatusBill;
import com.pocospizziback.api.domain.TypeBill;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "bills")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Bill extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String debtor;

    private Boolean isPaid;

    private String beneficiary;

    private LocalDate dueDate;

    private TypeBill typeBill;

    private StatusBill statusBill;

    private Double value;

    private String description;
}
