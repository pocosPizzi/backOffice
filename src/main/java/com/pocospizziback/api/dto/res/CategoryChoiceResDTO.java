package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.model.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryChoiceResDTO {

    private Long id;
    private String name;

    public static CategoryChoiceResDTO of(Category entity){
        return CategoryChoiceResDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }
}
