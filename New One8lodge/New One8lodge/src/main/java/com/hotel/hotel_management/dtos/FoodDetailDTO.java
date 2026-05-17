package com.hotel.hotel_management.dtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;

public class FoodDetailDTO {
	
	private Long foodDetail_id;
	
	@NotNull(message = "Food Id is required")
	private Long food_id;
	
	@NotNull(message = "Quantity is required")
	private Long quantity;
	
	private Long amount;
	
	@Column(nullable = false, updatable = false)
	private String creation_time;
	private String modification_time;
	private boolean status = true;
	
	public String getCreation_time() {
		return creation_time;
	}
	public void setCreation_time(String creation_time) {
		this.creation_time = creation_time;
	}
	public String getModification_time() {
		return modification_time;
	}
	public void setModification_time(String modification_time) {
		this.modification_time = modification_time;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Long getFoodDetail_id() {
		return foodDetail_id;
	}
	public void setFoodDetail_id(Long foodDetail_id) {
		this.foodDetail_id = foodDetail_id;
	}
	public Long getFood_id() {
		return food_id;
	}
	public void setFood_id(Long food_id) {
		this.food_id = food_id;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public Long getAmount() {
		return amount;
	}
	public void setAmount(Long amount) {
		this.amount = amount;
	}
}
