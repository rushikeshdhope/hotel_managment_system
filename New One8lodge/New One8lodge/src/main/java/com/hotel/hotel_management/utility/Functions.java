package com.hotel.hotel_management.utility;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;

import com.hotel.hotel_management.repo.CustomersRepository;
import com.hotel.hotel_management.repo.OrderRepository;

public class Functions {

	@Autowired
	static OrderRepository orderRepository;

	@Autowired
	static CustomersRepository customersRepository;

	public static int getAgeUsingDate(String date) {
		DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate dateOfBirth = LocalDate.parse(date, dateFormatter);
		LocalDate currentDate = LocalDate.now();
		int age = Period.between(dateOfBirth, currentDate).getYears();
		return age;
	}


	public static String removeLeadingZero(String time) {
		String[] parts = time.split(":");
		int hours = Integer.parseInt(parts[0]);
		int minutes = Integer.parseInt(parts[1]);
		return String.format("%d:%02d", hours, minutes);
	}

	public static long calculatePoints(long totalAmount) {
		double tenPercent = totalAmount * 0.10;
		long flooredPoints = (long) Math.floor(tenPercent);
		return flooredPoints;
	}

}
