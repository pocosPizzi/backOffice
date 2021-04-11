package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.model.ProductUsed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductUsedReqDTO {

    private Long id;

    private Long productId;

    private Integer totalUsed;

    public ProductUsed toEntity(ProductUsed entity) {

        entity.setTotalUsed(this.totalUsed);

        return entity;
    }

}
