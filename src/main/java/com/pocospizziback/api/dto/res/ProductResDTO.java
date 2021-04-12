package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.domain.TypeTotalStock;
import com.pocospizziback.api.model.Product;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductResDTO {

    private Long id;

    private boolean deleted;

    private String createdBy;

    private String updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String name;

    private Integer totalStock;

    private TypeTotalStock typeTotalStock;

    private Long categoryId;

    private String categoryName;

    private String barCode;

    public ProductResDTO(Product entity) {

        this.id = entity.getId();
        this.deleted = entity.isDeleted();
        this.createdBy = entity.getCreatedBy();
        this.updatedBy = entity.getUpdatedBy();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.name = entity.getName();
        this.totalStock = entity.getTotalStock();
        this.typeTotalStock = entity.getTypeTotalStock();
        this.categoryId = entity.getCategory().getId();
        this.categoryName = entity.getCategory().getName();
        this.barCode = entity.getBarCode();
    }

    public static ProductResDTO of(Product entity) {

        return entity == null ? null : new ProductResDTO(entity);
    }
}
