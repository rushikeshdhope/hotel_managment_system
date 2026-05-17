package com.hotel.hotel_management.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.model.User;


@Repository
public interface UserRepository  extends JpaRepository<User,Long>{
	
	@Query(value="select * from users where user_name = ?",nativeQuery=true)
	public Optional<User> findByUserName(String userName);
	
	
	@Query(value="select * from users where email = ? limit 1",nativeQuery=true)
	public Optional<User> findByEmail(String email);
	

}
