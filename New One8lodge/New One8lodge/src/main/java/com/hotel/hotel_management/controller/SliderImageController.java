package com.hotel.hotel_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.SliderImageService;


@RestController
@CrossOrigin
@RequestMapping("/hotel_booking/v1/user/sliderimage")
public class SliderImageController {
	
	@Autowired
	SliderImageService imageService;
	
	@PostMapping("/saveSliderImage")
	public SuccessResponse saveOrupdateSliderImage(
			  @RequestParam(value ="image_id", required = false)Long slider_image_id,
			 @RequestParam(value = "image_name", required = false) String image_name,
			@RequestParam(value = "file", required = false) MultipartFile image_file) {
		return imageService.saveOrupdateSliderImage(slider_image_id,image_file);
	}
	
	

	@GetMapping("getSliderImageById/{id}")
	public SuccessResponse getSliderImageById(@PathVariable Long id) {
		return imageService.getSliderImageById(id);
	}

	@GetMapping("getAllSliderImage")
	public SuccessResponse getAllSliderImage() {
		return imageService.getAllSliderImage();
	}
	
	@DeleteMapping("deleteSliderImageById/{id}")
	public SuccessResponse deleteSliderImageById(@PathVariable Long id) {
		return imageService.deleteSliderImageById(id);
	}


}
