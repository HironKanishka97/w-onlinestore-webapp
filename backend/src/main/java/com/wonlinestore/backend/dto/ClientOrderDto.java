package com.wonlinestore.backend.dto;

import com.wonlinestore.backend.entity.CartItem;
import com.wonlinestore.backend.entity.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClientOrderDto {
    private int id;
    private Date date;
    private Client client;
    private List<CartItem> cartItems;
    private BigDecimal lineTotal;

}
