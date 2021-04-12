package com.pocospizziback.api.service;

import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.dto.req.ProductUsedReqDTO;
import com.pocospizziback.api.model.Product;
import com.pocospizziback.api.model.ProductUsed;
import com.pocospizziback.api.repository.ProductUsedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductUsedService {

    @Autowired
    private ProductUsedRepository repository;

    @Autowired
    private ProductService productService;

    public ProductUsed save(ProductUsedReqDTO dto) {

        Product product = this.productService.findByIdEntity(dto.getProductId());

        Integer value = product.getTotalStock() - dto.getTotalUsed();

        this.productService.updateStockProduct(value, product.getId());

        ProductUsed entity = ProductUsed.builder()
                .totalUsed(dto.getTotalUsed())
                .product(product)
                .build();

        return this.repository.save(entity);
    }

    public ProductUsed findById(Long id) {
        return this.repository.findById(id).orElseThrow(
                () -> new ServiceException(Messages.service_produto_not_found));
    }

    public ProductUsed update(ProductUsedReqDTO dto) {

        ProductUsed entity;
        ProductUsed entityOld = this.findById(dto.getId());

        if (dto.getId() == null) {

            entity = this.save(dto);

        } else {
//criar regra para fazer as modificações no stoque conforme vei as mudanças de produto
            entity = dto.toEntity(entityOld);
        }

        return this.repository.save(entity);
    }
}
