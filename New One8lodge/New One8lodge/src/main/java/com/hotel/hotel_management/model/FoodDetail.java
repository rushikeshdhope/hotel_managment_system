package com.hotel.hotel_management.model;

import jakarta.persistence.*;

@Entity
public class FoodDetail {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long foodDetail_id;
	private Long food_id;
	private Long quantity;
	private Long amount;
private String food_name;
//	private String creation_time;
//	private String modification_time;
//	private boolean status = true;
//
//	
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
	public String getFood_name() {
		return food_name;
	}
	public void setFood_name(String food_name) {
		this.food_name = food_name;
	}
	
	
	
	
}
