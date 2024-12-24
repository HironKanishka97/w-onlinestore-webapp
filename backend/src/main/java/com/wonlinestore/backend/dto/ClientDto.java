package com.wonlinestore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClientDto {
    private int id;
    private String name;
    private String address;
    private String contact;

}
