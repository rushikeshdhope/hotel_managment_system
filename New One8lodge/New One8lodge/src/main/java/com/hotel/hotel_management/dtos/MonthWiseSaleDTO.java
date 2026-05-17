package com.hotel.hotel_management.dtos;

import java.math.BigDecimal;

public class MonthWiseSaleDTO {

	private String month;
	private BigDecimal totalSale;

	public MonthWiseSaleDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public BigDecimal getTotalSale() {
		return totalSale;
	}

	public void setTotalSale(BigDecimal totalSale) {
		this.totalSale = totalSale;
	}

	public MonthWiseSaleDTO(String month, BigDecimal totalSale) {
		super();
		this.month = month;
		this.totalSale = totalSale;
	}

}
