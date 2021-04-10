package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.domain.Role;
import com.pocospizziback.api.model.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
public class UserReqDTO {

    @NotBlank
    private String username;

    @NotBlank
    private String name;

    private Set<Role> roles;

    private String password;

    public User toEntity(User entity) {

        entity.setUsername(this.username);
        entity.setName(this.name);
        entity.setRoles(this.roles);

        return entity;
    }

    public User toEntityProfile(User entity) {

        entity.setUsername(this.username);
        entity.setName(this.name);

        return entity;
    }
}
