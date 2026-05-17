package com.hotel.hotel_management.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.model.FoodCategory;

@Repository
public interface FoodCategoryRepository extends JpaRepository<FoodCategory, Long> {
	
	@Query(value = "SELECT f.* FROM food_category f where f.food_category_name = ?", nativeQuery = true)
	public Optional<FoodCategory> findByCategoryName(String name);
}
