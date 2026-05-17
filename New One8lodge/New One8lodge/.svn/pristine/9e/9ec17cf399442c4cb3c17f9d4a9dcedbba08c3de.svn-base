package com.hotel.hotel_management.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.model.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
	@Query(value="select food_name from food where food_name = ?",nativeQuery = true)
	public String findByFoodName(String food_name); 
	
	@Query(value="select * from food where food_category_id = ?",nativeQuery = true)
	public List<Food> findFoodByCategoryId(Long categoryId); 
	
	@Query(value = "SELECT COUNT(*) AS count FROM food WHERE food_category_id = ?",nativeQuery = true)
	public int isPresentFoodCategoryInFood(Long foodCategoryId);

	@Query(value="select * from food where LOWER(food_name) LIKE LOWER(CONCAT('%', ?, '%')) ",nativeQuery = true)
	public List<Food> findFoodByName(String foodName);
}
