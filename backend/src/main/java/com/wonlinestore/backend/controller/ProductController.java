package com.wonlinestore.backend.controller;

import com.wonlinestore.backend.dto.ProductDto;
import com.wonlinestore.backend.dto.response.ResponseDto;
import com.wonlinestore.backend.service.ProductService;
import com.wonlinestore.backend.util.VarList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/product/")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("getAllProducts")
    public ResponseEntity<ResponseDto> getAllProducts() {
        List<ProductDto> allProducts = productService.getAllProducts();

        if (allProducts != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "fetched successfully", allProducts), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getDiscountedProducts")
    public ResponseEntity<ResponseDto> getDiscountedProducts() {
        List<ProductDto> disProducts = productService.getDiscountedProducts();

        if (disProducts != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "fetched successfully", disProducts), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("getProduct/{id}")
    public ResponseEntity<ResponseDto> getProduct(@PathVariable int id) {
        ProductDto product = productService.getProduct(id);

        if (product != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "fetched successfully", product), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("saveProduct")
    public ResponseEntity<ResponseDto> saveProduct(@RequestBody ProductDto productdto) {
        System.out.println(productdto.getImage());
        ProductDto product = productService.saveProduct(productdto);
        if (product != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.CREATED, "saved successfully", product), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("updateProduct/{id}")
    public ResponseEntity<ResponseDto> updateProduct(@PathVariable int id, @RequestBody ProductDto productdto) {
        int code = productService.updateProduct(id, productdto);
        if (code == VarList.OK) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "updated successfully", productdto), HttpStatus.OK);
        } else if (code == VarList.NOT_FOUND) {
            return new ResponseEntity<>(new ResponseDto(VarList.NOT_FOUND, "Product Not Found"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("deleteProduct/{id}")
    public ResponseEntity<ResponseDto> deleteProduct(@PathVariable int id) {
        boolean isDeleted = productService.deleteProduct(id);
        if (isDeleted) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "deleted successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
