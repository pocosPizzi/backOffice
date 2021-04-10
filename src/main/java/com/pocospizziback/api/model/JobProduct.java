package com.pocospizziback.api.model;

import com.pocospizziback.api.bases.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "service_products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class JobProduct extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer totalUsed;

    private Double purchasePrice;

    private Double saleValue;

    @ManyToOne
    private Product product;

}
