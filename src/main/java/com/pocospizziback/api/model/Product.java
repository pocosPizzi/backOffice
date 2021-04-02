package com.pocospizziback.api.model;

import com.pocospizziback.api.bases.BaseEntity;
import com.pocospizziback.api.domain.TypeTotalStock;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Product extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer totalStock;

    private TypeTotalStock typeTotalStock;

    private Double purchasePrice;

    private Double saleValue;

    private String barCode;

    @ManyToOne
    private Category category;

}
