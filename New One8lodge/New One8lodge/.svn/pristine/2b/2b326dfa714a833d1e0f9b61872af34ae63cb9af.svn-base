package com.hotel.hotel_management.model;

import jakarta.persistence.*;

@Entity
public class PaymentImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long paymentimage_id;
	private Long payment_id;
	private Long order_id;
	private String image_link;
	private String image_name;
	
	
	
	public Long getOrder_id() {
		return order_id;
	}
	public void setOrder_id(Long order_id) {
		this.order_id = order_id;
	}
	public Long getPaymentimage_id() {
		return paymentimage_id;
	}
	public void setPaymentimage_id(Long paymentimage_id) {
		this.paymentimage_id = paymentimage_id;
	}
	public Long getPayment_id() {
		return payment_id;
	}
	public void setPayment_id(Long payment_id) {
		this.payment_id = payment_id;
	}
	public String getImage_link() {
		return image_link;
	}
	public void setImage_link(String image_link) {
		this.image_link = image_link;
	}
	public String getImage_name() {
		return image_name;
	}
	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}
	
}
