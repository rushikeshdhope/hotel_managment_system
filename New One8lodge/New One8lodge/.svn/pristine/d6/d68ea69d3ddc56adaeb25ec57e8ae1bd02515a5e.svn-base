package com.hotel.hotel_management.response;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import com.hotel.hotel_management.dtos.MonthWiseSaleDTO;
import com.hotel.hotel_management.model.Messages;
import com.hotel.hotel_management.model.Order;

public class SuccessResponse {

	private Object response;
	private boolean status;
	private String message;
	private HttpStatusCode statusCode;

	public Object getResponse() {
		return response;
	}

	public void setResponse(Object response) {
		this.response = response;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public HttpStatusCode getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(HttpStatusCode statusCode) {
		this.statusCode = statusCode;
	}

//===================================================================================================================

	public void invalidEmailFormat() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_ACCEPTABLE;
		this.message = Messages.invalid_email_format;
	}

	public void emailAlreadyExist() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.email_already_exist;
	}

	public void moibleAlreadyExist() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_ACCEPTABLE;
		this.message = Messages.mobile_already_exist;
	}

	public void ExceptionForImg(Object categoryResponce) {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.BAD_REQUEST;
		this.message = Messages.exception_for_Img;
	}

	public void saveResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.save_user;
	}

	public void updateResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.update_user;
	}

	public void getCustomerByIdResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.customer_found;
	}

	public void customerNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.customer_not_found;
	}

	public void getCustomerResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.customer_found;
	}

	public void saveCategoryResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.category_save;
	}

	public void updateCategoryResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.category_update;
	}

	public void getCategoryByIdResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.category_found;
	}

	public void categoryNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.category_not_found;
	}

	public void categoryAlreadyExist() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.category_already_exist;
	}

	public void delteCategory(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.delete_Cat_data;

	}

	public void presentDataUnderCategory() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.delete_not_possible;
	}

	public void nullResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.null_data;
	}

	public void saveAddressResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.save_address;
	}

	public void getCustomerAddressByIdResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.customer_address_found;
	}

	public void customerAddressNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.customer_address_not_found;
	}

	public void saveVehicleResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.save_address;
	}

	public void getVehicleResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.vehicle_found;
	}

	public void loginSuccessfully(Object login) {
		this.response = login;
		this.status = true;
		this.statusCode = HttpStatus.ACCEPTED;
		this.message = Messages.login_successfully;
	}

	public void incorrectUserName() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_ACCEPTABLE;
		this.message = Messages.incorrect_user_name;
	}

	public void noDataFound() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.BAD_REQUEST;
		this.message = Messages.user_not_found;

	}

	public void incorrectEmail() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_ACCEPTABLE;
		this.message = Messages.incorrect_email;
	}

	public void incorrectUsername() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_ACCEPTABLE;
		this.message = Messages.incorrect_user_name;
	}

	public void selectCorrectRole() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.select_correct_role;
	}

	public void passwordUpdateSuccessfully(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.ACCEPTED;
		this.message = Messages.update_password_successfully;

	}

	public void PasswordVerifyFailed() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.password_verify_failed;
	}

	public void PasswordVerifySuccessfully() {
		this.response = null;
		this.status = true;
		this.statusCode = HttpStatus.ACCEPTED;
		this.message = Messages.verify_password;
	}

	public void loginFailed() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_ACCEPTABLE;
		this.message = Messages.login_failed;
	}

	public void sendEmailSuccessfully(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.email_send_successfully;

	}

	public void emailNotSend() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.email_not_send;
	}

	public void getAllData(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.found_data;

	}

	// room

	public void roomAlreadyExist() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.roomNumber_already_exist;
	}

	public void saveRoomResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.room_save;
	}

	public void updateRoomResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.room_update;
	}

	public void getRoomResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.room_found;
	}

	public void roomNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.room_not_found;
	}

	public void delteRoomById(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.delete_room_data;

	}

	// food

	public void foodAlreadyExist() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.foodNumber_already_exist;
	}

	public void saveFoodResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.food_save;
	}

	public void updateFoodResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.food_update;
	}

	public void getFoodResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.food_found;
	}

	public void foodNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.food_not_found;
	}

	public void delteFoodById(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.delete_food_data;

	}

	// food detail

	public void saveFoodDetailResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.food_detail_save;
	}

	public void updateFoodDetailResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.food_detail_update;
	}

	public void getFoodDetailResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.food_detail_found;
	}

	public void foodDetailNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.food_detail_not_found;
	}

	public void foodNotExist() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.food_not_exist;
	}

	public void delteFoodDetailById(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.delete_foodDetail_data;

	}
//payment

	public void savePaymentResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.payment_save;
	}

	public void updatePaymentResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.payment_update;
	}

	public void getPaymentResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.payment_found;
	}

	public void paymentNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.payment_not_found;
	}

	public void deltePaymentById(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.delete_payment_data;

	}

//slider image

	public void saveSliderImageResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.image_save;
	}

	public void updateSliderImageResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.image_update;
	}

	public void getSliderImageResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.image_found;
	}

	public void sliderImageNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.image_not_found;
	}

	public void delteSliderImageById(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.delete_image_data;

	}

	// order

	public void saveOrderResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.order_save;
	}

	public void updateOrderResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.order_update;
	}

	public void getOrderResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.order_found;
	}

	public void orderNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.order_not_found;
	}

	public void delteOrderById(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.delete_order_data;

	}

	public void paidPaymentHigh() {
		this.response = null;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.payment_high;
	}

	public void paidAllAmount() {
		this.response = null;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.paid_Amount;
	}

	public void noPoints() {
		this.response = null;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.no_points;
	}

	public void deleteRoomImage() {
		this.response = null;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.delete_room_image;
	}

	// notification

	public void getNotificationResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.notification_found;
	}

	public void notificationNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.notification_not_found;
	}

	public void notRegisterCustomer() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.customer_not_register;
	}

	// PaymentImage

	public void savePaymentImageResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.paymentImage_save;
	}

	public void updatePaymentImageResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.paymentImage_update;
	}

	public void getPaymentImageResponse(Object response) {
		this.response = response;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.paymentImage_found;
	}

	public void paymentImageNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.paymentImage_not_found;
	}

	public void deltePaymentImageById(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.delete_paymentImage;

	}

	public void getEngageTime(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.engage_time_found;
	}

	public void notFoundEngageTime() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.engage_time_not_found;
	}

	public void orderNotUpdate() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.order_not_update;
	}

//---------------------------------------------------------------------------------------------------------	

	public void DateIsNull() {
		// TODO Auto-generated method stub
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.enter_null_date;

	}

	public void getTheDaysWiseSale(Object totalSaleForDay) {
		// TODO Auto-generated method stub
		this.response = totalSaleForDay;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.get_daily_sale;

	}

	public void dateNotfound() {
		// TODO Auto-generated method stub
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.date_not_found;

	}

	public void setMonthWiseSales(Object monthWiseSaleDTOs) {

		this.response = monthWiseSaleDTOs;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.get_monthly_sale;

	}

	public void setYearWiseSales(Object monthWiseSaleDTOs) {

		this.response = monthWiseSaleDTOs;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.get_year_sale;

	}
	public void notAnySaleForThisMonth() {
		// TODO Auto-generated method stub
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.not_for_sale_month;

	}

	public void notAnySaleForThisYear() {
		// TODO Auto-generated method stub
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.not_for_sale_year;

	}

	public void setRooms(List<Order> rooms) {
		this.response = rooms;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.get_the_Details;
	}

	public void saveReview(Object object) {
		this.response = object;
		this.status = true;
		this.statusCode = HttpStatus.CREATED;
		this.message = Messages.save_review;
	}

	public void getAllReview(Object object) {
		this.response = object;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.get_review;
	}

	public void requiredData() {
		this.response = null;
		this.status = true;
		this.statusCode = HttpStatus.NO_CONTENT;
		this.message = Messages.required_message;
	}

	public void amountResponse(Object object) {
		this.response = object;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.amount_response;
	}

	public void relatedCustomerNotFoundResponse() {
		this.response = null;
		this.status = false;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.relcustomer_not_found;
	}
	
	public void getRoomSale(Object totalSaleForDay) {
		this.response = totalSaleForDay;
		this.status = true;
		this.statusCode = HttpStatus.FOUND;
		this.message = Messages.get_room_sale;

	}
	
	public void notFoundRoomSale() {
		this.response = null;
		this.status = true;
		this.statusCode = HttpStatus.NOT_FOUND;
		this.message = Messages.not_found_room_sale;

	}
	
	public void not_found() {
		this.response = null;
		this.status = false;
		this.message = Messages.data_not_found;
		this.statusCode = HttpStatus.NOT_FOUND;
	}

	public void getResponse(Object obj) {
		this.response = obj;
		this.status = true;
		this.statusCode = HttpStatus.OK;
		this.message = Messages.get_data;
	}

	public void courseNotFound() {
		this.response = null;
		this.status = false;
		this.message = Messages.course_not_found;
		this.statusCode = HttpStatus.NOT_FOUND;		
	}
}
