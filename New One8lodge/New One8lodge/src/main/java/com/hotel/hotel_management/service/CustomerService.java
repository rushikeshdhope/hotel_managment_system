package com.hotel.hotel_management.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.CustomersDTO;
import com.hotel.hotel_management.model.Review;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface CustomerService {

	public SuccessResponse saveCustomer(CustomersDTO customersDTO,List<MultipartFile> image_file,List<MultipartFile> related_file);
	
	public SuccessResponse getCustomerById(Long id);
	
	public SuccessResponse getCustomerByIdIfCheckIn(Long id);
	
	public SuccessResponse getCustomerByIdNumber(String id_number);

	public SuccessResponse getCustomerByMobile(String mobile);
	
	public SuccessResponse getAllCustomer(int page, int size);
	
	public SuccessResponse getCustomerByName(String customerName);
	
    public SuccessResponse saveCustomerReview(Long customerId,Review review);
    
	public SuccessResponse getAllCustomerReview();
		
}
