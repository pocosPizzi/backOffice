package com.pocospizziback.api.repository;

import com.pocospizziback.api.bases.BaseRepository;
import com.pocospizziback.api.model.Bill;
import com.pocospizziback.api.model.Client;

import java.time.LocalDate;
import java.util.List;

public interface BillRepository extends BaseRepository<Bill, Long> {

    List<Bill> findByIsPaidIsFalseAndDeletedIsFalse();

    List<Bill> findByDeletedIsFalseAndDueDateBetween(LocalDate dateInit, LocalDate dateFinal);

    List<Bill> findByClientAndDeletedIsFalseOrderByDueDate(Client client);
}
