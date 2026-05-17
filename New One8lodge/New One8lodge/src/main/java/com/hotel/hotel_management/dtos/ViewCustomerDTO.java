package com.hotel.hotel_management.dtos;

import java.util.List;

import com.hotel.hotel_management.model.Customers;

public class ViewCustomerDTO {
	
	private Customers customers;
	private List<RelatedCustomerDTO> relatedCustomerDTOs;
	
	public Customers getCustomers() {
		return customers;
	}
	public void setCustomers(Customers customers) {
		this.customers = customers;
	}
	public List<RelatedCustomerDTO> getRelatedCustomerDTOs() {
		return relatedCustomerDTOs;
	}
	public void setRelatedCustomerDTOs(List<RelatedCustomerDTO> relatedCustomerDTOs) {
		this.relatedCustomerDTOs = relatedCustomerDTOs;
	}
	

}
