package com.wonlinestore.backend.service;

import com.wonlinestore.backend.dto.ProductDto;
import com.wonlinestore.backend.entity.Product;
import com.wonlinestore.backend.repository.ProductRepo;
import com.wonlinestore.backend.util.VarList;
import com.wonlinestore.backend.util.mapper.CategoryMapper;
import com.wonlinestore.backend.util.mapper.ProductMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;


@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategoryMapper categoryMapper;


    public List<ProductDto> getAllProducts() {
        try {
            List<Product> productList = productRepo.findAll();
            List<ProductDto>  productDtoList = new ArrayList<>();
            for (Product product : productList) {
                ProductDto productDto = new ProductDto();
                productDto.setId(product.getId());
                productDto.setName(product.getName());
                productDto.setBrand(product.getBrand());
                productDto.setDescription(product.getDescription());
                productDto.setCategory(product.getCategory());
                productDto.setPrice(product.getPrice());
                productDto.setDiscount(product.getDiscount());
                productDto.setQuantity(product.getQuantity());
                productDto.setRop(product.getRop());
                if(product.getImage() != null) {
                    String base64Image = Base64.getEncoder().encodeToString(product.getImage());
                    productDto.setImage(base64Image);
                }
                productDtoList.add(productDto);
            }
            return productDtoList;
        } catch (Exception e) {
            return null;
        }
    }


    public ProductDto getProduct(int id) {
        try {
            Product product = productRepo.findById(id).orElse(null);
            if (product != null) {
                ProductDto productDto = new ProductDto();
                productDto.setId(product.getId());
                productDto.setName(product.getName());
                productDto.setBrand(product.getBrand());
                productDto.setDescription(product.getDescription());
                productDto.setCategory(product.getCategory());
                productDto.setPrice(product.getPrice());
                productDto.setDiscount(product.getDiscount());
                productDto.setQuantity(product.getQuantity());
                productDto.setRop(product.getRop());
                if (product.getImage() != null) {
                    String base64Image = Base64.getEncoder().encodeToString(product.getImage());
                    productDto.setImage(base64Image);
                }
                return productDto;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public ProductDto saveProduct(ProductDto productdto) {
        try {
            byte[] imageBytes = Base64.getDecoder().decode(productdto.getImage());

            Product product1 = new Product(productdto.getId(),
                    productdto.getName(),
                    productdto.getBrand(),
                    productdto.getCategory(),
                    productdto.getDescription(),
                    productdto.getPrice(),
                    productdto.getDiscount(),
                    productdto.getQuantity(),
                    productdto.getRop(),
                    imageBytes
            );
            Product product = productRepo.save(product1);
            productdto.setId(product.getId());
            return productdto;
        } catch (Exception e) {
            return null;
        }
    }

    public int updateProduct(int id, ProductDto productdto) {
        try {

            if (productRepo.existsById(id)) {

                byte[] imageBytes = Base64.getDecoder().decode(productdto.getImage());
                Product product1 = new Product(id,
                        productdto.getName(),
                        productdto.getBrand(),
                        productdto.getCategory(),
                        productdto.getDescription(),
                        productdto.getPrice(),
                        productdto.getDiscount(),
                        productdto.getQuantity(),
                        productdto.getRop(),
                        imageBytes
                );
                Product product = productRepo.save(product1);
                return VarList.OK;
            } else {
                return VarList.NOT_FOUND;
            }
        } catch (Exception e) {
            return VarList.INTERNAL_SERVER_ERROR;
        }
    }

    public boolean deleteProduct(int id) {
        try {
            productRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<ProductDto> getDiscountedProducts() {
        try {
            List<Product> productList = productRepo.findAllDiscountedProducts();
            List<ProductDto>  productDtoList = new ArrayList<>();
            for (Product product : productList) {
                ProductDto productDto = new ProductDto();
                productDto.setId(product.getId());
                productDto.setName(product.getName());
                productDto.setBrand(product.getBrand());
                productDto.setDescription(product.getDescription());
                productDto.setCategory(product.getCategory());
                productDto.setPrice(product.getPrice());
                productDto.setDiscount(product.getDiscount());
                productDto.setQuantity(product.getQuantity());
                productDto.setRop(product.getRop());
                if(product.getImage() != null) {
                    String base64Image = Base64.getEncoder().encodeToString(product.getImage());
                    productDto.setImage(base64Image);
                }
                productDtoList.add(productDto);
            }
            return productDtoList;
        } catch (Exception e) {
            return null;
        }
    }
}
