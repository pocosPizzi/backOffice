package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.model.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientChoiceResDTO {

    private Long id;
    private String name;

    public static ClientChoiceResDTO of(Client entity) {
        return ClientChoiceResDTO.builder()
                .id(entity.getId())
                .name(entity.getNameClient())
                .build();
    }
}
