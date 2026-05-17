package com.hotel.hotel_management.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.model.PaymentImage;

@Repository
public interface PaymentImageRepository extends JpaRepository<PaymentImage,Long> {

	@Query(value = "SELECT * FROM payment_image WHERE order_id = :orderId",nativeQuery = true)
	public List<PaymentImage> getAllPaymentImageByOrderId(@Param("orderId") Long orderId);
}
