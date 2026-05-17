package com.hotel.hotel_management.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.AllRoomSaleDTO;
import com.hotel.hotel_management.dtos.AmountDTO;
import com.hotel.hotel_management.dtos.CustomersDTO;
import com.hotel.hotel_management.dtos.OrderDTO;
import com.hotel.hotel_management.dtos.RoomSaleDetail;
import com.hotel.hotel_management.dtos.TimeDTO;
import com.hotel.hotel_management.repo.OrderRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.OrderService;
import com.hotel.hotel_management.serviceImpl.OrderServiceImpl;
import com.hotel.hotel_management.utility.OrderStatus;
import com.hotel.hotel_management.utility.PaymentType;

@RestController
@CrossOrigin
@RequestMapping("hotel_booking/v1/user/order")
@Validated
public class OrderController {

	@Autowired
	OrderService orderService;

	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	OrderServiceImpl orderServiceImpl;
	
	SuccessResponse response = new SuccessResponse();

	@GetMapping("/getOrderById/{id}")
	public SuccessResponse getOrderById(@PathVariable Long id) {
		return orderService.getOrderById(id);
	}

	@GetMapping("/getAllOrder")
	public SuccessResponse getAllOrder(@RequestParam int page, @RequestParam int size) {
		return orderService.getAllOrder(page, size);
	}

	@DeleteMapping("/deleteOrderById/{id}")
	public SuccessResponse deleteOrderById(@PathVariable Long id) {
		return orderService.deleteOrderById(id);
	}

	@GetMapping("/getAll")
	public void getAll() {
		orderService.roomAvailableNotification();
    }

	@PostMapping("/saveAllOrder")
	public SuccessResponse saveAllOrder(@ModelAttribute CustomersDTO customersDTO,
			@RequestParam(value = "customerFile", required = false)List<MultipartFile> image_file,
			@RequestParam(value = "relatedFile", required = false) List<MultipartFile> related_file,
			@ModelAttribute OrderDTO orderDto,
			@RequestParam(value = "paymentFile", required = false) MultipartFile payment_file
			) {
		return orderService.saveAllOrder(customersDTO, image_file, related_file, orderDto,payment_file);
	}

	
	public List<TimeDTO> findIntimeOuttimeBy(String date, String roomNumber) {
	    List<Object[]> results = orderRepository.findIntimeAndOuttimeByDateAndRoomNumberNative(date, roomNumber);
	    return results.stream()
	                  .map(result -> new TimeDTO(
	                		  result[0] != null ? result[0].toString() : "0",
	                          result[1] != null ? result[1].toString() : "0"  
	                  )).collect(Collectors.toList());
	}
	
	@GetMapping("/getEngageTime")
	public SuccessResponse findIntimeAndOuttimeByDateAndRoomNumber(@RequestParam String date,
			@RequestParam String roomNumber) {
		List<TimeDTO> intimeOuttimeBy = findIntimeOuttimeBy(date,roomNumber);
		if (!intimeOuttimeBy.isEmpty()) {
			response.getEngageTime(intimeOuttimeBy);
			return response;
		}

		response.notFoundEngageTime();
		return response;
	}

	@GetMapping("/getAllOrderByCustomerId/{customerId}")
	public SuccessResponse getAllOrderByCustomerId(@PathVariable Long customerId) {
		return orderService.getAllOrderByCustomerId(customerId);
	}

	@GetMapping("/getAllOrderByBookingDate/{bookingDate}")
	public SuccessResponse getAllOrderByBookingDate(@PathVariable String bookingDate) {
		return orderService.getAllOrderByBookingDate(bookingDate);
	}

	@GetMapping("/getCurrentCustomerUsingRoomNo")
	public SuccessResponse getCurrentCustomerUsingRoomNo(@RequestParam(value = "roomNo") String roomNo) {
		return  orderService.getCurrentCustomerUsingRoomNo(roomNo);
	}
	
	@GetMapping("/getAllOrderByCustomerMobileNo")
	public SuccessResponse getAllOrderByCustomerMobileNo(@RequestParam(value = "parameter") String parameter) {
		 return orderServiceImpl.getAllOrderByCustomerMobileNo(parameter);
	}

	
//	
//------------------------------------------------------------------------------------------------------------------------		

//	get The Daily sale of the day		
	@GetMapping("getTheDailySale")
	public SuccessResponse GetTheDailySale(@RequestParam String Date) {
		return orderService.GetTheDailySale(Date);
	}

//-------------------------------------------------------------------------------------------------------------------		

	@GetMapping("getTheMonthWiseSale")
	public SuccessResponse getTheMonthWiseSale(@RequestParam String monthYear) {
		return orderService.getTheMonthWiseSale(monthYear);
	}
//------------------------------------------------------------------------------------------------------------------------

	@GetMapping("getTheYearWiseSale")
	public SuccessResponse getTheYearWiseSale(@RequestParam String year) {
		return orderService.getTheYearWiseSale(year);
	}

//---------------------------------------------------------------------------------------------------------------
//
//	@GetMapping("getTheRoomsUsingOrderStatus")
//	public SuccessResponse getTheRoomsUsingOrderStatus(@RequestParam(value = "status", required = false) List<String> statuses) {
//	    return orderService.getTheRoomsUsingOrderStatus(statuses);
//	}


	@GetMapping("getTheRoomsUsingOrderStatus")
	public SuccessResponse getTheRoomsUsingOrderStatus(@RequestParam int page,@RequestParam int size,@RequestParam OrderStatus orderStatus) {
	    return orderService.getTheRoomsUsingOrderStatus(page,size,orderStatus);
	}
	
	@GetMapping("getTotalAmountByBookingDate")
	public SuccessResponse getTotalAmountByBookingDate(@RequestParam String bookingDate) {
	     Long cashAmount = orderRepository.getSaleOnBookingDate(bookingDate, PaymentType.CASH);
	     Long onlineAmount = orderRepository.getSaleOnBookingDate(bookingDate, PaymentType.ONLINE);
	     Long totalAmount = orderRepository.getSaleOnBookingDate(bookingDate,null);
	    	     
	     AmountDTO amountDTO = new AmountDTO();
	     amountDTO.setCash_amount(cashAmount);
	     amountDTO.setOnline_amount(onlineAmount);
	     amountDTO.setTotal_amount(totalAmount);
	     
	     response.amountResponse(amountDTO);
	     return response;
	}
	
	@GetMapping("checkRoomAvailableOrNot")
	public Long checkRoomAvailableOrNot(@RequestParam String intime, @RequestParam String outtime,
			@RequestParam String date, @RequestParam String roomNumber) {
		return orderRepository.checkRoomAvailableOrNot(intime,outtime,date,roomNumber);
	}
	
	@GetMapping("getTotalAmountsByBookingDate")
	public SuccessResponse getTotalAmountsByBookingDate(@RequestParam String bookingDate) {
	      List<RoomSaleDetail> totalAmountsByBookingDate = orderRepository.getTotalAmountsByBookingDate(bookingDate);
	     SuccessResponse response = new SuccessResponse();
	     response.getTheDaysWiseSale(totalAmountsByBookingDate);
	     return response;
	    
	}
	
    
 		
}