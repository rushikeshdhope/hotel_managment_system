package com.hotel.hotel_management.model;


import java.util.List;

import org.hibernate.annotations.SQLInsert;

import com.hotel.hotel_management.utility.IdenetityType;

import jakarta.persistence.*;

@Entity

public class RelatedCustomer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long related_customer_id;
	
	private String name;
	private IdenetityType idenetityType;
	
	@ManyToMany(cascade = CascadeType.ALL)
	private List<StoredImages> idtyImages;
	
	
	public List<StoredImages> getIdtyImages() {
		return idtyImages;
	}
	public void setIdtyImages(List<StoredImages> idtyImages) {
		this.idtyImages = idtyImages;
	}
	public Long getRelated_customer_id() {
		return related_customer_id;
	}
	public void setRelated_customer_id(Long related_customer_id) {
		this.related_customer_id = related_customer_id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public IdenetityType getIdenetityType() {
		return idenetityType;
	}
	public void setIdenetityType(IdenetityType idenetityType) {
		this.idenetityType = idenetityType;
	}
	@Override
	public String toString() {
		return "RelatedCustomer [related_customer_id=" + related_customer_id + ", name=" + name + ", idenetityType="
				+ idenetityType + ", idtyImages=" + idtyImages + "]";
	}
	
	

}
