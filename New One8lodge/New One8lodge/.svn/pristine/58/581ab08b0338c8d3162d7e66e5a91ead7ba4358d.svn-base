package com.hotel.hotel_management.service;
import org.springframework.stereotype.Service;

import com.hotel.hotel_management.dtos.LoginDTO;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface UserService {
	public SuccessResponse loginUser(LoginDTO loginDto);
	
	public SuccessResponse forgetPassword(LoginDTO loginDto);

	public SuccessResponse verifyEmailAndPassword(LoginDTO loginDto);
	
	public SuccessResponse getAllUsersData();
}
