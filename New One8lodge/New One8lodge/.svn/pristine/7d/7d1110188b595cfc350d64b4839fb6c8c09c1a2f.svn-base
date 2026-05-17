package com.hotel.hotel_management.controller;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.CustomersDTO;
import com.hotel.hotel_management.model.Customers;
import com.hotel.hotel_management.model.Review;
import com.hotel.hotel_management.repo.CustomersRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.CustomerService;
import com.hotel.hotel_management.serviceImpl.CustomerServiceImpl;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("hotel_booking/v1/customers")
@Validated
public class CustomersController {

	@Autowired
	CustomerService customerService;
	
	@Autowired
	CustomersRepository customersRepository;
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	CustomerServiceImpl customerServiceImpl;
	
	

	@GetMapping("test")
	public String testApi() {
		return "Welcome To One 8 Lodge.";
	}

	@PostMapping("saveCustomer")
	public SuccessResponse saveCustomersDetails(
			 @RequestParam(value = "image_name", required = false) String image_name,
			@RequestParam(value = "file", required = false) List<MultipartFile> image_file,
			@RequestParam(value = "related_file", required = false) List<MultipartFile> related_file,

			@Valid @ModelAttribute CustomersDTO customers) {
		return customerService.saveCustomer(customers, image_file,related_file);
	}

	@GetMapping("getCustomerById/{id}")
	public SuccessResponse getCustomerById(@PathVariable Long id) {
		return customerService.getCustomerById(id);
	}

	@GetMapping("getCustomerByIdIfCheckIn/{id}")
	public SuccessResponse getCustomerByIdIfCheckIn(@PathVariable Long id) {
		return customerService.getCustomerByIdIfCheckIn(id);
	}

	@GetMapping("getCustomerByMobile")
	public SuccessResponse getCustomerByMobile(@RequestParam String mobile) {
		return customerService.getCustomerByMobile(mobile);
	}

	@GetMapping("getCustomerByIdNumber")
	public SuccessResponse getCustomerByIdNumber(@RequestParam String id_number) {
		return customerService.getCustomerByIdNumber(id_number);
	}
	
	@GetMapping("getAllCustomer")
	public SuccessResponse getAllCustomer(    
			@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
		return customerService.getAllCustomer(page, size);
	}

	@GetMapping("getCustomerByName")
	public SuccessResponse getCustomerByName(@RequestParam String customerName) {
		return customerService.getCustomerByName(customerName);
	}
	
    @PostMapping("saveCustomerReview")
	public SuccessResponse saveCustomerReview(@RequestParam Long customerId,@ModelAttribute Review review) {
    	return customerService.saveCustomerReview(customerId, review);
    }
    
    @GetMapping("getAllCustomerReview")
	public SuccessResponse getAllCustomerReview() {
    	return customerService.getAllCustomerReview();
    }
    
    @GetMapping("customerByMobileNo") //single specific
	public SuccessResponse customerByMobileNo(@RequestParam String mobileNo) {

    	SuccessResponse response = new SuccessResponse();
    	if(mobileNo!=null) {
        	Optional<Customers> customerByMobileNo = customersRepository.getCustomerByMobileNo(mobileNo);
			if(!customerByMobileNo.isEmpty()) {
				response.getCustomerByIdResponse(customerByMobileNo);
				return response;
			}
		}
		response.customerNotFoundResponse();
		return response;
    }

    @GetMapping("findRelatedCustomersByCustomerId/{customerId}") //single specific

    public List<Object[]> findRelatedCustomersByCustomerId(@PathVariable Long customerId){
    	return customersRepository.findRelatedCustomersByCustomerId(customerId);
    }

	
}
