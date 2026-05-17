package com.hotel.hotel_management.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>{
	
	@Query(value="SELECT * FROM notification WHERE is_view = false AND from_status = 1 ORDER BY notification_id DESC;",nativeQuery = true)
	public List<Notification> getAllNotifications();
	
	@Query(value="SELECT * FROM notification WHERE is_view = false AND customer_id = :customerId  AND from_status = 0 ORDER BY notification_id DESC;",nativeQuery = true)
	public List<Notification> getNotificationsByCustomerId(@Param("customerId") Long customerId );
}
