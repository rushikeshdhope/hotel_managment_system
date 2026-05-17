package com.hotel.hotel_management.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.hotel_management.model.Counts;

@Repository
public interface CountsRepo extends JpaRepository<Counts, Long>{

}
