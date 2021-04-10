package com.pocospizziback.api.dto.req;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ResetPasswordDTO {

    @NotBlank
    private String token;

    @NotBlank
    private String newPassword;

    @NotBlank
    private String confirmation;
}
