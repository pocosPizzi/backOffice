package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.model.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryReqDTO {

    @NotNull
    private String name;

    public Category toEntity(Category entity) {

        entity.setName(this.name);

        return entity;
    }
}
