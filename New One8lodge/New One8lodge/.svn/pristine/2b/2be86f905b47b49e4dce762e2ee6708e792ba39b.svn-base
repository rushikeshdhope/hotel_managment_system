package com.hotel.hotel_management.serviceImpl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.model.UploadPdf;
import com.hotel.hotel_management.repo.UploadPdf_Repo;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.BlobServiceAzure;
import com.hotel.hotel_management.service.UploadPdf_Service;

@Service
public class UploadPdf_ServiceImpl implements UploadPdf_Service {

	
	@Autowired
	private UploadPdf_Repo pdf_Repo;
	
	@Autowired
	BlobServiceAzure storeImageAzure;
	
	private SuccessResponse response=new SuccessResponse();
	
	@Override
	public SuccessResponse savePdf(UploadPdf uploadPdf, MultipartFile pdf) {
		if (pdf == null || pdf.isEmpty()) {
			response.setMessage("Add an image");
			return response;
		}

		StoredImages storedImage;
		try {
			storedImage = storeImageAzure.storeFile(pdf.getOriginalFilename(), pdf.getInputStream(),
					pdf.getSize(), 1);

			uploadPdf.setPdf_link(storedImage.getImg_link());
			uploadPdf.setPdf_name(storedImage.getImage_name());
		} catch (IOException e) {
			e.printStackTrace();
			return response;
		}

		pdf_Repo.save(uploadPdf);

		response.setResponse(uploadPdf);
		response.setStatus(true);
		response.setMessage("PDF saved successfully..!");
		response.setStatusCode(HttpStatus.OK);
		return response;

	}

	@Override
	public SuccessResponse getAllPdf() {
		List<UploadPdf> images = pdf_Repo.findAll();
		if (images.isEmpty()) {
			response.not_found();
			return response;
		}

		response.getResponse(images);
		return response;
	}

	@Override
	public SuccessResponse deletePdf(Long pdfId) {
		 Optional<UploadPdf> optionalImage = pdf_Repo.findById(pdfId);
	        if (optionalImage.isEmpty()) {
	            response.not_found(); 
	            return response;
	        }

	        UploadPdf sliderImage = optionalImage.get();
	        storeImageAzure.deleteFile(sliderImage.getPdf_link());
	        pdf_Repo.deleteById(pdfId);

	    	response.setResponse(sliderImage);
		 	response.setStatus(true);
		 	response.setMessage("Image deleted successfully..!");
		 	response.setStatusCode(HttpStatus.OK);      
		 	return response;
	}

	@Override
	public SuccessResponse getPdfById(Long pdfId) {
		 Optional<UploadPdf> image = pdf_Repo.findById(pdfId);
	        if (!image.isPresent()) {
	            response.not_found(); 
	            return response;
	        }
	        UploadPdf pdf = image.get();
	        response.getResponse(pdf);
	        return response;
	}

	
}
