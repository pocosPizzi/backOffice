package com.pocospizziback.api.service;

import com.pocospizziback.api.model.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProfileService {

    @Autowired
    private UserService userService;

    private final TokenStore tokenStore;

    public User findAuthenticatedUser() {
        return this.userService.findAuthenticatedUser();
    }

    public void logout() {

        if (SecurityContextHolder.getContext().getAuthentication() instanceof OAuth2Authentication) {
            OAuth2AccessToken accessToken = tokenStore
                    .getAccessToken((OAuth2Authentication) SecurityContextHolder.getContext().getAuthentication());

            if (accessToken != null && accessToken.getRefreshToken() != null) {
                this.tokenStore.removeAccessTokenUsingRefreshToken(accessToken.getRefreshToken());
                this.tokenStore.removeRefreshToken(accessToken.getRefreshToken());
            }

        }
    }
}
