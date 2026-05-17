package com.hotel.hotel_management.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.RoomDTO;
import com.hotel.hotel_management.model.Notification;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.utility.RoomStatus;


@Service
public interface RoomService {
	public SuccessResponse saveOrUpdateRoom(RoomDTO roomDto,List<MultipartFile> image_file);
	
	public SuccessResponse getRoomById(Long id);
	
	public SuccessResponse getAllRoom();
	
	public SuccessResponse deleteRoomById(Long id);
	
	public SuccessResponse getRoomByRoomStatus(RoomStatus roomStatus);
	
	public SuccessResponse getRoomByCategoryId(Long categoryId);
	
	public SuccessResponse deleteImageById(Long imageId);
	
	public SuccessResponse getAllNotication();

	public SuccessResponse updateNotification(Notification notification);
	
	public SuccessResponse saveRoomImages(Long roomId,List<MultipartFile> image_file);

}
