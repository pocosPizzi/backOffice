package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.model.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryResDTO {

    private Long id;

    private boolean deleted;

    private String createdBy;

    private String updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String name;

    public CategoryResDTO(Category entity) {

        this.id = entity.getId();
        this.deleted = entity.isDeleted();
        this.createdBy = entity.getCreatedBy();
        this.updatedBy = entity.getUpdatedBy();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.name = entity.getName();
    }

    public static CategoryResDTO of(Category entity) {

        return entity == null ? null : new CategoryResDTO(entity);
    }
}
