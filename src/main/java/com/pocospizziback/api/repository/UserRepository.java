package com.pocospizziback.api.repository;

import com.pocospizziback.api.bases.BaseRepository;
import com.pocospizziback.api.model.User;

import java.util.Optional;


public interface UserRepository extends BaseRepository<User, Long> {

    Optional<User> findByUsername(String username);

}