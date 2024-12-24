package com.wonlinestore.backend.service;

import com.wonlinestore.backend.dto.CategoryDto;
import com.wonlinestore.backend.entity.Category;
import com.wonlinestore.backend.repository.CategoryRepo;
import com.wonlinestore.backend.util.VarList;
import com.wonlinestore.backend.util.mapper.CategoryMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;


@Service
@Transactional
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private CategoryMapper categoryMapper;



    public List<CategoryDto> getAllCategories() {
        try {
            List<Category> categoryList = categoryRepo.findAll();
            List<CategoryDto>  categoryDtoList = categoryMapper.categoryListToDtoList(categoryList);
            return categoryDtoList;
        } catch (Exception e) {
            return null;
        }
    }


    public CategoryDto getCategory(int id) {
        try {
            Category category = categoryRepo.findById(id).orElse(null);
            if (category != null) {
                return categoryMapper.categoryToDto(category);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public CategoryDto saveCategory(CategoryDto categorydto) {
        try {
            Category category = categoryRepo.save(categoryMapper.dtoToCategory(categorydto));
            categorydto.setId(category.getId());
            return categorydto;
        } catch (Exception e) {
            return null;
        }
    }

    public int updateCategory(int id, CategoryDto categorydto) {
        try {

            if (categoryRepo.existsById(id)) {
                Category category = categoryRepo.save(categoryMapper.dtoToCategory(categorydto));
                return VarList.OK;
            } else {
                return VarList.NOT_FOUND;
            }
        } catch (Exception e) {
            return VarList.INTERNAL_SERVER_ERROR;
        }
    }

    public boolean deleteCategory(int id) {
        try {
            categoryRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
