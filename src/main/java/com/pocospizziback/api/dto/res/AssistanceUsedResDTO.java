package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.model.AssistanceUsed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssistanceUsedResDTO {

    private Long id;

    private boolean deleted;

    private String createdBy;

    private String updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Double priceOnDate;

    private String name;

    private String description;

    public AssistanceUsedResDTO(AssistanceUsed entity) {

        this.id = entity.getId();
        this.deleted = entity.isDeleted();
        this.createdBy = entity.getCreatedBy();
        this.updatedBy = entity.getUpdatedBy();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.priceOnDate = entity.getPriceOnDate();
        this.name = entity.getAssistance().getName();
        this.description = entity.getAssistance().getDescription();
    }

    public static AssistanceUsedResDTO of(AssistanceUsed entity) {

        return entity == null ? null : new AssistanceUsedResDTO(entity);
    }
}
