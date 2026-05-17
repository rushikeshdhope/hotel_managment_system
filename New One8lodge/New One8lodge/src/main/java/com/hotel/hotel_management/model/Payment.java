package com.hotel.hotel_management.model;

import com.hotel.hotel_management.utility.PaymentType;
import jakarta.persistence.*;

@Entity
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long payment_id;
	private Long customer_id;
	private Long amount;
	private PaymentType type;
	private String transaction_date;
	private String image_link;
	
	public Long getPayment_id() {
		return payment_id;
	}
	public String getImage_link() {
		return image_link;
	}
	public void setImage_link(String image_link) {
		this.image_link = image_link;
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
	public String getTransaction_date() {
		return transaction_date;
	}
	public void setTransaction_date(String transaction_date) {
		this.transaction_date = transaction_date;
	}

}
