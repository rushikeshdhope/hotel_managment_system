package com.hotel.hotel_management.model;

import com.hotel.hotel_management.utility.FromStatus;
import com.hotel.hotel_management.utility.RoomStatus;

import jakarta.persistence.*;

@Entity
public class Notification {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long notificationId;
	private String message;
	private boolean is_view = false;
	private String creation_time; 
	private String modification_time;
	private String seentime;
	private RoomStatus roomStatus;
	private Long customer_id;
	private FromStatus fromStatus; 
	
	public FromStatus getFromStatus() {
		return fromStatus;
	}
	public void setFromStatus(FromStatus fromStatus) {
		this.fromStatus = fromStatus;
	}
	public Long getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(Long customer_id) {
		this.customer_id = customer_id;
	}
	public RoomStatus getRoomStatus() {
		return roomStatus;
	}
	public void setRoomStatus(RoomStatus roomStatus) {
		this.roomStatus = roomStatus;
	}
	public String getSeentime() {
		return seentime;
	}
	public void setSeentime(String seentime) {
		this.seentime = seentime;
	}
	public boolean isIs_view() {
		return is_view;
	}
	public void setIs_view(boolean is_view) {
		this.is_view = is_view;
	}
	public Long getNotification_id() {
		return notificationId;
	}
	public void setNotification_id(Long notificationId) {
		this.notificationId = notificationId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
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
	@Override
	public String toString() {
		return "Notification [notificationId=" + notificationId + ", message=" + message + ", is_view=" + is_view
				+ ", creation_time=" + creation_time + ", modification_time=" + modification_time + ", seentime="
				+ seentime + ", roomStatus=" + roomStatus + ", customer_id=" + customer_id + ", fromStatus="
				+ fromStatus + "]";
	}
	
	
}
