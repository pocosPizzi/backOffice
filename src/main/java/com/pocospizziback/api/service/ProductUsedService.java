package com.pocospizziback.api.service;

import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.dto.req.ProductUsedReqDTO;
import com.pocospizziback.api.model.Product;
import com.pocospizziback.api.model.ProductUsed;
import com.pocospizziback.api.repository.ProductUsedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<ProductUsed> updateList(List<ProductUsedReqDTO> productUsedReqDTOList, List<ProductUsed> productUsedReqDTOListOld){

        List<ProductUsed> productUsedList = new ArrayList<>();

        if (productUsedReqDTOList != null && productUsedReqDTOList.isEmpty() == false) {

            productUsedReqDTOList.forEach(productUsedReqDTO -> {
                List<ProductUsed> productUsedList1 = productUsedReqDTOListOld
                        .stream()
                        .filter(productUsed -> productUsed.getId().equals(productUsedReqDTO.getId()))
                        .collect(Collectors.toList());
                Integer totalUsedOld = productUsedList1.size() > 0 ? productUsedList1.get(0).getTotalUsed() : null;
                productUsedList.add(this.update(productUsedReqDTO, totalUsedOld));
            });

        }
        return productUsedList;
    }


    public ProductUsed update(ProductUsedReqDTO dto, Integer totalUsedOld) {

        ProductUsed entity;

        if (dto.getId() == null) {
            entity = this.save(dto);
        } else
        {
            entity = dto.toEntity(this.findById(dto.getId()));
            Product product = entity.getProduct();

            Integer value = (product.getTotalStock() + totalUsedOld);

            this.productService.updateStockProduct(value - dto.getTotalUsed(), product.getId());
        }

        return this.repository.save(entity);
    }
}
