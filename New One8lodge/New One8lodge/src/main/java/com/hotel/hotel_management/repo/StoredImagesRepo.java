package com.hotel.hotel_management.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.hotel_management.model.StoredImages;
@Repository
public interface StoredImagesRepo extends JpaRepository<StoredImages, Long> {
	 
	 @Modifying
	 @Transactional
	 @Query(value = "DELETE FROM stored_images WHERE room_id = ?", nativeQuery = true)
	 void deleteStoredImagesByRoom(Long roomId);
	
}
