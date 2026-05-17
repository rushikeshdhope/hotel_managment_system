package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;

import com.hotel.hotel_management.model.Mail;

@Service
public interface MailService {
	
	public void sendEmail(Mail mail);


}
