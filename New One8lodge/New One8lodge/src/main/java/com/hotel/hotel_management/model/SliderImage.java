package com.hotel.hotel_management.model;

import jakarta.persistence.*;

@Entity
public class SliderImage {
     
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long slider_image_id;
	private String image_name; 
	private String image_link;
	
	public Long getSlider_image_id() {
		return slider_image_id;
	}
	public void setSlider_image_id(Long slider_image_id) {
		this.slider_image_id = slider_image_id;
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
	
	
}
