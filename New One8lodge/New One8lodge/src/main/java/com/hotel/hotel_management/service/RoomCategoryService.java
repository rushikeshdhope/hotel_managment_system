package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.model.RoomCategory;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface RoomCategoryService {	
	
	public SuccessResponse saveOrUpdateRoomCategory(RoomCategory roomCategory,MultipartFile image_file);
	
	public SuccessResponse getRoomCategoryById(Long id);
	
	public SuccessResponse getAllRoomCategory();
	
	public SuccessResponse deleteRoomCategoryById(Long id);
}
