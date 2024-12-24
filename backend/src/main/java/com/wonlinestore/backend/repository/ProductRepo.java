package com.wonlinestore.backend.repository;

import com.wonlinestore.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    @Modifying
    @Query("update Product p set p.quantity =p.quantity- :quantity where p.id = :id")
    void updateQuantity(@Param("id") int id, @Param("quantity") int quantity);

    @Query("select p.quantity from Product p where p.id=:id")
    int getCurrentQuantity(@Param("id") int id);

    @Modifying
    @Query("update Product p set p.quantity =p.quantity + :diff where p.id = :id")
    void updateQuantityAfterClientOrderUpdate(@Param("id") int id, @Param("diff") int diff);

    @Modifying
    @Query("update Product p set p.quantity =p.quantity + :increasedQty where p.id = :id")
    void updateQuantityAfterClientOrderDelete(@Param("id") int id, @Param("increasedQty") int increasedQty);

    @Query("select p from Product p where p.discount > 0 ")
    List<Product> findAllDiscountedProducts();
}
