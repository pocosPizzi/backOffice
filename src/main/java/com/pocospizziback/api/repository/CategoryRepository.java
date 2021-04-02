package com.pocospizziback.api.repository;

import com.pocospizziback.api.bases.BaseRepository;
import com.pocospizziback.api.model.Category;

import java.util.List;

public interface CategoryRepository extends BaseRepository<Category, Long> {

    List<Category> findByDeletedIsFalse();
}
