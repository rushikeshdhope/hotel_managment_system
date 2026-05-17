package com.hotel.hotel_management.dtos;

public class TimeDetailsDTO {

	 private String intime;
	 private String outtime;
	public String getIntime() {
		return intime;
	}
	public void setIntime(String intime) {
		this.intime = intime;
	}
	public String getOuttime() {
		return outtime;
	}
	public void setOuttime(String outtime) {
		this.outtime = outtime;
	}
	public TimeDetailsDTO(String intime, String outtime) {
		super();
		this.intime = intime;
		this.outtime = outtime;
	} 
	
}
