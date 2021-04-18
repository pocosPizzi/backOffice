package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.dto.req.ProductReqDTO;
import com.pocospizziback.api.dto.res.ProductChoiceResDTO;
import com.pocospizziback.api.dto.res.ProductResDTO;
import com.pocospizziback.api.model.Category;
import com.pocospizziback.api.model.Product;
import com.pocospizziback.api.repository.ProductRepository;
import com.pocospizziback.api.util.SearchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    @Autowired
    private CategoryService categoryService;

    @Transactional
    public ProductResDTO save(ProductReqDTO dto) {

        Category category = categoryService.findByIdEntity(dto.getCategoryId());

        Product product = dto.toEntity(new Product());
        product.setCategory(category);

        if (product.getName().isEmpty())
            throw new ServiceException(Messages.product_name_empty);

        return ProductResDTO.of(this.repository.save(product));
    }

    public ProductResDTO update(Long id, ProductReqDTO dto) {

        Product product = dto.toEntity(this.findByIdEntity(id));

        if (product.getName().isEmpty())
            throw new ServiceException(Messages.product_name_empty);

        return ProductResDTO.of(this.repository.save(product));
    }

    public PageRes<ProductResDTO> findAll(PageReq query) {

        Specification<Product> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<Product> filters = SearchUtils.specByFilter(query.getFilter(), "name", "id", "totalStock", "typeTotalStock", "barCode");
        Page<Product> page = this.repository.findAll(deleted.and(filters), query.toPageRequest());

        return new PageRes<>(page.getContent().stream().map(ProductResDTO::of).collect(Collectors.toList()),
                page.getTotalElements(), page.getTotalPages());
    }

    public ProductResDTO findByIdDTO(Long id) {
        return ProductResDTO.of(this.findByIdEntity(id));
    }

    public Product findByIdEntity(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.product_not_found));
    }

    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.product_not_found);

        this.repository.softDelete(id);
    }

    public List<ProductChoiceResDTO> findAllChoice() {

        return this.findAll(PageReq.builder().build()).getContent().stream().map(ProductChoiceResDTO::of).collect(Collectors.toList());
    }

    public void updateStockProduct(Integer value, Long productId){

        Product product = this.findByIdEntity(productId);

        product.setTotalStock(value);

        this.repository.save(product);
    }

}
