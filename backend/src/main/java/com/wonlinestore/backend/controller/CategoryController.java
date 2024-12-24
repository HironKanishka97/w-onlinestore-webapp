package com.wonlinestore.backend.controller;

import com.wonlinestore.backend.dto.CategoryDto;
import com.wonlinestore.backend.dto.response.ResponseDto;
import com.wonlinestore.backend.service.CategoryService;
import com.wonlinestore.backend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/category/")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("getAllCategories")
    public ResponseEntity<ResponseDto> getAllCategories() {
        List<CategoryDto> allCategories = categoryService.getAllCategories();

        if (allCategories != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "fetched successfully", allCategories), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getCategory/{id}")
    public ResponseEntity<ResponseDto> getCategory(@PathVariable int id) {
        CategoryDto category = categoryService.getCategory(id);

        if (category != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "fetched successfully", category), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("saveCategory")
    public ResponseEntity<ResponseDto> saveCategory(@RequestBody CategoryDto categorydto) {
        CategoryDto category = categoryService.saveCategory(categorydto);
        if (category != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.CREATED, "saved successfully", category), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("updateCategory/{id}")
    public ResponseEntity<ResponseDto> updateCategory(@PathVariable int id, @RequestBody CategoryDto categorydto) {
        int code = categoryService.updateCategory(id, categorydto);
        if (code == VarList.OK) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "updated successfully", categorydto), HttpStatus.OK);
        } else if (code == VarList.NOT_FOUND) {
            return new ResponseEntity<>(new ResponseDto(VarList.NOT_FOUND, "Category Not Found"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("deleteCategory/{id}")
    public ResponseEntity<ResponseDto> deleteCategory(@PathVariable int id) {
        boolean isDeleted = categoryService.deleteCategory(id);
        if (isDeleted) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "deleted successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
