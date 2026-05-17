package com.hotel.hotel_management.serviceImpl;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.CustomersDTO;
import com.hotel.hotel_management.dtos.RelatedCustomerDTO;
import com.hotel.hotel_management.dtos.ViewCustomerDTO;
import com.hotel.hotel_management.model.Customers;
import com.hotel.hotel_management.model.Review;
import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.repo.CustomersRepository;
import com.hotel.hotel_management.repo.RelatedCustomerRepository;
import com.hotel.hotel_management.repo.ReviewRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.BlobServiceAzure;
import com.hotel.hotel_management.service.CustomerService;
import com.hotel.hotel_management.utility.IdenetityType;


@Service
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	CustomersRepository customersRepository;
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	BlobServiceAzure storeImageAzure;
	
	@Autowired
	RelatedCustomerRepository relatedCustomerRepository;
	
	@Autowired
	ReviewRepository reviewRepository;
	

	SuccessResponse response = new SuccessResponse();

    @Transactional
	public SuccessResponse saveCustomer(CustomersDTO customers,List<MultipartFile> image_file,List<MultipartFile> related_file) {
      
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String formattedDateTime = now.format(formatter);
		
	
		if(customers.getCustomer_id() != null) {
			 Optional<Customers> customer = customersRepository.findById(customers.getCustomer_id());
			 
			 if(customer.isPresent()) {
				 Customers customers2 = customer.get();
				 customers2.setModification_time(formattedDateTime);
				 if(customers.getAddresses() != null) {
                     customers2.getAddresses().addAll(customers.getAddresses());
				 }
				 
				 if(customers.getVehicles() != null) {
                     customers2.getVehicles().addAll(customers.getVehicles());
				 }

				 
                 if(customers.getCustomer_name() != null) {
                	 customers2.setCustomer_name(customers.getCustomer_name());
                 }  				  				 
				
                 if(customers.getCustomer_mobile() != null) {
                	 customers2.setCustomer_mobile(customers.getCustomer_mobile());
                 }  	
                 
                 if(customers.getIdentity_type() != null) {
                	 customers2.setIdentity_type(customers.getIdentity_type());
                 }  	
                  
                 customersRepository.save(customers2);

        		CustomersDTO map2 = modelMapper.map(customers2,CustomersDTO.class);
        		response.updateResponse(map2);
        	     return response;
			 }		
		}
	 	  
		
		Optional<Customers> byMobile = customersRepository.findByMobile(customers.getCustomer_mobile());
		if (byMobile.isPresent()) {
			response.moibleAlreadyExist();
			return response;
		}	

		customers.setCustomer_no(generateCustomerId());
		Customers map = modelMapper.map(customers, Customers.class);
		Customers save = customersRepository.save(map);
		customersRepository.save(save);

//		List<StoredImages> images = new ArrayList<>();
//
//		if(image_file != null)
//		{
//			for (MultipartFile file : image_file) {
//				StoredImages storeFile = null;
//				try {
//					storeFile = storeImageAzure.storeFile(file.getOriginalFilename(),
//							file.getInputStream(), file.getSize(), 1);
//					
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//				storeFile.setCustomer_id(save.getCustomer_id());
//				images.add(storeFile);
//			}
//		}
//		
//		save.setImages(images);
//		save = customersRepository.save(save);
		
		
		if (image_file != null) {
			
			Long customerId = save.getCustomer_id();
		    List<StoredImages> images = image_file.stream()
		        .map(file -> {
		            try {
		                StoredImages storeFile = storeImageAzure.storeFile(
		                    file.getOriginalFilename(),
		                    file.getInputStream(),
		                    file.getSize(),
		                    1
		                );
		                storeFile.setCustomer_id(customerId);
		                return storeFile;
		            } catch (IOException e) {
		                e.printStackTrace();
		                return null; // Handle or log the exception as needed
		            }
		        })
		        .filter(Objects::nonNull) // Filter out any null values resulting from exceptions
		        .collect(Collectors.toList());

		    save.setImages(images);
		    save = customersRepository.save(save);
		}
		CustomersDTO map2 = modelMapper.map(map,CustomersDTO.class);
		response.saveResponse(map2);
	    return response;
	}
    
    public String generateCustomerId() {
		LocalDate currentDate = LocalDate.now();
		int year = currentDate.getYear() % 100;
		int month = currentDate.getMonthValue();

		Optional<Customers> topByOrderByBookingIdDesc = customersRepository.findTopByOrderByBookingIdDesc();
		String lastBookingId;
		if (topByOrderByBookingIdDesc.isPresent() && topByOrderByBookingIdDesc != null) {
			lastBookingId = topByOrderByBookingIdDesc.get().getCustomer_no();
		} else {
			lastBookingId = "CUS" + String.format("%02d%02d", year, month) + "000000";
		}

		String numericPart = lastBookingId.substring(8);
		int numericValue = Integer.parseInt(numericPart) + 1;
		String newNumericPart = String.format("%06d", numericValue);
		return "CUS" + String.format("%02d%02d", year, month) + newNumericPart;
	}
    
    public  List<RelatedCustomerDTO> getRelatedCustomers(Long customerId) {

    	 List<Object[]> results = customersRepository.findRelatedCustomersByCustomerId(customerId);
    	 
         // Use a Map to group images by RelatedCustomer
         Map<Long, RelatedCustomerDTO> customerMap = new HashMap<>();
         IdenetityType identityType = null;
         for (Object[] result : results) {
             Long relatedCustomerId = ((Number) result[0]).longValue();
             String name = (String) result[1];
             Byte byteValue = (Byte) result[2];
             if(byteValue != null) {
               int ordinal = byteValue.intValue();
                identityType = IdenetityType.values()[ordinal];
//             Long id = ((Number) result[3]).longValue();
             }
             Long id = result[3] != null ? ((Number) result[3]).longValue() : 0L;

             
             String imgLink = (String) result[4];
             String imageName = (String) result[5];


             RelatedCustomerDTO customerDTO = customerMap.get(relatedCustomerId);

             if (customerDTO == null) {
                 customerDTO = new RelatedCustomerDTO();
                 customerDTO.setRelated_customer_id(relatedCustomerId);
                 customerDTO.setName(name);
                 customerDTO.setIdenetityType(identityType);
                 customerDTO.setImages(new ArrayList<>());
                 customerMap.put(relatedCustomerId, customerDTO);
             }

             if (imgLink != null && imageName != null) {
            	 StoredImages imageDTO = new StoredImages();
                 imageDTO.setId(id);
                 imageDTO.setImg_link(imgLink);
                 imageDTO.setImage_name(imageName);
                 imageDTO.setCustomer_id(customerId);
                 imageDTO.setRel_customer_id(customerId);
                 customerDTO.getImages().add(imageDTO);
             }
         }

         return new ArrayList<>(customerMap.values());
    }


	@Override
	public SuccessResponse getCustomerById(Long id) {
		
		if(id!=null) {
			Optional<Customers> byId = customersRepository.findById(id);
			if(byId.isPresent()) {
				Customers customers = byId.get();
				ViewCustomerDTO viewCustomerDTO = new ViewCustomerDTO();
				viewCustomerDTO.setCustomers(customers);
			    viewCustomerDTO.setRelatedCustomerDTOs(getRelatedCustomers(id));
				response.getCustomerByIdResponse(viewCustomerDTO);
				return response;
				
			}
		}
		response.customerNotFoundResponse();
		return response;
	}

	@Override
	public SuccessResponse getCustomerByIdIfCheckIn(Long id) {
		if(id!=null) {
			Optional<Customers> byId = customersRepository.findByIdIfCheckIn(id);
			if(byId.isPresent()) {
				Customers customers = byId.get();
				response.getCustomerByIdResponse(customers);
				return response;
			}
		}
		response.customerNotFoundResponse();
		return response;
	}
	
	@Override
	public SuccessResponse getCustomerByMobile(String mobile) {
		if(mobile!=null) {
			List<Customers> byId = customersRepository.findCustomerByMobile(mobile);
			if(!byId.isEmpty()) {
				response.getCustomerByIdResponse(byId);
				return response;
			}
		}
		response.customerNotFoundResponse();
		return response;
	}
	
	@Override
	public SuccessResponse getCustomerByIdNumber(String id_number) {
		if(id_number!=null) {
			List<Customers> byId = customersRepository.findCustomerByIdNumber(id_number);
			if(!byId.isEmpty()) {
				response.getCustomerByIdResponse(byId);
				return response;
			}
		}
		response.customerNotFoundResponse();
		return response;
	}

	@Override
	public SuccessResponse getAllCustomer(int page, int size) {
		// TODO Auto-generated method stub
		Pageable pageable = PageRequest.of(page, size);
       
			Page<Customers> all = customersRepository.findAllCustomers(pageable);
			if (!all.isEmpty()) {
				response.getCustomerResponse(all);
				return response;
			} else
			response.customerNotFoundResponse();
			return response;	
	}
	
	public SuccessResponse getCustomerByName(String customerName) {
		if(customerName!=null) {
			List<Customers> byId = customersRepository.findCustomerByIdName(customerName);
			if(!byId.isEmpty()) {
				response.getCustomerByIdResponse(byId);
				return response;
			}
		}
		response.customerNotFoundResponse();
		return response;
	}

	@Override
	public SuccessResponse saveCustomerReview(Long customerId, Review review) {
		// TODO Auto-generated method stub
	   LocalDateTime now = LocalDateTime.now();
	   DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	   String formattedDateTime = now.format(formatter);
	   Optional<Customers> customerData = customersRepository.findById(customerId);
		
	   Customers customers = customerData.get();	
	   review.setCreation_date(formattedDateTime);
	   customers.getReviews().add(review);	
       review.setCustomer_name(customers.getCustomer_name());
	   Customers saveCustomers = customersRepository.save(customers);
	   int size = saveCustomers.getReviews().size();
	   response.saveReview(saveCustomers.getReviews().get(size-1));
	   return response;   
		
	}
	
	public SuccessResponse getAllCustomerReview() {
		List<Review> reviewAll = reviewRepository.findAll();
//		if(customerData != null)
//		{
		   response.getAllReview(reviewAll);  
//		}
//		response.customerNotFoundResponse();
		return response;   
		
	}
	

}
