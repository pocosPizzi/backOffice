package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.config.security.AuthUtil;
import com.pocospizziback.api.dto.req.UserReqDTO;
import com.pocospizziback.api.dto.res.UserResDTO;
import com.pocospizziback.api.model.User;
import com.pocospizziback.api.repository.UserRepository;
import com.pocospizziback.api.util.SearchUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordService passwordService;

    public PageRes<UserResDTO> findAll(PageReq query) {

        Specification<User> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<User> filters = SearchUtils.specByFilter(query.getFilter(), "username", "id", "name");
        Page<User> page = this.repository.findAll(deleted.and(filters), query.toPageRequest());

        return new PageRes<>(page.getContent().stream().map(UserResDTO::of).collect(Collectors.toList()),
                page.getTotalElements(), page.getTotalPages());
    }

    public User findAuthenticatedUser() {

        return this.repository.findById(AuthUtil.getUserId())
                .orElseThrow(() -> new ServiceException(Messages.user_not_authenticates));
    }

    public UserResDTO save(UserReqDTO dto) {

        if(this.repository.findByUsername(dto.getUsername()).isPresent()){
            throw new ServiceException(Messages.user_name_in_use);
        }

        User user = dto.toEntity(new User());

        user.setPassword(this.passwordService.encode(dto.getPassword()));

        return UserResDTO.of(this.repository.save(user));
    }

    public UserResDTO findByIdDto(Long id) {
        return UserResDTO.of(this.findByIdEntity(id));
    }

    public User findByIdEntity(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.use_not_found));
    }

    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.use_not_found);

        this.repository.softDelete(id);
    }

    public UserResDTO update(Long id, UserReqDTO dto) {

        User user = dto.toEntity(this.findByIdEntity(id));

        if (dto.getPassword() != null)
            user.setPassword(this.passwordService.encode(dto.getPassword()));

        return UserResDTO.of(this.repository.save(user));
    }

}
