package com.hotel.hotel_management.controller;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.hotel_management.dtos.LoginDTO;
import com.hotel.hotel_management.dtos.UserWithOtpDTO;
import com.hotel.hotel_management.model.Mail;
import com.hotel.hotel_management.model.User;
import com.hotel.hotel_management.repo.UserRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.MailService;
import com.hotel.hotel_management.service.UserService;


@RestController
@RequestMapping("hotel_booking/v1/user")
@CrossOrigin
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	private MailService mailService;

	@Autowired
	private UserRepository usersRepository;
	
	@Autowired
	ModelMapper modelMapper;
	
	
	

	
	@PostMapping("/login")
	public SuccessResponse loginUser(@RequestBody LoginDTO loginDTO) {
		return userService.loginUser(loginDTO);
	}

	@PostMapping("/sendEmail")
	public SuccessResponse sendEmail(@RequestBody Mail info) {
		Optional<User> user = usersRepository.findByEmail(info.getMailTo());
		Mail mail = new Mail();
		SuccessResponse response = new SuccessResponse();
		Optional<User> byEmail = usersRepository.findByEmail(info.getMailTo());
		if (byEmail.isPresent()) {
			int randomNumber = (int) (Math.random() * 900000) + 100000;
			mail.setMailFrom("geniushr25@gmail.com");
			mail.setMailTo(info.getMailTo());
			mail.setMailSubject("OTP for forget Password");
			mail.setMailContent("Hello Mail send Successfully. Your OTP is : " + randomNumber);
			mailService.sendEmail(mail);
			UserWithOtpDTO otpDTO =  modelMapper.map(user, UserWithOtpDTO.class);
			otpDTO.setOtp(randomNumber);
			response.sendEmailSuccessfully(otpDTO);
			return response;
		} else {
			response.emailNotSend();
			return response;
		}
	}

	@PostMapping("/forgetPassword")
	public SuccessResponse setNewPassword(@RequestBody LoginDTO loginDto) {
		return userService.forgetPassword(loginDto);
	}

	@PostMapping("/verifyUsernameAndPassword")
	public SuccessResponse verifyEmail(@RequestBody LoginDTO loginDto) {
		return userService.verifyEmailAndPassword(loginDto);
	}
	
	
	@GetMapping("/getAllData")
	public SuccessResponse getAllUsersData() {
		return userService.getAllUsersData();
	}


}
