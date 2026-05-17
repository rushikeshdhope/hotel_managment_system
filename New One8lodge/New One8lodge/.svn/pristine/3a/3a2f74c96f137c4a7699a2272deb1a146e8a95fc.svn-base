package com.hotel.hotel_management.dtos;

import java.util.List;

import com.hotel.hotel_management.model.ACPrice;
import com.hotel.hotel_management.model.NonACPrice;
import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.utility.RoomStatus;

import jakarta.persistence.Column;

public class RoomDTO {

	private Long room_id;
	private Long room_number;	

	
	private RoomStatus roomStatus;    

	private ACPrice acPrice;
	private NonACPrice nonacPrice;
	
	private String description;
	
	private List<StoredImages> images;
	
	private Long room_category_id;

	public List<StoredImages> getImages() {
		return images;
	}
	public void setImages(List<StoredImages> images) {
		this.images = images;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public ACPrice getAcPrice() {
		return acPrice;
	}
	public void setAcPrice(ACPrice acPrice) {
		this.acPrice = acPrice;
	}
	public NonACPrice getNonacPrice() {
		return nonacPrice;
	}
	public void setNonacPrice(NonACPrice nonacPrice) {
		this.nonacPrice = nonacPrice;
	}

	

	@Column(nullable = false, updatable = false)
	private String creation_time;
	private String modification_time;
	private boolean status = true;
	
	
	public Long getRoom_category_id() {
		return room_category_id;
	}
	public void setRoom_category_id(Long room_category_id) {
		this.room_category_id = room_category_id;
	}
	public RoomStatus getRoomStatus() {
		return roomStatus;
	}
	public void setRoomStatus(RoomStatus roomStatus) {
		this.roomStatus = roomStatus;
	}
	
	
	public Long getRoom_id() {
		return room_id;
	}
	public void setRoom_id(Long room_id) {
		this.room_id = room_id;
	}
	public Long getRoom_number() {
		return room_number;
	}
	public void setRoom_number(Long room_number) {
		this.room_number = room_number;
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
