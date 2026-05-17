package com.hotel.hotel_management.model;


import java.util.List;

import com.hotel.hotel_management.utility.OrderStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long order_id;
	private String order_no;
	private Long customers_id;	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "related_customer_id")
	private RelatedCustomer relatedCustomer;
	private int noOfCount;
	private String date;
	private String bookingDate;
	private String intime;
	private String outtime;
	private String extendTime;
	
	private Long paid_amount;
	private String remark;
	private Long advance_amount;
	private Long extra_amount;
    private Long remaining_amount;
	private Long totalAmount;
	private OrderStatus orderStatus = OrderStatus.PENDING;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "roomdetail_id")
	private RoomDetail roomDetails;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FoodDetail> foodDetails;
	
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments;
    
	
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
	public Long getPaid_amount() {
		return paid_amount;
	}
	public void setPaid_amount(Long paid_amount) {
		this.paid_amount = paid_amount;
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

	public Long getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Long totalAmount) {
		this.totalAmount = totalAmount;
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
	public Long getRemaining_amount() {
		return remaining_amount;
	}
	public void setRemaining_amount(Long remaining_amount) {
		this.remaining_amount = remaining_amount;
	}
	public String getExtendTime() {
		return extendTime;
	}
	public void setExtendTime(String extendTime) {
		this.extendTime = extendTime;
	}

	public Long getCustomers_id() {
		return customers_id;
	}

	public void setCustomers_id(Long customers_id) {
		this.customers_id = customers_id;
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

	@Override
	public String toString() {
		return "Order [order_id=" + order_id + ", order_no=" + order_no + ", customers_id=" + customers_id
				+ ", relatedCustomer=" + relatedCustomer + ", noOfCount=" + noOfCount + ", date=" + date
				+ ", bookingDate=" + bookingDate + ", intime=" + intime + ", outtime=" + outtime + ", extendTime="
				+ extendTime + ", paid_amount=" + paid_amount + ", remark=" + remark + ", advance_amount="
				+ advance_amount + ", extra_amount=" + extra_amount + ", remaining_amount=" + remaining_amount
				+ ", totalAmount=" + totalAmount + ", orderStatus=" + orderStatus + ", roomDetails=" + roomDetails
				+ ", foodDetails=" + foodDetails + ", payments=" + payments + ", creationTime=" + creationTime
				+ ", modifiedTime=" + modifiedTime + "]";
	}
	
	
	
}
