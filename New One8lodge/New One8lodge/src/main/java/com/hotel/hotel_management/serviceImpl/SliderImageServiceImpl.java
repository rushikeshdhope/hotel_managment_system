package com.hotel.hotel_management.serviceImpl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.model.SliderImage;
import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.repo.SliderImageRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.BlobServiceAzure;
import com.hotel.hotel_management.service.SliderImageService;

@Component
public class SliderImageServiceImpl implements SliderImageService {

	@Autowired
	BlobServiceAzure storeImageAzure;

	SuccessResponse response = new SuccessResponse();
	
	@Autowired
	SliderImageRepository imageRepository;

	
	@Override
	public SuccessResponse saveOrupdateSliderImage(Long slider_image_id, MultipartFile image_file) {
		SliderImage sliderImage = new SliderImage();
		if(image_file != null)
		{
			try {
				StoredImages storeFile = storeImageAzure.storeFile(image_file.getOriginalFilename(),
						image_file.getInputStream(), image_file.getSize(), 2);
				sliderImage.setImage_name(storeFile.getImage_name());
				sliderImage.setImage_link(storeFile.getImg_link());
			} catch (IOException e) {
				e.printStackTrace();
				response.ExceptionForImg(response);
			}
		}
	   
		if(slider_image_id != null) {
			sliderImage.setSlider_image_id(slider_image_id);
			imageRepository.save(sliderImage);
			response.updateSliderImageResponse(sliderImage);
		}else {
			imageRepository.save(sliderImage);
			response.saveSliderImageResponse(sliderImage);
		}	
		
		
		
		return response;

	}

	@Override
	public SuccessResponse getSliderImageById(Long id) {
		// TODO Auto-generated method stub
		if(id!=null) {
			Optional<SliderImage> byId = imageRepository.findById(id);
			if(byId.isPresent()) {
				SliderImage sliderImage = byId.get();
				response.getSliderImageResponse(sliderImage);
				return response;
			}
		}
		response.customerNotFoundResponse();
		return response;
	}

	@Override
	public SuccessResponse getAllSliderImage() {
		// TODO Auto-generated method stub
		List<SliderImage> all = imageRepository.findAll();
		if (!all.isEmpty()) {
			response.getSliderImageResponse(all);
			return response;
		} else
			response.sliderImageNotFoundResponse();
		return response;		
		
	}

	@Override
	public SuccessResponse deleteSliderImageById(Long id) {
		// TODO Auto-generated method stub
		if (id != null) {
			Optional<SliderImage> byId = imageRepository.findById(id);
			if (byId.isPresent()) {
				imageRepository.deleteById(id);
				response.delteSliderImageById(byId);
				return response;
			}
		}
		response.sliderImageNotFoundResponse();
		return response;		
	}

}
