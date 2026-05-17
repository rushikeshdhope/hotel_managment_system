package com.hotel.hotel_management.model;

import jakarta.persistence.*;

@Entity
public class Food {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long food_id;
	private String food_name;
	private Long rate;
	private Long foodCategory_id;
	private boolean isVeg=true;	
	private String creation_time;
	private String modification_time;
	private boolean status = true;
	
	
	public boolean isVeg() {
		return isVeg;
	}
	public void setVeg(boolean isVeg) {
		this.isVeg = isVeg;
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
}
