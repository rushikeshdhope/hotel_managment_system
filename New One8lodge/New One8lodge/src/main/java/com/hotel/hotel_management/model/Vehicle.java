package com.hotel.hotel_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Vehicle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long vehicle_id;

	private String vehicle_number;

//	@NotNull(message =  "Customer must be Required")

	public Long getVehicle_id() {
		return vehicle_id;
	}

	public void setVehicle_id(Long vehicle_id) {
		this.vehicle_id = vehicle_id;
	}

	public String getVehicle_number() {
		return vehicle_number;
	}

	public void setVehicle_number(String vehicle_number) {
		this.vehicle_number = vehicle_number;
	}

	public Vehicle(Long vehicle_id, String vehicle_number) {
		super();
		this.vehicle_id = vehicle_id;
		this.vehicle_number = vehicle_number;
	}

	public Vehicle() {
		super();
		// TODO Auto-generated constructor stub
	}

}
