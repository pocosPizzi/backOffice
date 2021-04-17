package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.dto.req.MaintenanceReqDTO;
import com.pocospizziback.api.dto.res.MaintenanceResDTO;
import com.pocospizziback.api.model.Maintenance;
import com.pocospizziback.api.model.Product;
import com.pocospizziback.api.model.ProductUsed;
import com.pocospizziback.api.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository repository;

    @Autowired
    private ProductUsedService productUsedService;

    @Autowired
    private ProductService productService;

    public MaintenanceResDTO save(MaintenanceReqDTO dto) {

        List<ProductUsed> productUsedList = new ArrayList<>();

        if (dto.getProductTempList() != null && dto.getProductTempList().isEmpty() == false) {
            dto.getProductTempList().forEach(productUsedReqDTO -> {
                productUsedList.add(this.productUsedService.save(productUsedReqDTO));
            });
        }

        Maintenance entity = dto.toEntity(new Maintenance());

        entity.setProductsUsed(productUsedList);

        return MaintenanceResDTO.of(this.repository.save(entity));
    }

    public PageRes<MaintenanceResDTO> findAll(PageReq query) {
        return null;
    }

    public MaintenanceResDTO findByIdDTO(Long id) {
        return MaintenanceResDTO.of(this.findById(id));
    }

    public Maintenance findById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.job_provided_not_found));
    }

    public MaintenanceResDTO update(Long id, MaintenanceReqDTO dto) {
        List<ProductUsed> productUsedList = this.productUsedService.updateList(dto.getProductTempList());

        Maintenance entity = dto.toEntity(this.findById(id));

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

        return MaintenanceResDTO.of(this.repository.save(entity));
    }

    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.product_not_found);

        this.repository.softDelete(id);

    }
}