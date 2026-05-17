package com.hotel.hotel_management.serviceImpl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.hotel_management.model.FoodCategory;
import com.hotel.hotel_management.repo.FoodCategoryRepository;
import com.hotel.hotel_management.repo.FoodRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.FoodCategoryService;

@Service
public class FoodCategoryServiceImpl implements FoodCategoryService {

	@Autowired
	FoodCategoryRepository categoryRepository;
	
	@Autowired
	FoodRepository foodRepository;

	SuccessResponse response = new SuccessResponse();

	@Override
	public SuccessResponse saveOrUpdateFoodCategory(FoodCategory foodCategory) {

		LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String formattedDateTime = dateTime.format(formatter);

		if (foodCategory.getFood_category_name() != null) {
			if (foodCategory.getFood_category_id() != null) {
				Optional<FoodCategory> byId = categoryRepository.findById(foodCategory.getFood_category_id());
				if (byId.isPresent()) {
					FoodCategory foodCategory2 = byId.get();

					foodCategory2.setFood_category_name(foodCategory.getFood_category_name());
					foodCategory2.setModification_time(formattedDateTime);
					categoryRepository.save(foodCategory2);
					response.updateCategoryResponse(foodCategory2);
					return response;
				}
			}

			Optional<FoodCategory> byCategoryName = categoryRepository
					.findByCategoryName(foodCategory.getFood_category_name());
			if (byCategoryName.isPresent()) {
				response.categoryAlreadyExist();
				return response;
			}
		}

		foodCategory.setCreation_time(formattedDateTime);
		categoryRepository.save(foodCategory);
		response.saveCategoryResponse(foodCategory);
		return response;
	}

	@Override
	public SuccessResponse getFoodCategoryById(Long id) {
		if (id != null) {
			Optional<FoodCategory> byId = categoryRepository.findById(id);
			if (byId.isPresent()) {
				FoodCategory foodCategory = byId.get();
				response.getCategoryByIdResponse(foodCategory);
				return response;
			}
		}
		response.categoryNotFoundResponse();
		return response;
	}

	@Override
	public SuccessResponse getAllFoodCategory() {
		List<FoodCategory> all = categoryRepository.findAll();
		if (!all.isEmpty()) {
			response.getCategoryByIdResponse(all);
			return response;
		} else
			response.categoryNotFoundResponse();
		return response;
	}

	@Override
	public SuccessResponse deleteFoodCategoryById(Long id) {
		// TODO Auto-generated method stub
        int categoryCount = foodRepository.isPresentFoodCategoryInFood(id);
		
		if(categoryCount != 0) {
			response.presentDataUnderCategory();
			return response;
		}else {
		
		if (id != null) {
			Optional<FoodCategory> byId = categoryRepository.findById(id);
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
