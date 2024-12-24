package com.wonlinestore.backend.dto;

import com.wonlinestore.backend.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartItemDto {
    private int id;
    private Product product;
    private int productCount;
    private BigDecimal totalAmount ;

}
