package com.hotel.hotel_management.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class FoodCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long food_category_id;
	@NotBlank(message = "Category Name is Required")
	@Size(min = 2, max = 30, message = "Name must be between 2 and 30 characters")
	private String food_category_name;
	@Column(nullable = false, updatable = false)
	private String creation_time;
	private String modification_time;
	private boolean status = true;

	public Long getFood_category_id() {
		return food_category_id;
	}

	public void setFood_category_id(Long food_category_id) {
		this.food_category_id = food_category_id;
	}

	public String getFood_category_name() {
		return food_category_name;
	}

	public void setFood_category_name(String food_category_name) {
		this.food_category_name = food_category_name;
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

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public FoodCategory(Long food_category_id,
			@NotBlank(message = "Category Name is Required") @Size(min = 2, max = 30, message = "Name must be between 2 and 30 characters") String food_category_name,
			String creation_time, String modification_time, boolean status) {
		super();
		this.food_category_id = food_category_id;
		this.food_category_name = food_category_name;
		this.creation_time = creation_time;
		this.modification_time = modification_time;
		this.status = status;
	}

	public FoodCategory() {
		super();
		// TODO Auto-generated constructor stub
	}

}
