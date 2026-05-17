package com.hotel.hotel_management.dtos;


import com.hotel.hotel_management.utility.PaymentType;

import jakarta.validation.constraints.NotNull;

public class PaymentDTO {
	
	private Long payment_id;
	
	@NotNull(message = "Customer Id is required")
	private Long customer_id;
	
	@NotNull(message = "Amount is required")
	private Long amount;
	
	@NotNull(message = "Payment Type is required")
	private PaymentType type;
	
	@NotNull(message = "Transaction Id is required")
	private String transaction_id;
	
	private String transaction_date;
//	@Column(nullable = false, updatable = false)
//	private String creation_time;
//	private String modification_time;
//	private boolean status = true;
	
	public Long getPayment_id() {
		return payment_id;
	}
	public void setPayment_id(Long payment_id) {
		this.payment_id = payment_id;
	}
	public Long getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(Long customer_id) {
		this.customer_id = customer_id;
	}
	public Long getAmount() {
		return amount;
	}
	public void setAmount(Long amount) {
		this.amount = amount;
	}
	public PaymentType getType() {
		return type;
	}
	public void setType(PaymentType type) {
		this.type = type;
	}
	public String getTransaction_id() {
		return transaction_id;
	}
	public void setTransaction_id(String transaction_id) {
		this.transaction_id = transaction_id;
	}
	public String getTransaction_date() {
		return transaction_date;
	}
	public void setTransaction_date(String transaction_date) {
		this.transaction_date = transaction_date;
	}
//	public String getCreation_time() {
//		return creation_time;
//	}
//	public void setCreation_time(String creation_time) {
//		this.creation_time = creation_time;
//	}
//	public String getModification_time() {
//		return modification_time;
//	}
//	public void setModification_time(String modification_time) {
//		this.modification_time = modification_time;
//	}
//	public boolean isStatus() {
//		return status;
//	}
//	public void setStatus(boolean status) {
//		this.status = status;
//	}
}
