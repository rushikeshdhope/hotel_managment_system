package com.hotel.hotel_management.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.model.RoomCategory;

@Repository
public interface RoomCategoryRepository extends JpaRepository<RoomCategory, Long> {
	
	@Query(value = "SELECT r.* FROM room_category r where r.room_category_name = ?", nativeQuery = true)
	public Optional<RoomCategory> findByCategoryName(String name);
}
