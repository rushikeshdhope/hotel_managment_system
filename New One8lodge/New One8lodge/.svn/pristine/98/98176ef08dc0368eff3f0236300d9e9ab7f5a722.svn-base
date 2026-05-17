package com.hotel.hotel_management.dtos;

import java.util.List;

import com.hotel.hotel_management.model.CustomerAddress;
import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.model.Vehicle;
import com.hotel.hotel_management.utility.IdenetityType;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Customers1DTO {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long customer_id;
	private String customer_no;
	private String customer_name;
	private String customer_mobile;
	private IdenetityType identity_type;
	
	private String creation_time;
	private String modification_time;
    private List<CustomerAddress> addresses;
	private List<Vehicle> vehicles;
	private List<StoredImages> idtyImages;
	
	public List<StoredImages> getImages() {
		return idtyImages;
	}
	public void setImages(List<StoredImages> idtyImages) {
		this.idtyImages = idtyImages;
	}
	public Long getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(Long customer_id) {
		this.customer_id = customer_id;
	}
	public String getCustomer_no() {
		return customer_no;
	}
	public void setCustomer_no(String customer_no) {
		this.customer_no = customer_no;
	}
	public String getCustomer_name() {
		return customer_name;
	}
	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}
	public String getCustomer_mobile() {
		return customer_mobile;
	}
	public void setCustomer_mobile(String customer_mobile) {
		this.customer_mobile = customer_mobile;
	}
	
	public IdenetityType getIdentity_type() {
		return identity_type;
	}
	public void setIdentity_type(IdenetityType identity_type) {
		this.identity_type = identity_type;
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
	public List<CustomerAddress> getAddresses() {
		return addresses;
	}
	public void setAddresses(List<CustomerAddress> addresses) {
		this.addresses = addresses;
	}
	public List<Vehicle> getVehicles() {
		return vehicles;
	}
	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}
	
}
