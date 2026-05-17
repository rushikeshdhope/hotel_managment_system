package com.hotel.hotel_management.serviceImpl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hotel.hotel_management.dtos.FoodDTO;
import com.hotel.hotel_management.model.Food;
import com.hotel.hotel_management.model.FoodCategory;
import com.hotel.hotel_management.repo.FoodCategoryRepository;
import com.hotel.hotel_management.repo.FoodRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.FoodService;

@Component
public class FoodServiceImpl implements FoodService {

	@Autowired
	FoodRepository foodRepository;
	
	@Autowired
	FoodCategoryRepository categoryRepository;
	
	@Autowired
    ModelMapper mapper;
	
	SuccessResponse response = new SuccessResponse();
	
	@Override
	public SuccessResponse saveOrUpdateFood(FoodDTO FoodDto) {
		// TODO Auto-generated method stub
		LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String formattedDateTime = dateTime.format(formatter);
		
		Optional<FoodCategory> foodCategory = categoryRepository.findById(FoodDto.getFoodCategory_id());

		if(foodCategory.isEmpty()) {
			response.categoryNotFoundResponse();
			return response;
		}
			
		if (FoodDto.getFood_id() != null) {
				Optional<Food> byId = foodRepository.findById(FoodDto.getFood_id());
				if (byId.isPresent()) {
					Food food = mapper.map(FoodDto,Food.class);
					food.setCreation_time(byId.get().getCreation_time());
					food.setModification_time(formattedDateTime);
					foodRepository.save(food);
					
					FoodDTO FoodDTO = mapper.map(food, FoodDTO.class);
					response.updateFoodResponse(FoodDTO);
					return response;
				}
			}

			String FoodNumber = foodRepository.findByFoodName(FoodDto.getFood_name());
			if (FoodNumber !=null) {
				response.foodAlreadyExist();
				return response;
			}
		

		FoodDto.setCreation_time(formattedDateTime);
		
		Food Food1 = mapper.map(FoodDto, Food.class);
		foodRepository.save(Food1);
		
		FoodDTO FoodDto1 = mapper.map(Food1, FoodDTO.class);
		response.saveFoodResponse(FoodDto1);
		return response;
	}

	@Override
	public SuccessResponse getFoodById(Long id) {
		// TODO Auto-generated method stub
		if (id != null) {
			Optional<Food> byId = foodRepository.findById(id);
			if (byId.isPresent()) {
				Food Food = byId.get();
				response.getFoodResponse(Food);
				return response;
			}
		}
		response.foodNotFoundResponse();
		return response;
		
	}

	@Override
	public SuccessResponse getAllFood() {
		// TODO Auto-generated method stub
		List<Food> all = foodRepository.findAll();
		if (!all.isEmpty()) {
			response.getFoodResponse(all);
			return response;
		} else
			response.foodNotFoundResponse();
		return response;	
		
	}

	@Override
	public SuccessResponse deleteFoodById(Long id) {
		// TODO Auto-generated method stub
			
		if (id != null) {
			Optional<Food> byId = foodRepository.findById(id);
			if (byId.isPresent()) {
				foodRepository.deleteById(id);
				response.delteFoodById(byId);
				return response;
			}
		}
		response.foodNotFoundResponse();
		return response;	
		
	}

	@Override
	public SuccessResponse getFoodByCategoryId(Long categoryId) {
		// TODO Auto-generated method stub
		if (categoryId != null) {
			List<Food> byId = foodRepository.findFoodByCategoryId(categoryId);
			if (!byId.isEmpty()) {
				response.getFoodResponse(byId);
				return response;
			}
		}
		response.foodNotFoundResponse();
		return response;	
	}

	@Override
	public SuccessResponse getFoodByName(String foodName) {
		if (foodName != null) {
			List<Food> food = foodRepository.findFoodByName(foodName);
			if (!food.isEmpty()) {
				response.getFoodResponse(food);
				return response;
			}
		}
		response.foodNotFoundResponse();
		return response;	
	}	
}
