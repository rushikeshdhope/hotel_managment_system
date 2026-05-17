package com.hotel.hotel_management.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.dtos.RelatedCustomerDTO;
import com.hotel.hotel_management.model.Customers;

@Repository
public interface CustomersRepository extends JpaRepository<Customers, Long> {
	
	@Query(value = "select * from customers where customer_email=?", nativeQuery = true)
	public Optional<Customers> findByEmail(String email);
	
	@Query(value = "select * from customers where customer_mobile=?", nativeQuery = true)
	public Optional<Customers> findByMobile(String mobile);
	
	@Query(value = "SELECT * FROM customers where customer_id=? AND room_status= 'true' ", nativeQuery = true)
	public Optional<Customers> findByIdIfCheckIn(Long id);
	
	@Query(value = "SELECT * FROM customers where idenetity_number LIKE ?%", nativeQuery = true)
	public List<Customers> findCustomerByIdNumber(String id_number);
	
	@Query(value = "SELECT * FROM customers where customer_name LIKE ?%", nativeQuery = true)
	public List<Customers> findCustomerByIdName(String customerName);
	
	@Query(value = "select * from customers where customer_mobile LIKE ?%", nativeQuery = true)
	public List<Customers> findCustomerByMobile(String mobile);

	@Query(value = "SELECT * FROM customers c ORDER BY c.customer_no DESC LIMIT 1", nativeQuery = true)
	public Optional<Customers> findTopByOrderByBookingIdDesc();
	
	@Query(value = "SELECT COUNT(*) FROM customers WHERE customer_id != :customerId AND customer_mobile = :customerMobile", nativeQuery = true)
	public int countCustomers(@Param("customerId") Long customerId, @Param("customerMobile") String string);

	@Query(value = "SELECT * FROM customers ORDER BY customer_id DESC",nativeQuery = true)
	public Page<Customers> findAllCustomers(Pageable pageable);

	@Query(value = "select customer_id from customers where customer_mobile = ?", nativeQuery = true)
	public Long getCustomerIdByMobileNo(String orderId);	
	
	@Query(value = "select * from customers where customer_mobile = ?", nativeQuery = true)
	public Optional<Customers> getCustomerByMobileNo(String mobile);
	
	 @Query(value = "SELECT rc.related_customer_id, rc.name, rc.idenetity_type,si.id,si.img_link, si.image_name FROM orders o JOIN related_customer rc ON o.related_customer_id = rc.related_customer_id LEFT JOIN stored_images si ON rc.related_customer_id = si.rel_customer_id WHERE o.customers_id = :customerId", nativeQuery = true)
	    List<Object[]> findRelatedCustomersByCustomerId(@Param("customerId") Long customerId);

}
