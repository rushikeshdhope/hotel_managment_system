package com.hotel.hotel_management.serviceImpl;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.model.PaymentImage;
import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.repo.PaymentImageRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.BlobServiceAzure;
import com.hotel.hotel_management.service.PaymentImageService;

@Component
public class PaymentImageServiceImpl implements PaymentImageService {

	@Autowired
	PaymentImageRepository imageRepository;
	
	@Autowired
	BlobServiceAzure storeImageAzure;
	
	SuccessResponse response = new SuccessResponse();
	
	@Override
	public SuccessResponse savePaymentImage(PaymentImage paymentImage,MultipartFile image_file) {

		if(image_file != null) {
			try {
				StoredImages storeFile = storeImageAzure.storeFile(image_file.getOriginalFilename(),
						image_file.getInputStream(), image_file.getSize(), 1);
				paymentImage.setImage_name(storeFile.getImage_name());
				paymentImage.setImage_link(storeFile.getImg_link());
			
			} catch (IOException e) {
				e.printStackTrace();
				response.ExceptionForImg(response);
				return response;
			}
			
			System.out.println("=> sujay");
		}	
	
		
		PaymentImage paymentImage1 = imageRepository.save(paymentImage);
		response.savePaymentImageResponse(paymentImage1);
		return response;
	}
	
	
}
