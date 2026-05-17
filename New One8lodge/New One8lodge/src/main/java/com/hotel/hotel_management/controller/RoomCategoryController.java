package com.hotel.hotel_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.model.RoomCategory;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.RoomCategoryService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("hotel_booking/v1/admin/room_category")
@Validated
public class RoomCategoryController {

	@Autowired
	RoomCategoryService categoryService;

	@PostMapping("saveOrUpdateRoomCategory")
	public SuccessResponse saveOrUpdateRoomCategory(
				@RequestParam(value = "file", required = false) MultipartFile image_file,
			@Valid @ModelAttribute RoomCategory roomCategory) {
		return categoryService.saveOrUpdateRoomCategory(roomCategory,image_file);
	}

	@GetMapping("getRoomCategoryById/{id}")
	public SuccessResponse getCategoryById(@PathVariable Long id) {
		return categoryService.getRoomCategoryById(id);
	}

	@GetMapping("getAllRoomCategory")
	public SuccessResponse getAllCategory() {
		return categoryService.getAllRoomCategory();
	}
	
	@DeleteMapping("deleteRoomCategoryById/{id}")
	public SuccessResponse deleteFoodCategoryById(@PathVariable Long id) {
		return categoryService.deleteRoomCategoryById(id);
	}
	

}
