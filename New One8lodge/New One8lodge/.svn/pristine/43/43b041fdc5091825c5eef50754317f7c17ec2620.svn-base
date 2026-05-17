package com.hotel.hotel_management.model;

import jakarta.persistence.*;

@Entity
public class CustomerLoyality {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loyality_id;
	private Long points=0L;
	private Long customer_id;
	
	public Long getLoyality_id() {
		return loyality_id;
	}
	
	public void setLoyality_id(Long loyality_id) {
		this.loyality_id = loyality_id;
	}
	
	public Long getPoints() {
		return points;
	}
	
	public void setPoints(Long points) {
		this.points = points;
	}
	
	public Long getCustomer_id() {
		return customer_id;
	}
	
	public void setCustomer_id(Long customer_id) {
		this.customer_id = customer_id;
	}
}
