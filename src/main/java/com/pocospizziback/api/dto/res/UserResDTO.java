package com.pocospizziback.api.dto.res;

import com.pocospizziback.api.domain.Role;
import com.pocospizziback.api.model.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class UserResDTO {

    private Long id;

    private boolean deleted;

    private String createdBy;

    private String updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String username;

    private String name;

    private Set<Role> roles;


    private UserResDTO(User entity) {

        this.id = entity.getId();
        this.deleted = entity.isDeleted();
        this.createdBy = entity.getCreatedBy();
        this.updatedBy = entity.getUpdatedBy();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.username = entity.getUsername();
        this.name = entity.getName();
        this.roles = entity.getRoles();

    }

    public static UserResDTO of(User entity) {

        return entity == null ? null : new UserResDTO(entity);
    }

}

