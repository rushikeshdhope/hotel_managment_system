package com.hotel.hotel_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.hotel_management.dtos.FoodDTO;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.FoodService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("hotel_booking/v1/admin/food")
@Validated
@CrossOrigin

public class FoodController {
	
	@Autowired
    FoodService foodService;

	@PostMapping("/saveOrupdateFood")
	public SuccessResponse saveOrUpdatefood(@Valid @RequestBody FoodDTO foodDto) {
        return foodService.saveOrUpdateFood(foodDto);
	}
	
	@GetMapping("getFoodById/{id}")
	public SuccessResponse getFoodById(@PathVariable Long id) {
		return foodService.getFoodById(id);
	}

	@GetMapping("getAllFood")
	public SuccessResponse getAllFood() {
		return foodService.getAllFood();
	}
	
	@DeleteMapping("deleteFoodById/{id}")
	public SuccessResponse deleteFoodById(@PathVariable Long id) {
		return foodService.deleteFoodById(id);
	}
	
	@GetMapping("getFoodByCategoryId/{categoryId}")
	public SuccessResponse getFoodByCategoryId(@PathVariable Long categoryId) {
       return foodService.getFoodByCategoryId(categoryId);
	}
	
	@GetMapping("getFoodByName/{foodName}")
	public SuccessResponse getFoodByName(@PathVariable String foodName) {
       return foodService.getFoodByName(foodName);
	}
	

	

	
}
