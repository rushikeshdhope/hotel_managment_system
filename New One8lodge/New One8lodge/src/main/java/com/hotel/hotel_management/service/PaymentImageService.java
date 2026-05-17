package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.model.PaymentImage;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface PaymentImageService {

	public SuccessResponse savePaymentImage(PaymentImage paymentImage,MultipartFile file);
}
