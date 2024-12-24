package com.wonlinestore.backend.repository;

import com.wonlinestore.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
}
