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
import com.pocospizziback.api.model.ProductUsed;
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

    public Double sumValueProduct(List<ProductUsed> productUsedList) {

        Double total = 0D;

        if (productUsedList != null && productUsedList.isEmpty() == false) {

            List<Product> productList = productUsedList.stream().map(ProductUsed::getProduct).collect(Collectors.toList());

            total = productList.stream().mapToDouble(Product::getValue).sum();
        }

        return total;
    }

    public void updateStory(List<ProductUsed> productUsedListOld) {

        if(productUsedListOld != null && productUsedListOld.isEmpty() == false){
            productUsedListOld.forEach(oldProduct -> {

                Product product = oldProduct.getProduct();

                Integer value = product.getTotalStock() + oldProduct.getTotalUsed();

                this.updateStockProduct(value, product.getId());
            });
        }
    }

    public void updateStory(List<ProductUsed> productUsedListOld, List<ProductUsed> productUsedList) {
        productUsedListOld.forEach(oldProduct -> {

            List<ProductUsed> list = productUsedList.stream().filter(productUsed -> productUsed.getId().equals(oldProduct.getId())).collect(Collectors.toList());

            if (list.isEmpty() == true) {

                Product product = oldProduct.getProduct();

                Integer value = product.getTotalStock() + oldProduct.getTotalUsed();

                this.updateStockProduct(value, product.getId());

            }
        });
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

    public void updateStockProduct(Integer value, Long productId) {

        Product product = this.findByIdEntity(productId);

        product.setTotalStock(value);

        this.repository.save(product);
    }

}
