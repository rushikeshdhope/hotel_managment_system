package com.hotel.hotel_management.dtos;
public class LoginCustomerModelDTO {
  
	    private Long customer_id;
		private String customer_email;
		
		public Long getCustomer_id() {
			return customer_id;
		}
		public void setCustomer_id(Long customer_id) {
			this.customer_id = customer_id;
		}
		public String getCustomer_email() {
			return customer_email;
		}
		public void setCustomer_email(String customer_email) {
			this.customer_email = customer_email;
		}
		
}
