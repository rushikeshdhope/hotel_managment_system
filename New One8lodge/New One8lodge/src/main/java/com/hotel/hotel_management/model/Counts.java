package com.hotel.hotel_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Counts {

	@Id
	private Long count_id;
	private String name;
	private String abbreviation;
	private Long count;

	public Long getCount_id() {
		return count_id;
	}

	public void setCount_id(Long count_id) {
		this.count_id = count_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public Counts(Long count_id, String name, String abbreviation, Long count) {
		super();
		this.count_id = count_id;
		this.name = name;
		this.abbreviation = abbreviation;
		this.count = count;
	}

	public Counts() {
		super();
		// TODO Auto-generated constructor stub
	}

}
