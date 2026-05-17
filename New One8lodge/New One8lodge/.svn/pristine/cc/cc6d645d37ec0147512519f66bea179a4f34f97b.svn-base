package com.hotel.hotel_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StoredImages {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String image_name;
	private String img_link;
	private Long room_id;
	private Long customer_id;
	private Long rel_customer_id;
	
	public Long getRel_customer_id() {
		return rel_customer_id;
	}

	public void setRel_customer_id(Long rel_customer_id) {
		this.rel_customer_id = rel_customer_id;
	}

	public Long getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(Long customer_id) {
		this.customer_id = customer_id;
	}

	public Long getRoom_id() {
		return room_id;
	}

	public void setRoom_id(Long room_id) {
		this.room_id = room_id;
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImage_name() {
		return image_name;
	}

	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}

	public String getImg_link() {
		return img_link;
	}

	public void setImg_link(String img_link) {
		this.img_link = img_link;
	}

	

	public StoredImages(Long id, String image_name, String img_link, Long room_id) {
		super();
		this.id = id;
		this.image_name = image_name;
		this.img_link = img_link;
		this.room_id = room_id;
	}

	public StoredImages() {
		super();
		// TODO Auto-generated constructor stub
	}

}
