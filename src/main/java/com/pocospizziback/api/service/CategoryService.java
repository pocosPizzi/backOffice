package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.dto.req.CategoryReqDTO;
import com.pocospizziback.api.dto.req.UserReqDTO;
import com.pocospizziback.api.dto.res.CategoryChoiceResDTO;
import com.pocospizziback.api.dto.res.CategoryResDTO;
import com.pocospizziback.api.dto.res.UserResDTO;
import com.pocospizziback.api.model.Category;
import com.pocospizziback.api.model.User;
import com.pocospizziback.api.repository.CategoryRepository;
import com.pocospizziback.api.util.SearchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public CategoryResDTO save(CategoryReqDTO dto){

        Category category = dto.toEntity(new Category());

        if(category.getName().isEmpty())
            throw new ServiceException(Messages.category_name_empty);

        return CategoryResDTO.of(this.repository.save(category));
    }

    public CategoryResDTO update(Long id, CategoryReqDTO dto) {

        Category category = dto.toEntity(this.findByIdEntity(id));

        if(category.getName().isEmpty())
            throw new ServiceException(Messages.category_name_empty);

        return CategoryResDTO.of(this.repository.save(category));
    }

    public PageRes<CategoryResDTO> findAll(PageReq query) {

        Specification<Category> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<Category> filters = SearchUtils.specByFilter(query.getFilter(),  "name", "id");
        Page<Category> page = this.repository.findAll(deleted.and(filters), query.toPageRequest());

        return new PageRes<>(page.getContent().stream().map(CategoryResDTO::of).collect(Collectors.toList()),
                page.getTotalElements(), page.getTotalPages());
    }

    public CategoryResDTO findByIdDTO(Long id) {
        return CategoryResDTO.of(this.findByIdEntity(id));
    }

    public Category findByIdEntity(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.category_not_found));
    }

    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.category_not_found);

        this.repository.softDelete(id);
    }

    public List<CategoryChoiceResDTO> findAllChoice() {
        return this.repository.findByDeletedIsFalse().stream().map(CategoryChoiceResDTO::of).collect(Collectors.toList());
    }
}
