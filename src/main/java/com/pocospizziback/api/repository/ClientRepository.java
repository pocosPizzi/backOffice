package com.pocospizziback.api.repository;

import com.pocospizziback.api.bases.BaseRepository;
import com.pocospizziback.api.model.Client;

import java.util.List;

public interface ClientRepository extends BaseRepository<Client, Long> {

    List<Client> findByDeletedIsFalse();
}
