package com.hotel.hotel_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UploadPdf {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pdf_id;
	private String pdf_course_name;
	
	private String pdf_link;
	private String pdf_name;
	
	public Long getPdf_id() {
		return pdf_id;
	}
	public void setPdf_id(Long pdf_id) {
		this.pdf_id = pdf_id;
	}
	public String getPdf_course_name() {
		return pdf_course_name;
	}
	public void setPdf_course_name(String pdf_course_name) {
		this.pdf_course_name = pdf_course_name;
	}
	public String getPdf_link() {
		return pdf_link;
	}
	public void setPdf_link(String pdf_link) {
		this.pdf_link = pdf_link;
	}
	public String getPdf_name() {
		return pdf_name;
	}
	public void setPdf_name(String pdf_name) {
		this.pdf_name = pdf_name;
	}
	@Override
	public String toString() {
		return "UploadPdf [pdf_id=" + pdf_id + ", pdf_course_name=" + pdf_course_name + ", pdf_link=" + pdf_link
				+ ", pdf_name=" + pdf_name + "]";
	}
	
	
	
	
	
}
