package com.hotel.hotel_management.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.RoomDTO;
import com.hotel.hotel_management.model.Notification;
import com.hotel.hotel_management.repo.NotificationRepository;
import com.hotel.hotel_management.repo.RoomRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.RoomService;
import com.hotel.hotel_management.utility.RoomStatus;

import jakarta.validation.Valid;

@RestController
@RequestMapping("hotel_booking/v1/admin/room")
@Validated
@CrossOrigin
public class RoomController {
	
	@Autowired
    RoomService roomService;

	@Autowired
	NotificationRepository notificationRepository; 
	
	@Autowired
	RoomRepository roomRepository;
	
	@PostMapping("/saveOrupdateRoom")
	public SuccessResponse saveOrUpdateRoom(
			@RequestParam(value = "files", required = false) ArrayList<MultipartFile> image_file,
			@Valid @ModelAttribute RoomDTO roomDto) {
        return roomService.saveOrUpdateRoom(roomDto,image_file);
	}
	
	@PostMapping("/saveRoomImages")
	public SuccessResponse saveRoomImages(
			@RequestParam(value = "files", required = false) ArrayList<MultipartFile> image_file,
			@RequestParam Long roomId) {
        return roomService.saveRoomImages(roomId,image_file);
	}
	
	@GetMapping("getRoomById/{id}")
	public SuccessResponse getRoomById(@PathVariable Long id) {
		return roomService.getRoomById(id);
	}

	@GetMapping("getAllRoom")
	public SuccessResponse getAllRoom() {
		return roomService.getAllRoom();
	}
	
	@DeleteMapping("deleteRoomById/{id}")
	public SuccessResponse deleteRoomById(@PathVariable Long id) {
		return roomService.deleteRoomById(id);
	}

	@GetMapping("getRoomByRoomStatus/{roomStatus}")
	public SuccessResponse getRoomByRoomStatus(@PathVariable RoomStatus roomStatus) {
	    return roomService.getRoomByRoomStatus(roomStatus);
	}
	
	@GetMapping("getRoomByCategoryId/{categoryId}")
	public SuccessResponse getRoomByCategoryId(@PathVariable Long categoryId) {
       return roomService.getRoomByCategoryId(categoryId);
	}

	@DeleteMapping("deleteRoomImageByRoomId/{id}")
	public SuccessResponse deleteImageById(@PathVariable Long id) {
      return roomService.deleteImageById(id);
	}
	
	@GetMapping("getAllNotication")
	public SuccessResponse getAllNotication() {
       return roomService.getAllNotication();
	}

	@PostMapping("updateNotification")
	public SuccessResponse updateNotification(@RequestBody Notification notification) {
       return roomService.updateNotification(notification);
	}

	

	@GetMapping("getAllNoticationByCustomerId")
	public SuccessResponse getAllNotication( @RequestParam("customerId") Long customerId) {

		SuccessResponse response = new SuccessResponse();
		List<Notification> notifications = notificationRepository.getNotificationsByCustomerId(customerId);
		
		if (notifications != null) {
				response.getNotificationResponse(notifications);
				return response;
		}
		response.notificationNotFoundResponse();
		return response;


	}
	
	
	@GetMapping("getAllRoomNumber")
	public SuccessResponse getAllRoomNumber() {
		SuccessResponse response = new SuccessResponse();
		List<Long> roomNos = roomRepository.getAllRooms();
		
		if (roomNos != null) {
				response.getRoomResponse(roomNos);;
				return response;
		}
		response.roomNotFoundResponse();
		return response;


	}
	
	

	
}
