package com.pocospizziback.api.service;

import com.pocospizziback.api.model.Assistance;
import com.pocospizziback.api.model.AssistanceUsed;
import com.pocospizziback.api.repository.AssistanceUsedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AssistanceUsedService {

    @Autowired
    private AssistanceUsedRepository repository;

    @Autowired
    private AssistanceService assistanceService;

    public List<AssistanceUsed> saveList(List<Long> idList){

        List<AssistanceUsed> assistanceUsedList = new ArrayList<>();

        if (idList != null && idList.isEmpty() == false) {
            idList.forEach(id -> {
                Assistance assistance = this.assistanceService.findById(id);
                assistanceUsedList.add(this.save(AssistanceUsed.builder().assistance(assistance).priceOnDate(assistance.getValue()).build()));
            });
        }

        return assistanceUsedList;
    }

    public AssistanceUsed save (AssistanceUsed entity){
        return this.repository.save(entity);
    }
}
