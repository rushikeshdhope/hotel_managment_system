package com.hotel.hotel_management.model;

import java.util.List;

import com.hotel.hotel_management.utility.RoomStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Room {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long room_id;
	
	private Long room_number;
	private RoomStatus roomStatus;
	private Long room_category_id;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "acprice_id")
	private ACPrice acPrice;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "nonacprice_id")
	private NonACPrice nonacPrice;
	private String description;
	
	@ManyToMany(cascade = CascadeType.ALL)
	private List<StoredImages> images;
	
	private String creation_time;
	private String modification_time;
	private boolean status;
	
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
}
