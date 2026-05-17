package com.hotel.hotel_management.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.CustomersDTO;
import com.hotel.hotel_management.dtos.OrderDTO;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.utility.OrderStatus;

@Service
public interface OrderService {

	public SuccessResponse getOrderById(Long id);

	public SuccessResponse getAllOrder(int page, int size);
	
	public SuccessResponse saveAllOrder(CustomersDTO customersDTO, List<MultipartFile> image_file,List<MultipartFile> related_file, OrderDTO orderDto,MultipartFile payment_file);

	public SuccessResponse deleteOrderById(Long id);

	public void roomAvailableNotification();

	public SuccessResponse getAllOrderByCustomerId(Long customerId);

	public SuccessResponse GetTheDailySale(String Date);

	public SuccessResponse getTheMonthWiseSale(String monthYear);

	public SuccessResponse getTheYearWiseSale(@RequestParam String year);

	public SuccessResponse getTheRoomsUsingOrderStatus(int page,int size,OrderStatus orderStatus);
	
	public SuccessResponse getCurrentCustomerUsingRoomNo(String roomNo);
	
    public SuccessResponse getAllOrderByBookingDate(String bookingDate);

}
