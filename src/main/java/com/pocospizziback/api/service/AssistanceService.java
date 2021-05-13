package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.dto.req.AssistanceReqDTO;
import com.pocospizziback.api.dto.res.AssistanceChoiceResDTO;
import com.pocospizziback.api.dto.res.AssistanceResDTO;
import com.pocospizziback.api.dto.res.ProductChoiceResDTO;
import com.pocospizziback.api.model.Assistance;
import com.pocospizziback.api.repository.AssistanceRepository;
import com.pocospizziback.api.util.SearchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssistanceService {

    @Autowired
    private AssistanceRepository repository;

    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.category_not_found);

        this.repository.softDelete(id);
    }

    public Double sumValueTotalAssistance(List<Assistance> assistanceList) {

        Double total = 0D;

        if (assistanceList != null && assistanceList.isEmpty() == false) {

            total = assistanceList.stream().mapToDouble(Assistance::getValue).sum();
        }

        return total;
    }

    public List<Assistance> saveList(List<Long> idsList) {

        List<Assistance> assistanceList = new ArrayList<>();

        if (idsList != null && idsList.isEmpty() == false) {
            idsList.forEach(id -> {
                Assistance assistance = this.findById(id);
                assistanceList.add(assistance);
            });
        }

        return assistanceList;
    }

    public AssistanceResDTO save(AssistanceReqDTO dto) {
        return AssistanceResDTO.of(this.repository.save(dto.toEntity(new Assistance())));
    }

    public AssistanceResDTO findByIdDTO(Long id) {
        return AssistanceResDTO.of(this.findById(id));
    }

    public Assistance findById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.assistance_not_found));
    }

    public PageRes<AssistanceResDTO> findAll(PageReq query) {

        Specification<Assistance> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<Assistance> filters = SearchUtils.specByFilter(query.getFilter(), "id", "name", "description", "value");
        Page<Assistance> page = this.repository.findAll(deleted.and(filters), query.toPageRequest());

        return new PageRes<>(page.getContent().stream().map(AssistanceResDTO::of).collect(Collectors.toList()),
                page.getTotalElements(), page.getTotalPages());
    }

    public AssistanceResDTO update(Long id, AssistanceReqDTO dto) {
        Assistance oldAssistance = this.findById(id);

        return AssistanceResDTO.of(this.repository.save(dto.toEntity(oldAssistance)));
    }

    public List<Assistance> findListIds(List<Long> idAssistanceList) {

        List<Assistance> assistanceList = new ArrayList<>();

        idAssistanceList.forEach(id -> {
            assistanceList.add(this.findById(id));
        });

        return assistanceList;
    }

    public List<AssistanceChoiceResDTO> findAllChoice() {

        return this.findAll(PageReq.builder().build()).getContent().stream().map(AssistanceChoiceResDTO::of).collect(Collectors.toList());
    }
}
