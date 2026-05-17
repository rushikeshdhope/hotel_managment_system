package com.hotel.hotel_management.serviceImpl;

import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hotel.hotel_management.dtos.LoginDTO;
import com.hotel.hotel_management.dtos.LoginModelDTO;
import com.hotel.hotel_management.model.User;
import com.hotel.hotel_management.repo.UserRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.UserService;
import com.hotel.hotel_management.utility.Role;

@Component
public class UserServiceImpl  implements UserService{

	@Autowired
	UserRepository repository;
	
	@Autowired
	ModelMapper modelMapper;
	
	SuccessResponse response = new SuccessResponse();
	
	@Override
	public SuccessResponse loginUser(LoginDTO loginDto) {
		if (loginDto != null) {
			String loginuserName = loginDto.getUser_name();
			String loginPassword = loginDto.getUser_password();
			Role loginRole = loginDto.getRole();
			Optional<User> byUserName = repository.findByUserName(loginuserName);
			if (byUserName.isPresent()) {
				User users = byUserName.get();
				LoginModelDTO map = modelMapper.map(users, LoginModelDTO.class);
				
				if (loginPassword.equals(users.getPassword()) && loginRole.equals(users.getRole())) {

						response.loginSuccessfully(map);
						return response;
					
				} else
					response.loginFailed();
				return response;
			} else
				response.incorrectUserName();

			return response;
		}
		response.nullResponse();
		return response;
	}
	
	@Override
	public SuccessResponse forgetPassword(LoginDTO loginDto) {
		if (loginDto.getUser_name() == null) {
			response.noDataFound();
			return response;
		}
		String loginUsername = loginDto.getUser_name();
		String loginPassword = loginDto.getUser_password();
		Role loginUserRole = loginDto.getRole();

		Optional<User> byUsername = repository.findByUserName(loginUsername);
		if (byUsername.isPresent()) {
			User users = byUsername.get();
			if (loginPassword == null || (loginPassword.length() < 6)) {
				response.loginFailed();
				return response;
			}
			if (loginUserRole.equals(users.getRole())) {
				users.setPassword(loginPassword);
				repository.save(users);
				LoginModelDTO map = modelMapper.map(users, LoginModelDTO.class);
				response.passwordUpdateSuccessfully(map);
				return response;
			} else {
				response.selectCorrectRole();
				return response;
			}
		} else {
			response.incorrectUsername();
		}
		return response;
	}

	@Override
	public SuccessResponse verifyEmailAndPassword(LoginDTO loginDto) {
		if (loginDto.getUser_name() != null && loginDto.getUser_password() != null) {
			Optional<User> userOptional = repository.findByUserName(loginDto.getUser_name());
			if (userOptional.isPresent()) {
				User user = userOptional.get();
				if (loginDto.getUser_password().equals(user.getPassword())) {
					response.PasswordVerifySuccessfully();
					return response;
				} else {
					response.PasswordVerifyFailed();
					return response;
				}
			} else {
				response.incorrectEmail();
				return response;
			}
		}
		response.noDataFound();
		return response;
	}

	@Override
	public SuccessResponse getAllUsersData() {
		// TODO Auto-generated method stub
        List<User> listUsers = repository.findAll();
        response.getAllData(listUsers);
        return response;
	}


	
	
}
