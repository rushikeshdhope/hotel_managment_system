package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;

import com.hotel.hotel_management.dtos.PaymentDTO;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface PaymentService {
	public SuccessResponse saveOrUpdatePayment(PaymentDTO paymentDTO);
	
	public SuccessResponse getPaymentById(Long id);
	
	public SuccessResponse getAllPayment();
	
	public SuccessResponse deletePaymentById(Long id);
	
}
