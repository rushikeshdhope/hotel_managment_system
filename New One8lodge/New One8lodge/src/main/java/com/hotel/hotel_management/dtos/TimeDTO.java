package com.hotel.hotel_management.dtos;

public class TimeDTO {
	
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
	public TimeDTO(String intime, String outtime) {
		super();
		this.intime = intime;
		this.outtime = outtime;
	}
	@Override
	public String toString() {
		return "TimeDTO [intime=" + intime + ", outtime=" + outtime + "]";
	}
	
	
}
