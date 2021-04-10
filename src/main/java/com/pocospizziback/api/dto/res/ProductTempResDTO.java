package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.domain.TypeTotalStock;
import com.pocospizziback.api.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductTempResDTO {

    private Long id;

    private String name;

    private TypeTotalStock typeTotalStock;

    private Integer total;

    public ProductTempResDTO(Product entity) {

        this.id = entity.getId();
        this.name = entity.getName();
        this.typeTotalStock = entity.getTypeTotalStock();
        this.total = entity.getTotalStock();
    }

    public static ProductTempResDTO of(Product entity) {

        return entity == null ? null : new ProductTempResDTO(entity);
    }
}
