package com.hotel.hotel_management.serviceImpl;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.model.RoomCategory;
import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.repo.RoomCategoryRepository;
import com.hotel.hotel_management.repo.RoomRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.BlobServiceAzure;
import com.hotel.hotel_management.service.RoomCategoryService;

@Service
public class RoomCategoryServiceImpl implements RoomCategoryService {

	@Autowired
	private RoomCategoryRepository categoryRepository;
	
	
	@Autowired
	RoomRepository repository;

	SuccessResponse response = new SuccessResponse();
	
	@Autowired
	BlobServiceAzure storeImageAzure;


	@Override
	public SuccessResponse saveOrUpdateRoomCategory(RoomCategory roomCategory,MultipartFile image_file) {
    	LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String formattedDateTime = dateTime.format(formatter);

        if(image_file != null) {
			try {
				StoredImages storeFile = storeImageAzure.storeFile(image_file.getOriginalFilename(),
						image_file.getInputStream(), image_file.getSize(), 4);
				roomCategory.setImage_name(storeFile.getImage_name());
				roomCategory.setImage_link(storeFile.getImg_link());
	
			} catch (IOException e) {
				e.printStackTrace();
				response.ExceptionForImg(response);
				return response;
			}
        }
		
//		System.out.println("=> "+roomCategory);
		
		if (roomCategory.getRoom_category_id() != null) {
			Optional<RoomCategory> byId = categoryRepository.findById(roomCategory.getRoom_category_id());
			if (byId.isPresent()) {
				RoomCategory roomCategory2 = byId.get();

				roomCategory2.setRoom_category_name(roomCategory.getRoom_category_name());
				roomCategory2.setModification_time(formattedDateTime);
				roomCategory2.setDescription(roomCategory.getDescription());

                if(image_file != null) {
                	roomCategory2.setImage_link(roomCategory.getImage_link());
  				    roomCategory2.setImage_name(roomCategory.getImage_name()); 
                }
				
				
				categoryRepository.save(roomCategory2);
				response.updateCategoryResponse(roomCategory2);
				return response;
			}
		}

		Optional<RoomCategory> byCategoryName = categoryRepository.findByCategoryName(roomCategory.getRoom_category_name());
		if (byCategoryName.isPresent()) {
			response.categoryAlreadyExist();
			return response;
		}

		roomCategory.setCreation_time(formattedDateTime);
		categoryRepository.save(roomCategory);
		response.saveCategoryResponse(roomCategory);
		return response;
	}

	@Override
	public SuccessResponse getRoomCategoryById(Long id) {
		if (id != null) {
			Optional<RoomCategory> byId = categoryRepository.findById(id);
			if (byId.isPresent()) {
				RoomCategory roomCategory = byId.get();
				response.getCategoryByIdResponse(roomCategory);
				return response;
			}
		}
		response.categoryNotFoundResponse();
		return response;
	}

	@Override
	public SuccessResponse getAllRoomCategory() {
		List<RoomCategory> all = categoryRepository.findAll();
		if (!all.isEmpty()) {
			response.getCategoryByIdResponse(all);
			return response;
		} else
			response.categoryNotFoundResponse();
		return response;
	}
	
	public SuccessResponse deleteRoomCategoryById(Long id) {
	    int categoryCount = repository.isPresentRoomCategoryInRoom(id);
			
		if(categoryCount != 0) {
			response.presentDataUnderCategory();
			return response;
		}else {
			if (id != null) {
			    
			 Optional<RoomCategory> byId = categoryRepository.findById(id);
			 if (byId.isPresent()) {
				    categoryRepository.deleteById(id);
				    response.delteCategory(byId);
			    	return response;
			 }
		}
		}
		response.categoryNotFoundResponse();
		return response;	
	}

}
