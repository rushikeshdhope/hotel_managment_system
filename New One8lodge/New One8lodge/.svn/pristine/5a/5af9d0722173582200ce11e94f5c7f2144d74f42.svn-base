package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;

import com.hotel.hotel_management.dtos.FoodDTO;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface FoodService {
    
	public SuccessResponse saveOrUpdateFood(FoodDTO FoodDto);
	
	public SuccessResponse getFoodById(Long id);
	
	public SuccessResponse getAllFood();
	
	public SuccessResponse deleteFoodById(Long id);
	
	public SuccessResponse getFoodByCategoryId(Long categoryId);
	
	public SuccessResponse getFoodByName(String foodName);

}
