package com.wonlinestore.backend.dto;

import com.wonlinestore.backend.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDto {
    private int id;
    private String name;
    private String brand;
    private String description;
    private Category category;
    private BigDecimal price;
    private BigDecimal discount;
    private int quantity;
    private int rop;
    private String image;


}
