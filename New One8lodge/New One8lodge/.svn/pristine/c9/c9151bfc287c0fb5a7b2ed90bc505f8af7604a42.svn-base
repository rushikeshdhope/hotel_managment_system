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

import com.hotel.hotel_management.model.FoodCategory;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.FoodCategoryService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("hotel_booking/v1/admin/food_category")
@Validated
public class FoodCategoryController {

	@Autowired	
	FoodCategoryService categoryService;

	@PostMapping("saveOrUpdateFoodCategory")
	public SuccessResponse saveOrUpdateRoomCategory(@Valid @RequestBody FoodCategory foodCategory) {
		return categoryService.saveOrUpdateFoodCategory(foodCategory);
	}

	@GetMapping("getFoodCategoryById/{id}")
	public SuccessResponse getCategoryById(@PathVariable Long id) {
		return categoryService.getFoodCategoryById(id);
	}

	@GetMapping("getAllFoodCategory")
	public SuccessResponse getAllCategory() {
		return categoryService.getAllFoodCategory();
	}
	
	@DeleteMapping("deleteFoodCategoryById/{id}")
	public SuccessResponse deleteFoodCategoryById(@PathVariable Long id) {
		return categoryService.deleteFoodCategoryById(id);
	}
		


}
