package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface SliderImageService  {

	public SuccessResponse saveOrupdateSliderImage(Long slider_image_id, MultipartFile image_file);

	public SuccessResponse getSliderImageById(Long id);

	public SuccessResponse getAllSliderImage();
	
	public SuccessResponse deleteSliderImageById(Long id);
}
