package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.domain.TypeTotalStock;
import com.pocospizziback.api.model.Product;
import com.pocospizziback.api.model.ProductUsed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductUsedResDTO {

    private Long id;

    private String name;

    private TypeTotalStock typeTotalStock;

    private Integer totalUsed;

    public ProductUsedResDTO(ProductUsed entity) {

        this.id = entity.getId();
        this.name = entity.getProduct().getName();
        this.typeTotalStock = entity.getProduct().getTypeTotalStock();
        this.totalUsed = entity.getTotalUsed();
    }

    public static ProductUsedResDTO of(ProductUsed entity) {

        return entity == null ? null : new ProductUsedResDTO(entity);
    }
}
