package com.wonlinestore.backend.controller;

import com.wonlinestore.backend.dto.ProductDto;
import com.wonlinestore.backend.dto.response.ResponseDto;
import com.wonlinestore.backend.service.ProductService;
import com.wonlinestore.backend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("api/v1/home/")
public class HomeController {

    @Autowired
    private ProductService productService;

    //used for homepage product loading
    @GetMapping("getAllHomeItems")
    public ResponseEntity<ResponseDto> getAllHomeItems() {
        List<ProductDto> allProducts = productService.getAllProducts();
//        System.out.println(allProducts);
        if (allProducts != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "product items",allProducts), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    }

