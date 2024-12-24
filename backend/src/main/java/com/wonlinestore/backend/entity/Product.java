package com.wonlinestore.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Arrays;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false,unique = true)
    private String name;
    @Column(nullable = false)
    private String brand;
    @ManyToOne
    private Category category;
    private String description;
    @Column(nullable = false)
    private BigDecimal price;
    private BigDecimal discount;
    @Column(nullable = false)
    private int quantity;
    @Column(nullable = false)
    private int rop;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

}
