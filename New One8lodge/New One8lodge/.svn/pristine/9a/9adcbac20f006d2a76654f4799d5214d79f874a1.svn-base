package com.hotel.hotel_management.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.hotel.hotel_management.model.UploadPdf;
import com.hotel.hotel_management.response.SuccessResponse;

@Service
public interface UploadPdf_Service {

	
	public SuccessResponse getAllPdf();

	public SuccessResponse deletePdf(Long sliderImageId);

	public SuccessResponse getPdfById(Long sliderImageId);

	SuccessResponse savePdf(UploadPdf uploadPdf, MultipartFile pdf);
}
