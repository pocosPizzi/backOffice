package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.model.Assistance;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssistanceReqDTO {

    private String name;

    private String description;

    private Double value;

    public Assistance toEntity(Assistance entity) {

        entity.setName(this.name);
        entity.setDescription(this.description);
        entity.setValue(this.value);

        return entity;
    }
}
