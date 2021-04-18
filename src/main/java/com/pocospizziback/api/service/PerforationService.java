package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.dto.req.PerforationReqDTO;
import com.pocospizziback.api.dto.res.PerforationResDTO;
import com.pocospizziback.api.model.Perforation;
import com.pocospizziback.api.model.Product;
import com.pocospizziback.api.model.ProductUsed;
import com.pocospizziback.api.repository.PerforationRepository;
import com.pocospizziback.api.util.SearchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PerforationService {

    @Autowired
    private PerforationRepository repository;

    @Autowired
    private ProductUsedService productUsedService;

    @Autowired
    private ProductService productService;

    public PerforationResDTO save(PerforationReqDTO dto) {

        List<ProductUsed> productUsedList = new ArrayList<>();

        if (dto.getProductTempList() != null && dto.getProductTempList().isEmpty() == false) {
            dto.getProductTempList().forEach(productUsedReqDTO -> {
                productUsedList.add(this.productUsedService.save(productUsedReqDTO));
            });
        }

        Perforation entity = dto.toEntity(new Perforation());

        entity.setProductsUsed(productUsedList);

        return PerforationResDTO.of(this.repository.save(entity));
    }

    public PageRes<PerforationResDTO> findAll(PageReq query) {

        Specification<Perforation> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<Perforation> filters = SearchUtils.specByFilter(query.getFilter(), "nameClient", "id",
                "cpf", "rg", "birthday", "phone", "email", "numberHouse", "street", "district", "city", "uf", "description",
                "observation", "valueService", "datePerforation", "perforatedMeters", "mechanicalGeoCoatingMeters", "sealDisplacement");
        Page<Perforation> page = this.repository.findAll(deleted.and(filters), query.toPageRequest());

        return new PageRes<>(page.getContent().stream().map(PerforationResDTO::of).collect(Collectors.toList()),
                page.getTotalElements(), page.getTotalPages());
    }

    public PerforationResDTO findByIdDTO(Long id) {
        return PerforationResDTO.of(this.findByIdEntity(id));
    }

    public Perforation findByIdEntity(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.job_provided_not_found));
    }

    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.product_not_found);

        this.repository.softDelete(id);
    }

    public PerforationResDTO update(Long id, PerforationReqDTO dto) {

        List<ProductUsed> productUsedList = this.productUsedService.updateList(dto.getProductTempList());

        Perforation entity = dto.toEntity(this.findByIdEntity(id));

        List<ProductUsed> productUsedListOld = entity.getProductsUsed();

        productUsedListOld.forEach(oldProduct -> {

            if (productUsedList.contains(oldProduct) == false) {

                Product product = oldProduct.getProduct();

                Integer value = product.getTotalStock() + oldProduct.getTotalUsed();

                this.productService.updateStockProduct(value, product.getId());

            }

        });

        entity.getProductsUsed().clear();

        entity.setProductsUsed(productUsedList);

        return PerforationResDTO.of(this.repository.save(entity));
    }
}
