package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.dto.req.ClientReqDTO;
import com.pocospizziback.api.dto.res.CategoryChoiceResDTO;
import com.pocospizziback.api.dto.res.ClientChoiceResDTO;
import com.pocospizziback.api.dto.res.ClientResDTO;
import com.pocospizziback.api.model.Client;
import com.pocospizziback.api.repository.ClientRepository;
import com.pocospizziback.api.util.SearchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    private ClientRepository repository;

    public ClientResDTO save(ClientReqDTO dto) {

        Client client = dto.toEntity(new Client());

        return ClientResDTO.of(this.repository.save(client));
    }

    public PageRes<ClientResDTO> findAll(PageReq query) {

        Specification<Client> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<Client> filters = SearchUtils.specByFilter(query.getFilter(), "id", "nameClient", "birthday", "city", "cpf", "district",
                "email", "numberHouse", "phone", "rg", "street", "uf");
        Page<Client> page = this.repository.findAll(deleted.and(filters), query.toPageRequest());

        return new PageRes<>(page.getContent().stream().map(ClientResDTO::of).collect(Collectors.toList()),
                page.getTotalElements(), page.getTotalPages());
    }

    public ClientResDTO findByIdDTO(Long id) {

        return ClientResDTO.of(this.findById(id));
    }

    public Client findById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.client_not_found));
    }

    public ClientResDTO update(Long id, ClientReqDTO dto) {

        Client oldClient = this.findById(id);

        Client client = dto.toEntity(oldClient);

        return ClientResDTO.of(this.repository.save(client));
    }

    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.category_not_found);

        this.repository.softDelete(id);
    }

    public List<ClientChoiceResDTO> findAllChoice() {
        return this.repository.findByDeletedIsFalse().stream().map(ClientChoiceResDTO::of).collect(Collectors.toList());
    }
}
