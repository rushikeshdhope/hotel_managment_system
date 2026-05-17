package com.hotel.hotel_management.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class RoomCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long room_category_id;
	@NotBlank(message = "Category Name is Required")
	@Size(min = 2, max = 30, message = "Name must be between 2 and 30 characters")
	private String room_category_name;
	@Column(length = 1000)
	private String description;
	private String image_name; 
	private String image_link; 
	private String creation_time;
	private String modification_time;
	private boolean status=true;

	
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage_name() {
		return image_name;
	}

	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}

	public String getImage_link() {
		return image_link;
	}

	public void setImage_link(String image_link) {
		this.image_link = image_link;
	}

	public Long getRoom_category_id() {
		return room_category_id;
	}

	public void setRoom_category_id(Long room_category_id) {
		this.room_category_id = room_category_id;
	}

	public String getRoom_category_name() {
		return room_category_name;
	}

	public void setRoom_category_name(String room_category_name) {
		this.room_category_name = room_category_name;
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

	public RoomCategory(Long room_category_id, String room_category_name, String creation_time,
			String modification_time, boolean status) {
		super();
		this.room_category_id = room_category_id;
		this.room_category_name = room_category_name;

		this.creation_time = creation_time;
		this.modification_time = modification_time;
		this.status = status;
	}

	public RoomCategory() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "RoomCategory [room_category_id=" + room_category_id + ", room_category_name=" + room_category_name
				+ ", description=" + description + ", image_name=" + image_name + ", image_link=" + image_link
				+ ", creation_time=" + creation_time + ", modification_time=" + modification_time + ", status=" + status
				+ "]";
	}

}
