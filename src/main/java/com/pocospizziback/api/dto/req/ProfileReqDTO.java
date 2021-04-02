package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.model.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ProfileReqDTO {

    @NotBlank
    private String name;

    public User toEntity(User entity) {

        entity.setName(this.name);

        return entity;
    }
}
