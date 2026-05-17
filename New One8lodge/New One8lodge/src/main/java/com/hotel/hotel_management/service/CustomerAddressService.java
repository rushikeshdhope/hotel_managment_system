package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;

import com.hotel.hotel_management.model.CustomerAddress;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface CustomerAddressService {
	
	public SuccessResponse saveAddress(CustomerAddress customerAddress);
	
	public SuccessResponse getAddressById(Long id);
	
	public SuccessResponse getAddressByCustomerId(Long customerId);

}
