package com.pocospizziback.api.repository;

import com.pocospizziback.api.bases.BaseRepository;
import com.pocospizziback.api.model.Bill;

import java.util.List;

public interface BillRepository extends BaseRepository<Bill, Long> {

    List<Bill> findByIsPaidIsFalse();
}
