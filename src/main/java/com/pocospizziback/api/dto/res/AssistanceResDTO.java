package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.model.Assistance;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssistanceResDTO {

    private Long id;

    private boolean deleted;

    private String createdBy;

    private String updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String name;

    private String description;

    private Double value;

    public AssistanceResDTO(Assistance entity) {

        this.id = entity.getId();
        this.deleted = entity.isDeleted();
        this.createdBy = entity.getCreatedBy();
        this.updatedBy = entity.getUpdatedBy();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.value = entity.getValue();
    }

    public static AssistanceResDTO of(Assistance entity) {

        return entity == null ? null : new AssistanceResDTO(entity);
    }
}
