package com.pocospizziback.api.dto.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductChoiceResDTO {

    private Long id;

    private String name;

    private Double value;

    public ProductChoiceResDTO(ProductResDTO entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.value = entity.getValue();
    }

    public static ProductChoiceResDTO of(ProductResDTO entity) {
        return entity == null ? null : new ProductChoiceResDTO(entity);
    }
}
