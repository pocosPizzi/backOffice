package com.pocospizziback.api.service;

import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@AllArgsConstructor
public class PasswordService {

    private final PasswordEncoder passwordEncoder;

    public String encode(String rawPassword) {

        if (StringUtils.containsWhitespace(rawPassword))
            throw new ServiceException(Messages.password_with_space);

        if (StringUtils.isEmpty(rawPassword))
            throw new ServiceException(Messages.password_is_empty);

        return this.passwordEncoder.encode(rawPassword);
    }
}
