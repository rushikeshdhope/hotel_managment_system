package com.hotel.hotel_management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.UserWithOtpDTO;
import com.hotel.hotel_management.model.Mail;
import com.hotel.hotel_management.model.UploadPdf;
import com.hotel.hotel_management.model.User;
import com.hotel.hotel_management.repo.UploadPdf_Repo;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.MailService;
import com.hotel.hotel_management.service.UploadPdf_Service;

@RestController
@RequestMapping("3Dplannet/v1/pdf")
@CrossOrigin("*")
public class UploadPdf_Controller {

	@Autowired
	private UploadPdf_Service pdf_Service;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private UploadPdf_Repo pdf_Repo;

	@PostMapping("/savePdf")
	public SuccessResponse savePdf(@ModelAttribute UploadPdf uploadPdf,
			@RequestParam("pdf") MultipartFile pdf) {
		return pdf_Service.savePdf(uploadPdf, pdf);
	}

	@GetMapping("/getPdfById/{pdfId}")
	public SuccessResponse getPdfById(@PathVariable Long pdfId) {
		return pdf_Service.getPdfById(pdfId);
	}

	@GetMapping("/getAllPdf")
	public SuccessResponse getAllPdf() {
		return pdf_Service.getAllPdf();
	}

	@DeleteMapping("deletePdf/{pdfId}")
	public SuccessResponse deletePdf(@PathVariable Long pdfId) {
		return pdf_Service.deletePdf(pdfId);
	}
	
	@PostMapping("sendPdf")
	public SuccessResponse sendEmail(@RequestParam(value = "name",required = false) String name,
			@RequestParam(value = "mobile",required = false) String mobileNo,
			@RequestParam(value = "email",required = false) String email,
			@RequestParam(value = "course",required = false) String courseName) {
		Mail mail = new Mail();
		SuccessResponse response = new SuccessResponse();
		
		String link = null;
		
		if (name != null && mobileNo != null && email != null && courseName != null) {
			
			List<UploadPdf> all = pdf_Repo.findAll();
			
			for(UploadPdf uploadPdf : all) {
				if(uploadPdf.getPdf_course_name().toLowerCase().equals(courseName.toLowerCase()))
				{
					link = uploadPdf.getPdf_link();
			    }
			}	
		}else {
			response.nullResponse();
			return response;
		}
			
		if(link != null) {
			mail.setMailFrom("geniushr25@gmail.com");
			mail.setMailTo(email);
			mail.setMailSubject("Course Syllabus.");
			mail.setMailContent("Hello "+name+" ,\n Thanks Your Apply Syllabus.\n"+ link);
			mailService.sendEmail(mail);
			response.sendEmailSuccessfully(mail);
			return response;
		} else {
			response.courseNotFound();
			return response;
		}
	}
	
}
