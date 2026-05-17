package com.hotel.hotel_management.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.model.FoodDetail;

@Repository
public interface FoodDetailRepository extends JpaRepository<FoodDetail, Long> {
	
	@Query(value="select rate from food where food_id = ?",nativeQuery = true)
	public Long findPriceByFoodId(Long id);
	
	@Query(value="select food_name from food where food_id = ?",nativeQuery = true)
	public String findFoodNameByFoodId(Long id);
}


