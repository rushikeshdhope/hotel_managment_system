package com.hotel.hotel_management.dtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;

public class FoodDTO {

	private Long food_id;
	@NotNull(message = "Food Name is required")
	private String food_name;
	
	@NotNull(message = "Rate is required")
	private Long rate;
	
	@NotNull(message = "Food Category Id is required")
	private Long foodCategory_id;
	private boolean isVeg=true;	
	@Column(nullable = false, updatable = false)
	private String creation_time;
	private String modification_time;
	private boolean status = true;
	
	
	public boolean isVeg() {
		return isVeg;
	}
	public void setVeg(boolean isVeg) {
		this.isVeg = isVeg;
	}
	public Long getFood_id() {
		return food_id;
	}
	public void setFood_id(Long food_id) {
		this.food_id = food_id;
	}
	public String getFood_name() {
		return food_name;
	}
	public void setFood_name(String food_name) {
		this.food_name = food_name;
	}
	public Long getRate() {
		return rate;
	}
	public void setRate(Long rate) {
		this.rate = rate;
	}
	public Long getFoodCategory_id() {
		return foodCategory_id;
	}
	public void setFoodCategory_id(Long foodCategory_id) {
		this.foodCategory_id = foodCategory_id;
	}
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
}
