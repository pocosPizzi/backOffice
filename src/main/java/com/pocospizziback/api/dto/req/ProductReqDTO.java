package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.domain.TypeTotalStock;
import com.pocospizziback.api.model.Product;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Builder
public class ProductReqDTO {

    @NotNull
    private String name;

    @NotNull
    private Integer totalStock;

    @NotNull
    private TypeTotalStock typeTotalStock;

    @NotNull
    private Long categoryId;

    private String categoryName;

    @NotNull
    private String barCode;

    public Product toEntity(Product entity) {

        entity.setName(this.name);
        entity.setTotalStock(this.totalStock);
        entity.setTypeTotalStock(this.typeTotalStock);
        entity.setBarCode(this.barCode);

        return entity;
    }
}
