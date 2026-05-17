package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;

import com.hotel.hotel_management.dtos.FoodDetailDTO;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface FoodDetailService {
	
	public SuccessResponse saveOrUpdateFoodDetail(FoodDetailDTO foodDetailDto);
	
	public SuccessResponse getFoodDetailById(Long id);
	
	public SuccessResponse getAllFoodDetail();
	
	public SuccessResponse deleteFoodDetailById(Long id);
	
}
