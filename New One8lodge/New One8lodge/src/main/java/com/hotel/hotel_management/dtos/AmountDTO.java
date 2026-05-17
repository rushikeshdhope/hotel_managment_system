package com.hotel.hotel_management.dtos;

public class AmountDTO {
	
	private Long cash_amount;
	private Long online_amount;
	private Long total_amount;
	
	public Long getCash_amount() {
		return cash_amount;
	}
	public void setCash_amount(Long cash_amount) {
		this.cash_amount = cash_amount;
	}
	public Long getOnline_amount() {
		return online_amount;
	}
	public void setOnline_amount(Long online_amount) {
		this.online_amount = online_amount;
	}
	public Long getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(Long total_amount) {
		this.total_amount = total_amount;
	}

}
