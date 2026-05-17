package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;

import com.hotel.hotel_management.model.FoodCategory;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface FoodCategoryService {
	
	public SuccessResponse saveOrUpdateFoodCategory(FoodCategory foodCategory);
	
	public SuccessResponse getFoodCategoryById(Long id);
	
	public SuccessResponse getAllFoodCategory();
	
	public SuccessResponse deleteFoodCategoryById(Long id);
}
