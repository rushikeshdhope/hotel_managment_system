package com.hotel.hotel_management.model;


import jakarta.persistence.*;

@Entity
public class RoomDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long roomdetail_id;	
	private Long room_number;
	private String duration;
	private boolean is_ac;
	private Long amount;
	
	
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public Long getRoom_number() {
		return room_number;
	}
	public void setRoom_number(Long room_number) {
		this.room_number = room_number;
	}
	public boolean isIs_ac() {
		return is_ac;
	}
	public void setIs_ac(boolean is_ac) {
		this.is_ac = is_ac;
	}
	public Long getRoomdetail_id() {
		return roomdetail_id;
	}
	public void setRoomdetail_id(Long roomdetail_id) {
		this.roomdetail_id = roomdetail_id;
	}
	
	public Long getAmount() {
		return amount;
	}
	public void setAmount(Long amount) {
		this.amount = amount;
	}
}
