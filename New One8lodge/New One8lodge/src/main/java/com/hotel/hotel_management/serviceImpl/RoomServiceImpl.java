package com.hotel.hotel_management.serviceImpl;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.RoomDTO;
import com.hotel.hotel_management.model.Notification;
import com.hotel.hotel_management.model.Room;
import com.hotel.hotel_management.model.RoomCategory;
import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.repo.NotificationRepository;
import com.hotel.hotel_management.repo.RoomCategoryRepository;
import com.hotel.hotel_management.repo.RoomRepository;
import com.hotel.hotel_management.repo.StoredImagesRepo;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.BlobServiceAzure;
import com.hotel.hotel_management.service.RoomService;
import com.hotel.hotel_management.utility.RoomStatus;

@Component
public class RoomServiceImpl implements RoomService {

	@Autowired
	RoomRepository roomRepository;
	
	@Autowired
    ModelMapper mapper;
	
	@Autowired
	BlobServiceAzure storeImageAzure;
	
	@Autowired
	RoomCategoryRepository categoryRepository;
	
	@Autowired
	StoredImagesRepo imagesRepo;
	
	SuccessResponse response = new SuccessResponse();
	
	@Autowired
	NotificationRepository notificationRepository;
	
	Notification notification = new Notification();
	
	public SuccessResponse saveOrUpdateRoom(RoomDTO roomDto,List<MultipartFile> image_file) {
		// TODO Auto-generated method stub
		LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String formattedDateTime = dateTime.format(formatter);
			if (roomDto.getRoom_id() != null) {
				Optional<Room> byId = roomRepository.findById(roomDto.getRoom_id());
				if (byId.isPresent()) {
					Room room = byId.get();
					room.setModification_time(formattedDateTime);	
					
					if(roomDto.getRoomStatus() != null) {
						room.setRoomStatus(roomDto.getRoomStatus());
					}
					
					if(roomDto.getDescription() != null) {
						room.setDescription(roomDto.getDescription());
					}
					
					
					if(roomDto.getAcPrice() != null)
					{
						room.setAcPrice(roomDto.getAcPrice());
					}
					
					if(roomDto.getNonacPrice() != null)
					{
					   room.setNonacPrice(roomDto.getNonacPrice());
					}
					  
					
					
					  roomRepository.save(room);
					RoomDTO roomDTO = mapper.map(room, RoomDTO.class);
					response.updateRoomResponse(roomDTO);
					return response;
				}
				response.roomNotFoundResponse();
				return response;	
			}
			
			Optional<RoomCategory> roomCategory = null;
			
			if(roomDto.getRoom_category_id() != null)
			{
			   roomCategory = categoryRepository.findById(roomDto.getRoom_category_id());

			}
			
			if( roomCategory == null ) {
				response.categoryNotFoundResponse();
				return response;
			}

			int roomNumber = roomRepository.findByRoomNumber(roomDto.getRoom_number());
			
			if (roomNumber==1) {
				response.roomAlreadyExist();
				return response;
			}
		

		roomDto.setCreation_time(formattedDateTime);
		
		Room room1 = mapper.map(roomDto, Room.class);
		Room room2 = roomRepository.save(room1);
		

		
		if(image_file != null && !image_file.isEmpty()) {
			List<StoredImages> images = new ArrayList<>();
			for (MultipartFile file : image_file) {
				StoredImages storeFile = null;
				try {
					storeFile = storeImageAzure.storeFile(file.getOriginalFilename(),
							file.getInputStream(), file.getSize(), 3);
				} catch (IOException e) {
					e.printStackTrace();
				}
				storeFile.setRoom_id(room2.getRoom_id());
				images.add(storeFile);
			}
			room2.setImages(images);
		}
		
		roomRepository.save(room2);
		
		RoomDTO roomDto1 = mapper.map(room2, RoomDTO.class);
		response.saveRoomResponse(roomDto1);
		return response;
	}


	public SuccessResponse saveRoomImages(Long roomId,List<MultipartFile> image_file) {
		if(roomId != null)
		{
			 Room room = roomRepository.findById(roomId).get();
			 if(room != null)
			 {
				List<StoredImages> images = new ArrayList<>();
				for (MultipartFile file : image_file) {
					StoredImages storeFile = null;
					try {
						storeFile = storeImageAzure.storeFile(file.getOriginalFilename(),
								file.getInputStream(), file.getSize(), 3);
					} catch (IOException e) {
						e.printStackTrace();
					}
					storeFile.setRoom_id(roomId);
					images.add(storeFile);
				}
				room.setImages(images);
				roomRepository.save(room);
				
				response.saveRoomResponse(room);
				return response;
			 }
			 response.roomNotFoundResponse();
			 return response;
		}
		response.nullResponse();
		return response;
		

	}

	
	@Override
	public SuccessResponse getRoomById(Long id) {
		// TODO Auto-generated method stub
		if (id != null) {
			Optional<Room> byId = roomRepository.findById(id);
			if (byId.isPresent()) {
				Room room = byId.get();
				response.getRoomResponse(room);
				return response;
			}
		}
		response.roomNotFoundResponse();
		return response;
		
	}

	@Override
	public SuccessResponse getAllRoom() {
		// TODO Auto-generated method stub
		List<Room> all = roomRepository.findAll();
		if (!all.isEmpty()) {
			response.getRoomResponse(all);
			return response;
		} else
			response.roomNotFoundResponse();
		return response;	
		
	}

	@Override
	public SuccessResponse deleteRoomById(Long id) {
		// TODO Auto-generated method stub
		if (id != null) {
			Optional<Room> byId = roomRepository.findById(id);
			if (byId.isPresent()) {
				roomRepository.deleteById(id);
				response.delteRoomById(byId);
				return response;
			}
		}
		response.roomNotFoundResponse();
		return response;	
		
	}

	@Override
	public SuccessResponse getRoomByRoomStatus(RoomStatus roomStatus) {
		List<Room> all = roomRepository.findRoomByStatus(roomStatus);
		if (!all.isEmpty()) {
			response.getRoomResponse(all);
			return response;
		} else
			response.roomNotFoundResponse();
		return response;	
	}
	
	public SuccessResponse getRoomByCategoryId(Long categoryId) {
		// TODO Auto-generated method stub
		if (categoryId != null) {
			List<Room> byId = roomRepository.findRoomByCategoryId(categoryId);
			if (!byId.isEmpty()) {
				response.getRoomResponse(byId);
				return response;
			}
		}
		response.roomNotFoundResponse();
		return response;
	}


	@Override
	public SuccessResponse deleteImageById(Long roomId) {
		roomRepository.deleteByImagesIds(roomId);
        imagesRepo.deleteStoredImagesByRoom(roomId);
        response.deleteRoomImage();
        return response;
	}


	@Override
	public SuccessResponse getAllNotication() {
		// TODO Auto-generated method stub
		List<Notification> all = notificationRepository.getAllNotifications();
		if (!all.isEmpty()) {
			response.getNotificationResponse(all);
			return response;
		}
		response.notificationNotFoundResponse();
		return response;	
	}


	@Override
	public SuccessResponse updateNotification(Notification notification) {
		// TODO Auto-generated method stub
		LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		String formattedDateTime = dateTime.format(formatter);

		if (notification.getNotification_id() != null) {

			Optional<Notification> notification1 = notificationRepository.findById(notification.getNotification_id());
			
			if (notification1.isPresent()) {
				Notification notification2 = notification1.get();
				notification2.setIs_view(notification.isIs_view());
				notification2.setRoomStatus(RoomStatus.AVAILABLE);
				notification2.setSeentime(formattedDateTime);
				notificationRepository.save(notification2);
				response.getRoomResponse(notification2);
				return response;
			}
			
			
			return response;
		}
		response.notificationNotFoundResponse();
		return response;	
	}
}