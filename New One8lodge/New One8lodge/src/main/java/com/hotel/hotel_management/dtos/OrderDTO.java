package com.hotel.hotel_management.dtos;



import java.util.List;

import com.hotel.hotel_management.model.FoodDetail;
import com.hotel.hotel_management.model.Payment;
import com.hotel.hotel_management.model.RelatedCustomer;
import com.hotel.hotel_management.model.RoomDetail;
import com.hotel.hotel_management.utility.OrderStatus;

public class OrderDTO {
	private Long order_id;
	private String order_no;
	private Long customers_id;	
	private int noOfCount;
	private String bookingDate;
	private String date;
	private String intime;
	private String outtime;
	private String extendTime;
	private String remark;
	private Long paid_amount;
	private Long remaining_amount;
	private Long advance_amount;
	private Long extra_amount;
	private Long totalAmount; 
    private List<FoodDetail> foodDetails;
    private List<Payment> payments;
	private RoomDetail roomDetails;	
	private OrderStatus orderStatus = OrderStatus.PENDING;
	
	private RelatedCustomer relatedCustomer;
	
	private String creationTime;
	private String modifiedTime;
   
	public Long getAdvance_amount() {
		return advance_amount;
	}

	public void setAdvance_amount(Long advance_amount) {
		this.advance_amount = advance_amount;
	}

	public String getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(String creationTime) {
		this.creationTime = creationTime;
	}

	public String getModifiedTime() {
		return modifiedTime;
	}

	public void setModifiedTime(String modifiedTime) {
		this.modifiedTime = modifiedTime;
	}
	
    public RelatedCustomer getRelatedCustomer() {
		return relatedCustomer;
	}

	public void setRelatedCustomer(RelatedCustomer relatedCustomer) {
		this.relatedCustomer = relatedCustomer;
	}

	public String getBookingDate() {
		return bookingDate;
	}
	public void setBookingDate(String bookingDate) {
		this.bookingDate = bookingDate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public OrderStatus getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
	public Long getExtra_amount() {
		return extra_amount;
	}
	public void setExtra_amount(Long extra_amount) {
		this.extra_amount = extra_amount;
	}
	public int getNoOfCount() {
		return noOfCount;
	}
	public void setNoOfCount(int noOfCount) {
		this.noOfCount = noOfCount;
	}

	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public RoomDetail getRoomDetails() {
		return roomDetails;
	}
	public void setRoomDetails(RoomDetail roomDetails) {
		this.roomDetails = roomDetails;
	}
	public List<Payment> getPayments() {
		return payments;
	}
	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}
	public List<FoodDetail> getFoodDetails() {
		return foodDetails;
	}
	public void setFoodDetails(List<FoodDetail> foodDetails) {
		this.foodDetails = foodDetails;
	}
	public Long getOrder_id() {
		return order_id;
	}
	public void setOrder_id(Long order_id) {
		this.order_id = order_id;
	}
	public String getOrder_no() {
		return order_no;
	}
	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}

	public String getIntime() {
		return intime;
	}
	public void setIntime(String intime) {
		this.intime = intime;
	}
	public String getOuttime() {
		return outtime;
	}
	public void setOuttime(String outtime) {
		this.outtime = outtime;
	}
	
	public String getExtendTime() {
		return extendTime;
	}
	public void setExtendTime(String extendTime) {
		this.extendTime = extendTime;
	}
	public Long getPaid_amount() {
		return paid_amount;
	}
	public void setPaid_amount(Long paid_amount) {
		this.paid_amount = paid_amount;
	}
	public Long getRemaining_amount() {
		return remaining_amount;
	}
	public void setRemaining_amount(Long remaining_amount) {
		this.remaining_amount = remaining_amount;
	}
	public Long getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Long totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Long getCustomers_id() {
		return customers_id;
	}
	public void setCustomers_id(Long customers_id) {
		this.customers_id = customers_id;
	}
}
