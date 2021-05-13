package com.pocospizziback.api.dto.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssistanceChoiceResDTO {

    private Long id;

    private String name;

    private Double value;

    private String description;

    public AssistanceChoiceResDTO(AssistanceResDTO entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.value = entity.getValue();
        this.description = entity.getDescription();
    }

    public static AssistanceChoiceResDTO of(AssistanceResDTO entity) {
        return entity == null ? null : new AssistanceChoiceResDTO(entity);
    }
}
