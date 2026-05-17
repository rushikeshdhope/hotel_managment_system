package com.hotel.hotel_management.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.hotel_management.model.Room;
import com.hotel.hotel_management.utility.RoomStatus;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{
	@Query(value="select Count(*) from room where room_number = ?",nativeQuery = true)
	public int findByRoomNumber(Long room_number); 

	@Query(value="select * from room where room_status = ?",nativeQuery = true)
	public List<Room> findRoomByStatus(RoomStatus id); 
	
	@Query(value="select * from room where room_category_id = ?",nativeQuery = true)
	public List<Room> findRoomByCategoryId(Long categoryId);

//	@Modifying
//	@Transactional
//    @Query(value="delete from room_images where images_id = ?",nativeQuery = true)
//    public void deleteByImageId(Long id);
	
	 @Modifying
	 @Transactional
	 @Query(value = "DELETE FROM room_images WHERE room_room_id = ?", nativeQuery = true)
	 void deleteByImagesIds(Long roomId);
	
	@Query(value = "SELECT COUNT(*) AS count FROM room WHERE room_category_id = ?",nativeQuery = true)
	public int isPresentRoomCategoryInRoom(Long roomCategoryId);
	
	@Query(value="select room_number from room ",nativeQuery = true)
	public List<Long> getAllRooms();
	
	@Modifying
	@Transactional
    @Query(value="update room set room_status = 2 where room_number = ?",nativeQuery = true)
    public void changeStatus(Long roomNumber);
	
	

	
	

	
	
	
}
