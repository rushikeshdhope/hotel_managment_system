package com.hotel.hotel_management.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.model.CustomerLoyality;

@Repository
public interface CustomerLoyalityRepository extends JpaRepository<CustomerLoyality, Long> {

	@Query(value = "select * from customer_loyality where customer_id = ? ",nativeQuery = true)
	public Optional<CustomerLoyality>  getDetailUsingCustomerId(Long custId);
	
}
