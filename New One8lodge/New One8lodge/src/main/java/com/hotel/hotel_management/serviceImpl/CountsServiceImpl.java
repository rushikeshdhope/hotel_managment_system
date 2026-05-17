package com.hotel.hotel_management.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


import com.hotel.hotel_management.model.Counts;
import com.hotel.hotel_management.repo.CountsRepo;

@Service
public class CountsServiceImpl {
	
	@Autowired
	CountsRepo countsRepo;
	
	public Counts getImgCount(Integer recordId) {

		Long temp=(long) recordId;
		Optional<Counts> findById = countsRepo.findById(temp);
		Counts counts = findById.get();
		
		return counts;
	}
	
	public Counts saveImgCount(Counts counts) {

		Counts save = countsRepo.save(counts);
		return save;
	}

}
