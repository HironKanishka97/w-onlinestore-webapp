package com.wonlinestore.backend.util.mapper;


import com.wonlinestore.backend.dto.CategoryDto;
import com.wonlinestore.backend.entity.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category dtoToCategory(CategoryDto categoryDto);
    CategoryDto categoryToDto(Category category);
    List<CategoryDto> categoryListToDtoList(List<Category> categoryList);
    List<Category> dtoListToCategoryList(List<CategoryDto> categoryDtoList);
}
