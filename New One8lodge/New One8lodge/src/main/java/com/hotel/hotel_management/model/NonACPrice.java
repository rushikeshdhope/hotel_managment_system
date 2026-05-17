package com.hotel.hotel_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class NonACPrice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nonac_price_id;
	
    private Long three_hour;
	
    private Long six_hour;
    
    private Long nine_hour;
	
    private Long twelve_hour;
	
    private Long sixteen_hour;
	
    private Long twentyfour_hour;
	
    private Long full_night;
		
	public Long getNine_hour() {
		return nine_hour;
	}
	public void setNine_hour(Long nine_hour) {
		this.nine_hour = nine_hour;
	}
	public Long getNonACPrice_id() {
		return nonac_price_id;
	}
	public void setNonAC_id(Long nonac_price_id) {
		this.nonac_price_id = nonac_price_id;
	}
	public Long getThree_hour() {
		return three_hour;
	}
	public void setThree_hour(Long three_hour) {
		this.three_hour = three_hour;
	}
	public Long getSix_hour() {
		return six_hour;
	}
	public void setSix_hour(Long six_hour) {
		this.six_hour = six_hour;
	}
	public Long getTwelve_hour() {
		return twelve_hour;
	}
	public void setTwelve_hour(Long twelve_hour) {
		this.twelve_hour = twelve_hour;
	}
	public Long getSixteen_hour() {
		return sixteen_hour;
	}
	public void setSixteen_hour(Long sixteen_hour) {
		this.sixteen_hour = sixteen_hour;
	}
	public Long getTwentyfour_hour() {
		return twentyfour_hour;
	}
	public void setTwentyfour_hour(Long twentyfour_hour) {
		this.twentyfour_hour = twentyfour_hour;
	}
	public Long getFull_night() {
		return full_night;
	}
	public void setFull_night(Long full_night) {
		this.full_night = full_night;
	}	
}
