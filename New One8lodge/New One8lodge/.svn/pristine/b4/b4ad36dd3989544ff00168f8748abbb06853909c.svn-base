package com.hotel.hotel_management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.model.PaymentImage;
import com.hotel.hotel_management.model.SliderImage;
import com.hotel.hotel_management.repo.PaymentImageRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.PaymentImageService;

@RestController
@CrossOrigin
@RequestMapping("/hotel_booking/v1/admin/payment_image")
public class PaymentImageController {
	
	@Autowired
	PaymentImageService imageService;
	
	@Autowired
	PaymentImageRepository imageRepository;
	
	
	@PostMapping("/savedPaymentImage")
	public SuccessResponse savePaymentImage(@ModelAttribute PaymentImage paymentImage,
			@RequestParam(value = "file", required = false) MultipartFile image_file) 
	{
		 return imageService.savePaymentImage(paymentImage, image_file);
	}
	
	@GetMapping("/getPaymentImage")
	public SuccessResponse getPaymentImage(@RequestParam Long orderId) 
	{
		SuccessResponse response = new SuccessResponse();
		if(orderId!=null) {
			List<PaymentImage> byId = imageRepository.getAllPaymentImageByOrderId(orderId);
			if(!byId.isEmpty()) {
				response.getPaymentImageResponse(byId);
				return response;
			}
		}
		response.paymentImageNotFoundResponse();
		return response;
	}
}