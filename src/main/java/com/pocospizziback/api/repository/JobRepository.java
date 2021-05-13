package com.pocospizziback.api.repository;

import com.pocospizziback.api.bases.BaseRepository;
import com.pocospizziback.api.model.Job;

import java.util.List;

public interface JobRepository extends BaseRepository<Job, Long> {

    List<Job> findByCompleteIsFalse();
}
