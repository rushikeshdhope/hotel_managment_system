package com.hotel.hotel_management.serviceImpl;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.hotel_management.dtos.AmountDTO;
import com.hotel.hotel_management.dtos.CustomerOrderDTO;
import com.hotel.hotel_management.dtos.Customers1DTO;
import com.hotel.hotel_management.dtos.CustomersDTO;
import com.hotel.hotel_management.dtos.Order1DTO;
import com.hotel.hotel_management.dtos.OrderDTO;
import com.hotel.hotel_management.model.Customers;
import com.hotel.hotel_management.model.FoodDetail;
import com.hotel.hotel_management.model.Notification;
import com.hotel.hotel_management.model.Order;
import com.hotel.hotel_management.model.RelatedCustomer;
import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.repo.CustomersRepository;
import com.hotel.hotel_management.repo.FoodDetailRepository;
import com.hotel.hotel_management.repo.NotificationRepository;
import com.hotel.hotel_management.repo.OrderRepository;
import com.hotel.hotel_management.repo.PaymentRepository;
import com.hotel.hotel_management.repo.RelatedCustomerRepository;
import com.hotel.hotel_management.repo.RoomRepository;
import com.hotel.hotel_management.response.SuccessResponse;
import com.hotel.hotel_management.service.BlobServiceAzure;
import com.hotel.hotel_management.service.OrderService;
import com.hotel.hotel_management.utility.FromStatus;
import com.hotel.hotel_management.utility.OrderStatus;
import com.hotel.hotel_management.utility.PaymentType;
import com.hotel.hotel_management.utility.RoomStatus;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	ModelMapper mapper;
	
	@Autowired
	FoodDetailRepository detailRepository;
	
	@Autowired
	PaymentRepository paymentRepository;
	
	@Autowired
	NotificationRepository notificationRepository;
	
	@Autowired
	RelatedCustomerRepository relatedCustomerRepository;
	
	@Autowired
	RoomRepository roomRepository;
	
	@Autowired
	CustomersRepository customersRepository;
	
	@Autowired
	BlobServiceAzure storeImageAzure;
	

	 @PersistenceContext
	 private EntityManager entityManager;
	
	SuccessResponse response = new SuccessResponse();
	
	@Override
	public SuccessResponse getOrderById(Long id) {
		
		Optional<Order> order = orderRepository.findById(id);

		return order.map(o -> {
		    Optional<Customers> customers = customersRepository.findById(o.getCustomers_id());
		    
		    Customers1DTO customers1dto = customers.map(c -> mapper.map(c, Customers1DTO.class)).orElse(null);
		    CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
		    customerOrderDTO.setCustomers1Dto(customers1dto);
		    
		    Order1DTO order1dto = mapper.map(o, Order1DTO.class);
		    customerOrderDTO.setOrder1dto(order1dto);
		    
		    response.getOrderResponse(customerOrderDTO);
		    return response;
		}).orElseGet(() -> {
		    response.orderNotFoundResponse();
		    return response;
		});

		
//			Optional<Order> order = orderRepository.findById(id);
//			if (order != null) {
//			Optional<Customers> customers = customersRepository.findById(order.get().getCustomers_id());
//				Customers1DTO customers1dto = mapper.map(customers, Customers1DTO.class);
//				CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
//				customerOrderDTO.setCustomers1Dto(customers1dto);
//				Order1DTO order1dto = mapper.map(order, Order1DTO.class);
//				customerOrderDTO.setOrder1dto(order1dto);
//				response.getOrderResponse(customerOrderDTO);
//				return response;
//		}
//		response.orderNotFoundResponse();
//		return response;	
	}

	@Override
	public SuccessResponse getAllOrder(int page, int size) {
		
		List<CustomerOrderDTO> customerOrderDTOs = new ArrayList<>();        
		Pageable pageable = PageRequest.of(page, size);
		Page<Order> ordersPage = orderRepository.findAllOrders(pageable);

		if (!ordersPage.isEmpty()) {
		    customerOrderDTOs = ordersPage.getContent().stream()
		        .map(order -> {
		            Optional<Customers> customersOpt = customersRepository.findById(order.getCustomers_id());
		            Customers1DTO customers1dto = customersOpt.map(customers -> mapper.map(customers, Customers1DTO.class)).orElse(null);
		            
		            Order1DTO order1dto = mapper.map(order, Order1DTO.class);
		            
		            CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
		            customerOrderDTO.setCustomers1Dto(customers1dto);
		            customerOrderDTO.setOrder1dto(order1dto);
		            return customerOrderDTO;
		        })
		        .collect(Collectors.toList());

		    response.getOrderResponse(customerOrderDTOs);
		    return response;
		} else {
		    response.orderNotFoundResponse();
		    return response;
		}

//		
//		  List<CustomerOrderDTO> customerOrderDTOs = new ArrayList<>();        
//		  Pageable pageable = PageRequest.of(page, size);
//	      Page<Order> ordersPage = orderRepository.findAllOrders(pageable);
//			
//		  List<Order> orders = ordersPage.getContent();
//		   if (!ordersPage.isEmpty()) {
//			for(Order order:orders) {
//				Optional<Customers> customers = customersRepository.findById(order.getCustomers_id());
//				
//				Customers1DTO customers1dto = mapper.map(customers, Customers1DTO.class);
//				CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
//				customerOrderDTO.setCustomers1Dto(customers1dto);
//				
//				Order1DTO order1dto = mapper.map(order, Order1DTO.class);
//				customerOrderDTO.setOrder1dto(order1dto);
//				customerOrderDTOs.add(customerOrderDTO);
//			}					
//			response.getOrderResponse(customerOrderDTOs);
//			return response;
//			} else
//			response.orderNotFoundResponse();
//		return response;	
	}
	
	public SuccessResponse getAllOrderByCustomerMobileNo(@RequestParam(value = "parameter") String parameter) {
		List<CustomerOrderDTO> customerOrderDTOs = new ArrayList<>();          
		List<Order> allOrders = orderRepository.getAllByCustomerInfo(parameter);
			if (!allOrders.isEmpty()) {
			 customerOrderDTOs = allOrders.stream()
					    .map(order -> {
					        Optional<Customers> customers = customersRepository.findById(order.getCustomers_id());
					        Customers1DTO customers1dto = mapper.map(customers.orElse(null), Customers1DTO.class);	        
					        CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
					        customerOrderDTO.setCustomers1Dto(customers1dto);
					        Order1DTO order1dto = mapper.map(order, Order1DTO.class);
					        customerOrderDTO.setOrder1dto(order1dto);	        
					        return customerOrderDTO;
					    })
					    .collect(Collectors.toList());
				
				response.getOrderResponse(customerOrderDTOs);
				return response;
			} else {
			    response.orderNotFoundResponse();
			    return response;
			}
	}


	@Override
	public SuccessResponse deleteOrderById(Long id) {
		// TODO Auto-generated method stub
		if (id != null) {
			Optional<Order> byId = orderRepository.findById(id);
			if (byId.isPresent()) {
				orderRepository.deleteById(id);
				response.delteOrderById(byId);
				return response;
			}
		}
		response.orderNotFoundResponse();
		return response;	
	}	

	
	
	

	@Scheduled(fixedRate = 60000) //60000 for one minite
	public void roomAvailableNotification() {

		LocalDateTime currentDateTime = LocalDateTime.now();
		LocalDateTime newDateTime = currentDateTime.plusMinutes(15);
		DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");

		String formattedDate = currentDateTime.toLocalDate().format(dateFormatter);
		String formattedNewTime = newDateTime.toLocalTime().format(timeFormatter).toUpperCase();
			
	List<Long> roomList = orderRepository.getRoomIdForNotification(formattedNewTime, formattedDate);
		
	 String commaSeparatedRoomIds = roomList.stream()
             .map(String::valueOf)
             .collect(Collectors.joining(","));
	
	if (!roomList.isEmpty()) {
		Notification notification = new Notification();

		notification.setMessage("Room "+commaSeparatedRoomIds+": is Available in After 15 Minute");
		notification.setCreation_time(formattedDate+" "+formattedNewTime);
		notification.setFromStatus(FromStatus.MANAGER);
		notificationRepository.save(notification);
	}

  }
	

	@Transactional	
	public SuccessResponse saveAllOrder(CustomersDTO customersDTO, List<MultipartFile> image_file,List<MultipartFile> related_file, OrderDTO orderDto,MultipartFile payment_file) {
		
		
		
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String formattedDateTime = now.format(formatter);

		Customers saveCustomer = null;
		CustomerOrderDTO customerOrderDTO =new CustomerOrderDTO();
		
		Long customerId0 = null;
		
		
		if(customersDTO.getCustomer_id() == null) {
			
		
		   if(customersDTO.getCustomer_mobile() != null) {
			customerId0 = customersRepository.getCustomerIdByMobileNo(customersDTO.getCustomer_mobile());
		   }
		
		   if(orderDto.getOrder_id() != null)
		    {
			  customerId0 = orderRepository.getCustomerIdByOrder(orderDto.getOrder_id());
		    }
		}else {
			customerId0 = customersDTO.getCustomer_id();
		}  
	
			if(customerId0 != null) {
				
				 Optional<Customers> customer = customersRepository.findById(customerId0);
				 
				 if(customer.isPresent()) {
					 Customers customers2 = customer.get();
					 
					 if(customersDTO.getCustomer_name() != null) {
					   customers2.setCustomer_name(customersDTO.getCustomer_name());
					 }
					 
					 if(customersDTO.getCustomer_mobile() != null) {
					    
						  int countCustomers = customersRepository.countCustomers(customersDTO.getCustomer_id(),customersDTO.getCustomer_mobile());
						  
						  if(countCustomers ==1) {
							  response.moibleAlreadyExist();
								return response;
					      }
					 
				    	 customers2.setCustomer_mobile(customersDTO.getCustomer_mobile());
					 }
					 customers2.setModification_time(formattedDateTime);
					 if(customersDTO.getAddresses() != null) {
	                    customers2.getAddresses().addAll(customersDTO.getAddresses());
					 }
					 
					 if(customersDTO.getVehicles() != null) {
	                    customers2.getVehicles().addAll(customersDTO.getVehicles());
					 }
					
					 if(customersDTO.getIdentity_type() != null) {
						 customers2.setIdentity_type(customersDTO.getIdentity_type());
					 }
					 					 
				     saveCustomer = customersRepository.save(customers2);
				     
				     if (image_file != null) {
			    		 Long customerId1 = saveCustomer.getCustomer_id();

					     List<StoredImages> images = image_file.stream()
					        .map(file -> {
					            try {
					                StoredImages storeFile = storeImageAzure.storeFile(
					                    file.getOriginalFilename(),
					                    file.getInputStream(),
					                    file.getSize(),
					                    1
					                );
					                storeFile.setCustomer_id(customerId1);
					                return storeFile;
					            } catch (IOException e) {
					                e.printStackTrace();
					                return null;  // You can handle this differently if needed
					            }
					        })
					        .filter(Objects::nonNull)  // Filter out any nulls in case of an exception
					        .collect(Collectors.toList());
					    saveCustomer.setImages(images);
					    saveCustomer = customersRepository.save(saveCustomer);
					}

					Customers1DTO customers1dto = mapper.map(saveCustomer, Customers1DTO.class);
					customerOrderDTO.setCustomers1Dto(customers1dto); 
				 }		
			}
			
			
		
			
			if(saveCustomer == null)
			{
				Optional<Customers> byMobile = customersRepository.findByMobile(customersDTO.getCustomer_mobile());
				if (byMobile.isPresent()) {
					response.moibleAlreadyExist();
					return response;
				}
				
				customersDTO.setCreation_time(formattedDateTime);
			    String customerId = generateCustomerId();
		 		customersDTO.setCustomer_no(customerId);
				Customers map = mapper.map(customersDTO, Customers.class);
				
				saveCustomer = customersRepository.save(map);
			
				
				Long customerId1 = saveCustomer.getCustomer_id();
				
				if (image_file != null) {
				    List<StoredImages> images = image_file.stream()
				        .map(file -> {
				            try {
				                StoredImages storeFile = storeImageAzure.storeFile(
				                    file.getOriginalFilename(),
				                    file.getInputStream(),
				                    file.getSize(),
				                    1
				                );
				                storeFile.setCustomer_id(customerId1);
				                return storeFile;
				            } catch (IOException e) {
				                e.printStackTrace();
				                return null;  // You can handle this differently if needed
				            }
				        })
				        .filter(Objects::nonNull)  // Filter out any nulls in case of an exception
				        .collect(Collectors.toList());
				    saveCustomer.setImages(images);
				    saveCustomer = customersRepository.save(saveCustomer);
				}

				
				Customers1DTO customers1dto = mapper.map(saveCustomer, Customers1DTO.class);
				customerOrderDTO.setCustomers1Dto(customers1dto); 
			}
			
			 orderDto.setCustomers_id(saveCustomer.getCustomer_id());

			Long totalAmount = 0L;

			if (orderDto.getFoodDetails() != null) {
			    totalAmount = orderDto.getFoodDetails().stream()
			        .map(foodDetail -> {
			            Long price = detailRepository.findPriceByFoodId(foodDetail.getFood_id());
			            String foodName = detailRepository.findFoodNameByFoodId(foodDetail.getFood_id());
			            Long amount = price * foodDetail.getQuantity();
			            foodDetail.setAmount(amount);
			            foodDetail.setFood_name(foodName);
			            return foodDetail;
			        })
			        .peek(foodDetail -> detailRepository.save(foodDetail))
			        .mapToLong(FoodDetail::getAmount)
			        .sum();
			}

			
			Long paidAmount = 0L;
			
			if(orderDto.getPayments() != null) {
				if (orderDto.getPayments() != null) {
				    paidAmount = orderDto.getPayments().stream()
				        .peek(payment -> {
				            payment.setTransaction_date(formattedDateTime);
				            payment.setCustomer_id(orderDto.getCustomers_id());
				        })
				        .mapToLong(payment -> {
				            Long amount = payment.getAmount();
//				            paymentRepository.save(payment);  // Save the payment after setting the transaction date and customer ID
				            return amount;
				        })
				        .sum();
				}
			}
			
			Order saveOrder = null;

			
			if(orderDto.getOrder_id() != null) {
	            Optional<Order> orderOptional = orderRepository.findById(orderDto.getOrder_id());
	            
	            if(orderOptional.get().getOrderStatus() != OrderStatus.COMPLETE)
	            {
		             if (orderOptional.isPresent()) {
		                Order order = orderOptional.get();
		                
		            	totalAmount += order.getTotalAmount();
		        		paidAmount += order.getPaid_amount();
		        		
						if(totalAmount<paidAmount) {
			    			
		        			response.paidPaymentHigh();
		        			return response;
        		         }
		                
//						for(FoodDetail foodDetail : order.getFoodDetails()) {
//		                    totalAmount += foodDetail.getAmount();        			
//		        		}
		                
		        		if(orderDto.getFoodDetails() != null) { 
		                   order.getFoodDetails().addAll(orderDto.getFoodDetails());
		        		}
		        		
//		        		for(Payment payment : order.getPayments()) {
//		        			paidAmount += payment.getAmount();        			
//		        		}
		        		
		        		if(orderDto.getPayments() != null) {
		                  order.getPayments().addAll(orderDto.getPayments());
		        		}
		        		
//		        		if(order .getRoomDetails() != null) {
//		        		  totalAmount +=order.getRoomDetails().getAmount();
//		        		} 
		        		
		        		if(orderDto.getOuttime() != null) {
		        			order.setOuttime(orderDto.getOuttime());
		        		}

		        		
		        		
		        	
		        		 
		        		Long remainAmount = totalAmount - paidAmount;
		        		
		        		if(orderDto.getExtra_amount() != null && orderDto.getExtra_amount() != 0) {
		        			order.setExtra_amount(orderDto.getExtra_amount());
		        			totalAmount+= orderDto.getExtra_amount();
			        		  remainAmount += orderDto.getExtra_amount();
		        		}
		        		
		        		if(orderDto.getAdvance_amount() != null && orderDto.getAdvance_amount() != 0) {
		        			order.setAdvance_amount(orderDto.getAdvance_amount());
		        			totalAmount = totalAmount - orderDto.getAdvance_amount();
		        			remainAmount = remainAmount - orderDto.getAdvance_amount();
		        			}
		        		
		        		
		        		if(orderDto.getOrderStatus() != OrderStatus.PENDING) {
	                      
		        			if(orderDto.getOrderStatus() == OrderStatus.COMPLETE) {
		        				    
	        				   if(remainAmount != 0) {
     		        			 response.paidAllAmount();
     		        			 return response;
     		        	       }	
	        				   
	        				   if(order.getRoomDetails() != null) {
	        				     roomRepository.changeStatus(order.getRoomDetails().getRoom_number());
	        				   }
	        				   
	        				   
	        				   if(order.getOuttime() == null || order.getOuttime().isEmpty()) {
	        			        String timeString = formattedDateTime.split(" ")[1];
	        			        LocalTime time = LocalTime.parse(timeString, DateTimeFormatter.ofPattern("HH:mm:ss"));
	        			        String newTime = time.format(DateTimeFormatter.ofPattern("hh:mm a")).toUpperCase();
	        			     
	        				    order.setOuttime(newTime);
	        				   }
		    		         	  		        				
		        			}	
		        			
		        			order.setOrderStatus(orderDto.getOrderStatus());

		        		}
	        					        		
		        			        		  
		        		order.setRemaining_amount(remainAmount);
		         		order.setPaid_amount(paidAmount);
		         		order.setTotalAmount(totalAmount);
		        		order.setExtendTime(orderDto.getExtendTime());
		        		order.setModifiedTime(formattedDateTime);
		        		

		        		
		        		if(orderDto.getRelatedCustomer() != null)
		        		{
		        			order.setRelatedCustomer(orderDto.getRelatedCustomer());
		        		}
   		
			    		

			    		saveOrder = orderRepository.save(order);	

			    		if(saveOrder.getOrderStatus() == OrderStatus.ACCEPT) {
	        		    if(order.getRoomDetails() != null) {
	        			 Notification notification = new Notification();
       					 notification.setMessage("Confirm Your "+saveOrder.getOrder_no()+" for Room :"+Long.toString(saveOrder.getRoomDetails().getRoom_number()));
        				 notification.setCustomer_id(saveCustomer.getCustomer_id());
        				 notification.setRoomStatus(RoomStatus.ENGAGE);
        				 notification.setFromStatus(FromStatus.USER);
						 notification.setCreation_time(formattedDateTime);
						 notificationRepository.save(notification);
		        	    }		
	    			        orderRepository.updateRoomStatusUsingRoomNo(RoomStatus.ENGAGE, saveOrder.getRoomDetails().getRoom_number());
	        	     }
			    		saveOrder = orderRepository.save(order);    		
			    		try {
			     		    Optional.ofNullable(orderDto.getPayments())
			     		        .flatMap(payments -> payments.stream().findFirst())
			     		        .ifPresent(payment1 -> {
			     		            Optional.ofNullable(payment_file).ifPresent(file -> {
			     		                try {
			     		                    StoredImages storeFile1 = storeImageAzure.storeFile(
			     		                        file.getOriginalFilename(),
			     		                        file.getInputStream(),
			     		                        file.getSize(),
			     		                        6
			     		                    );
			     		                    payment1.setImage_link(storeFile1.getImg_link());
			     		                    payment1.setCustomer_id(orderDto.getCustomers_id());
			     		                    payment1.setTransaction_date(formattedDateTime);
//			     		                    paymentRepository.save(payment1);
			     		                } catch (IOException e) {
			     		                    e.printStackTrace();
			     		                    response.ExceptionForImg(response);
			     		                }
			     		            });
			     		        });
			     		} catch (Exception e) {
			     		    e.printStackTrace();
			     		    response.ExceptionForImg(response);
			     		    return response;
			     		}
			    				    		
			 			List<StoredImages> images1 = new ArrayList<>();

			    		 
			    		if (related_file != null) {
							 
							 Long relCustomerId = saveOrder.getRelatedCustomer().getRelated_customer_id();
							     images1 = related_file.stream()
							        .map(file -> {
							            try {
							                StoredImages storeFile = storeImageAzure.storeFile(
							                    file.getOriginalFilename(),
							                    file.getInputStream(),
							                    file.getSize(),
							                    5
							                );
							                storeFile.setRel_customer_id(relCustomerId);
							                return storeFile;
							            } catch (IOException e) {
							                e.printStackTrace();
							                return null;  // Handle or log the exception as needed
							            }
							        })
							        .filter(Objects::nonNull)  // Filter out any nulls resulting from exceptions
							        .collect(Collectors.toList());
							     
							     saveOrder.getRelatedCustomer().setIdtyImages(images1);
							     saveOrder = orderRepository.save(saveOrder);
							}
			   
			    		Order1DTO order1dto = mapper.map(saveOrder, Order1DTO.class);
			     		customerOrderDTO.setOrder1dto(order1dto);
			     		response.updateOrderResponse(customerOrderDTO);
						return response;
		             }	
	            }else {
	                	response.orderNotUpdate();
		         		return response;
	            }  
	        }
			
			totalAmount +=orderDto.getRoomDetails().getAmount();
			Long remainAmount = totalAmount - paidAmount;

    		if(orderDto.getExtra_amount() != null && orderDto.getExtra_amount() != 0) {
				totalAmount+=orderDto.getExtra_amount();
				remainAmount+=orderDto.getExtra_amount();

			}
			
    		if(orderDto.getAdvance_amount() != null && orderDto.getAdvance_amount() != 0) {
			totalAmount = totalAmount - orderDto.getAdvance_amount();
			remainAmount = remainAmount - orderDto.getAdvance_amount();
			}
    		
    		if(totalAmount < paidAmount) {
				response.paidPaymentHigh();
				return response;
			}
			
	 		orderDto.setRemaining_amount(remainAmount);
	 		orderDto.setPaid_amount(paidAmount);
	 		orderDto.setTotalAmount(totalAmount);	 
	 		
	 		int noOfCount = 1;
	 		
	 		if(orderDto.getRelatedCustomer() != null) {
	 			noOfCount +=1;
	 		}
	 		
	 		orderDto.setNoOfCount(noOfCount);
	 		Notification notification = new Notification();

	 		if(orderDto.getOrderStatus() == OrderStatus.PENDING) {
	 			notification.setMessage(saveCustomer.getCustomer_no()+ ": "+saveCustomer.getCustomer_name()+" is Request to Room :"+Long.toString(orderDto.getRoomDetails().getRoom_number()));
	 			notification.setRoomStatus(RoomStatus.REQUEST);
	 			notification.setFromStatus(FromStatus.MANAGER);
	 			notification.setCreation_time(formattedDateTime);
	 			notificationRepository.save(notification);
	 		}
	 		
	 		
	 		
	       String bookingId = generateBookingId();
	       orderDto.setCreationTime(formattedDateTime);
	       orderDto.setModifiedTime(formattedDateTime);
		   orderDto.setOrder_no(bookingId);

		   Order order = mapper.map(orderDto, Order.class);
		   saveOrder= orderRepository.save(order);
		    
		    try {
	 		    Optional.ofNullable(orderDto.getPayments())
	 		        .flatMap(payments -> payments.stream().findFirst())
	 		        .ifPresent(payment1 -> {
	 		            Optional.ofNullable(payment_file).ifPresent(file -> {
	 		                try {
	 		                    StoredImages storeFile1 = storeImageAzure.storeFile(
	 		                        file.getOriginalFilename(),
	 		                        file.getInputStream(),
	 		                        file.getSize(),
	 		                        6
	 		                    );
	 		                    payment1.setImage_link(storeFile1.getImg_link());
	 		                    payment1.setCustomer_id(orderDto.getCustomers_id());
	 		                    payment1.setTransaction_date(formattedDateTime);
//	 		                    paymentRepository.save(payment1);
	 		                } catch (IOException e) {
	 		                    e.printStackTrace();
	 		                    response.ExceptionForImg(response);
	 		                }
	 		            });
	 		        });
	 		} catch (Exception e) {
	 		    e.printStackTrace();
	 		    response.ExceptionForImg(response);
	 		    return response;
	 		}

		   
			List<StoredImages> images1 = new ArrayList<>();
			
			 if (related_file != null) {
				 
				 Long relCustomerId = saveOrder.getRelatedCustomer().getRelated_customer_id();
				 
				     images1 = related_file.stream()
				        .map(file -> {
				            try {
				                StoredImages storeFile = storeImageAzure.storeFile(
				                    file.getOriginalFilename(),
				                    file.getInputStream(),
				                    file.getSize(),
				                    5
				                );
				                storeFile.setRel_customer_id(relCustomerId);
				                return storeFile;
				            } catch (IOException e) {
				                e.printStackTrace();
				                return null;  // Handle or log the exception as needed
				            }
				        })
				        .filter(Objects::nonNull)  // Filter out any nulls resulting from exceptions
				        .collect(Collectors.toList());
				}

			 if(saveOrder.getRelatedCustomer() != null)
			 {	 
			   RelatedCustomer relatedCustomer1 = (RelatedCustomer) saveOrder.getRelatedCustomer();
               relatedCustomer1.setIdtyImages(images1);
		        saveOrder = orderRepository.save(saveOrder);
			 }
			 
			 if(saveOrder.getOrderStatus() == OrderStatus.ACCEPT) {
			        orderRepository.updateRoomStatusUsingRoomNo(RoomStatus.ENGAGE, order.getRoomDetails().getRoom_number());
			 }
 
			 
			Order1DTO order1dto = mapper.map(saveOrder, Order1DTO.class);
			customerOrderDTO.setOrder1dto(order1dto);
			response.saveOrderResponse(customerOrderDTO);
			return response;
	}

	
	
//	public SuccessResponse saveAllOrder(CustomersDTO customersDTO, List<MultipartFile> image_file,List<MultipartFile> related_file, OrderDTO orderDto,MultipartFile payment_file) {
//		
//		LocalDateTime now = LocalDateTime.now();
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//		String formattedDateTime = now.format(formatter);
// 		List<Long> relatedCustomer_id = new ArrayList<>();
//
//	 	   try {
//	 		if(orderDto.getPayments() != null) {
//			    Payment payment1 = orderDto.getPayments().get(0); 	   
//				if(payment_file != null) {		
//					  StoredImages storeFile1;	
//						storeFile1 = storeImageAzure.storeFile(payment_file.getOriginalFilename(),
//								  payment_file.getInputStream(), payment_file.getSize(), 6);
//						  payment1.setImage_link(storeFile1.getImg_link());
//						  payment1.setCustomer_id(orderDto.getCustomers_id());
//						  payment1.setTransaction_date(formattedDateTime);
//				          paymentRepository.save(payment1);
//				}
//	 		 } 
//	       } catch (IOException e) {
//				e.printStackTrace();
//				response.ExceptionForImg(response);
//				return response;
//		   }
//	 		
//	     
//			Customers saveCustomer = null;
//			
//			CustomerOrderDTO customerOrderDTO =new CustomerOrderDTO();
//
//			
//			if(customersDTO.getCustomer_id() != null) {
//				 Optional<Customers> customer = customersRepository.findById(customersDTO.getCustomer_id());
//				 
//				 if(customer.isPresent()) {
//					 Customers customers2 = customer.get();
//					 customers2.setModification_time(formattedDateTime);
//					 if(customersDTO.getAddresses() != null) {
//	                    customers2.getAddresses().addAll(customersDTO.getAddresses());
//					 }
//					 
//					 if(customersDTO.getVehicles() != null) {
//	                    customers2.getVehicles().addAll(customersDTO.getVehicles());
//					 }
//					 
//				   saveCustomer = customersRepository.save(customers2);       	
//	    		   Customers1DTO customers1dto = mapper.map(saveCustomer, Customers1DTO.class);
//				   customerOrderDTO.setCustomers1Dto(customers1dto); 
//				 }		
//			}
//			
//			if(saveCustomer == null)
//			{
//				Optional<Customers> byMobile = customersRepository.findByMobile(customersDTO.getCustomer_mobile());
//				if (byMobile.isPresent()) {
//					response.moibleAlreadyExist();
//					return response;
//				}
//				
//				customersDTO.setCreation_time(formattedDateTime);
//			    String customerId = generateCustomerId();
//		 		customersDTO.setCustomer_no(customerId);
//				Customers map = mapper.map(customersDTO, Customers.class);
//				saveCustomer = customersRepository.save(map);				
//				
//				List<StoredImages> images = new ArrayList<>();
//
//				if(image_file != null)
//				{
//					for (MultipartFile file : image_file) {
//						StoredImages storeFile = null;
//						try {
//							storeFile = storeImageAzure.storeFile(file.getOriginalFilename(),
//									file.getInputStream(), file.getSize(), 1);
//							
//						} catch (IOException e) {
//							e.printStackTrace();
//						}
//						storeFile.setCustomer_id(saveCustomer.getCustomer_id());
//						images.add(storeFile);
//					}
//					
//					saveCustomer.setImages(images);
//					saveCustomer = customersRepository.save(saveCustomer);				
//				}
//				
//				Customers1DTO customers1dto = mapper.map(saveCustomer, Customers1DTO.class);
//				customerOrderDTO.setCustomers1Dto(customers1dto); 
//			}
//			
//			 orderDto.setCustomers_id(saveCustomer.getCustomer_id());
//
//			Long totalAmount = 0L;
//
//			if(orderDto.getFoodDetails() != null) {
//			  	 for(FoodDetail foodDetail:orderDto.getFoodDetails()) {
//					Long price = detailRepository.findPriceByFoodId(foodDetail.getFood_id());
//					String  foodName = detailRepository.findFoodNameByFoodId(foodDetail.getFood_id());
//					Long amount = price * foodDetail.getQuantity();
//					totalAmount +=amount;
//					foodDetail.setAmount(amount);
//					foodDetail.setFood_name(foodName);
//					detailRepository.save(foodDetail);
//				 }
//			}
//			
//			Long paidAmount = 0L;
//			
//			if(orderDto.getPayments() != null) {
//				for(Payment payment:orderDto.getPayments()) {
//					payment.setTransaction_date(formattedDateTime);
//					payment.setCustomer_id(orderDto.getCustomers_id());
//					paidAmount += payment.getAmount();
//					
//					paymentRepository.save(payment);
//				}
//			}
//			
//			
//			if(orderDto.getOrder_id() != null) {
//	            Optional<Order> orderOptional = orderRepository.findById(orderDto.getOrder_id());
//	            
//	            if(orderOptional.get().getOrderStatus() != OrderStatus.COMPLETE)
//	            {
//		             if (orderOptional.isPresent()) {
//		                Order order = orderOptional.get();
//		                
//						for(FoodDetail foodDetail : order.getFoodDetails()) {
//		                    totalAmount += foodDetail.getAmount();        			
//		        		}
//		                
//		        		if(orderDto.getFoodDetails() != null) { 
//		                   order.getFoodDetails().addAll(orderDto.getFoodDetails());
//		        		}
//		        		
//		        		for(Payment payment : order.getPayments()) {
//		        			paidAmount += payment.getAmount();        			
//		        		}
//		        		
//		        		if(orderDto.getPayments() != null) {
//		                  order.getPayments().addAll(orderDto.getPayments());
//		        		}
//		        		
//		        		if(order .getRoomDetails() != null) {
//		        		  totalAmount +=order.getRoomDetails().getAmount();
//		        		} 
//		        		Long remainAmount = totalAmount - paidAmount;
//		        		
//		        		if(orderDto.getOrderStatus() != OrderStatus.PENDING) {
//		        			order.setOrderStatus(orderDto.getOrderStatus());
//	                        
//		        			if(orderDto.getOrderStatus() == OrderStatus.ACCEPT) {
//		        				if(order.getRoomDetails() != null) {
//		        				notification.setMessage("Confirm Your "+order.getOrder_no()+" for Room :"+Long.toString(order.getRoomDetails().getRoom_number()));
//		        				notification.setCustomer_id(saveCustomer.getCustomer_id());
//		        				notification.setRoomStatus(RoomStatus.ENGAGE);
//								notification.setCreation_time(formattedDateTime);
//								notificationRepository.save(notification);
//		        				}
//		        			}
//		        			
//		        			if(orderDto.getOrderStatus() == OrderStatus.COMPLETE) {
//		        				    
//	        				   if(remainAmount != 0) {
//     		        			 response.paidAllAmount();
//     		        			 return response;
//     		        	       }	
//	        				
//	        				    if(order.getRoomDetails() != null) {
//	        				     roomRepository.changeStatus(order.getRoomDetails().getRoom_number());
//	        				    }
//		        					        				    
//		    		         	  		        				
//		        			}		
//		        		}
//		        					        		
//		        	    Long totalAmount1 = totalAmount+orderDto.getExtra_amount();	        		
//		        			        		  
//		        		order.setRemaining_amount(remainAmount);
//		         		order.setPaid_amount(paidAmount);
//		         		order.setTotalAmount(totalAmount1);
//		        		order.setExtendTime(orderDto.getExtendTime());
//		        		
//			    		if(totalAmount < paidAmount) {
//		        			response.paidPaymentHigh();
//		        			return response;
//		        		}
//			    		
//			    		 Order saveOrder = orderRepository.save(order);	  
//		         		OrderDTO orderDto1 = mapper.map(saveOrder, OrderDTO.class);
//		         		response.updateOrderResponse(orderDto1);
//		         		return response;
//		             }	
//	            }else {
//	                	response.orderNotUpdate();
//		         		return response;
//	            }  
//	        }
//			
//			totalAmount +=orderDto.getRoomDetails().getAmount();
//			Long remainAmount = totalAmount - paidAmount;
//			
//			if(totalAmount < paidAmount) {
//				response.paidPaymentHigh();
//				return response;
//			}
//			
//
//	 		orderDto.setRemaining_amount(remainAmount);
//	 		orderDto.setPaid_amount(paidAmount);
//	 		orderDto.setTotalAmount(totalAmount);
//	 		int noOfCount = relatedCustomer_id.size();
//	 		
//	 		orderDto.setNoOfCount(noOfCount+1);
//	 		
//	 		if(orderDto.getOrderStatus() == OrderStatus.PENDING) {
//	 			notification.setMessage(saveCustomer.getCustomer_no()+ ": "+saveCustomer.getCustomer_name()+" Are Request to Room :"+Long.toString(orderDto.getRoomDetails().getRoom_number()));
//	 			notification.setRoomStatus(RoomStatus.REQUEST);
//	 			notification.setCreation_time(formattedDateTime);
//	 			notificationRepository.save(notification);
//	 		}
//	 		
//	 		
//	 		
//	       String bookingId = generateBookingId();
//			orderDto.setOrder_no(bookingId);
//			Order order = mapper.map(orderDto, Order.class);
//			Order savedOrder= orderRepository.save(order);
//			
//			
//			 List<StoredImages> images1 = new ArrayList<>();
//    		 
//			 if(related_file != null)
//			 {
//					StoredImages storeFile1 = null;
//					for (MultipartFile file : related_file) {
//						try {			
//							storeFile1 = storeImageAzure.storeFile(file.getOriginalFilename(),
//									file.getInputStream(), file.getSize(), 5);	
//						} catch (IOException e) {
//							e.printStackTrace();
//						}
//						storeFile1.setRel_customer_id(savedOrder.getRelatedCustomer().getRelated_customer_id());
//						images1.add(storeFile1);
//				    }		  
//			 }
//			 savedOrder = orderRepository.save(savedOrder);	  
//
//			 if(savedOrder.getRelatedCustomer() != null)
//			 {	 
//			   RelatedCustomer relatedCustomer = savedOrder.getRelatedCustomer();
//               relatedCustomer.setIdtyImages(images1);
//			 }
//               
//			Order1DTO order1dto = mapper.map(savedOrder, Order1DTO.class);
//			customerOrderDTO.setOrder1dto(order1dto);
//	        orderRepository.updateRoomStatusUsingRoomNo(RoomStatus.ENGAGE, order.getRoomDetails().getRoom_number());
//			response.saveOrderResponse(customerOrderDTO);
//			return response;
//	}

	
	
	public String generateBookingId() {
		LocalDate currentDate = LocalDate.now();
		int year = currentDate.getYear() % 100;
		int month = currentDate.getMonthValue();
		Optional<Order> topByOrderByBookingIdDesc = orderRepository.findTopByOrderByBookingIdDesc();
		String lastBookingId;
		if (topByOrderByBookingIdDesc.isPresent() && topByOrderByBookingIdDesc != null) {
			lastBookingId = topByOrderByBookingIdDesc.get().getOrder_no();
		} else {
			lastBookingId = "ORD" + String.format("%02d%02d", year, month) + "000000";
		}

		String numericPart = lastBookingId.substring(8);
		int numericValue = Integer.parseInt(numericPart) + 1;
		String newNumericPart = String.format("%06d", numericValue);

		// Generate the new booking ID
		return "ORD" + String.format("%02d%02d", year, month) + newNumericPart;
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

		// Generate the new booking ID
		return "CUS" + String.format("%02d%02d", year, month) + newNumericPart;
	}

	

	public SuccessResponse getAllOrderByCustomerId(Long customerId) {

		    List<Order> orders = orderRepository.getAllOrderByCustomerId(customerId);

			if (orders != null) {
		    
		    List<CustomerOrderDTO> customerOrderDTOs = orders.stream()
		        .map(order -> {
		            Optional<Customers> customerOptional = customersRepository.findById(order.getCustomers_id());
		            Customers1DTO customers1dto = customerOptional.map(customer -> mapper.map(customer, Customers1DTO.class))
		                .orElse(null); 
		            
		            CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
		            customerOrderDTO.setCustomers1Dto(customers1dto);

		            Order1DTO order1dto = mapper.map(order, Order1DTO.class);
		            customerOrderDTO.setOrder1dto(order1dto);

		            return customerOrderDTO;
		        })
		        .collect(Collectors.toList());

		    if (!customerOrderDTOs.isEmpty()) {
		        response.getOrderResponse(customerOrderDTOs);
		    } else {
		        response.orderNotFoundResponse();
		    }

		    return response;
		}

		response.orderNotFoundResponse();
		return response;
		
//		if (customerId != null) {
//			List<Order> orders = orderRepository.getAllOrderByCustomerId(customerId);
//			List<CustomerOrderDTO> customerOrderDTOs = new ArrayList<>();
//			
//			for(Order order:orders) {			
//				Optional<Customers> customers = customersRepository.findById(order.getCustomers_id());
//				Customers1DTO customers1dto = mapper.map(customers, Customers1DTO.class);
//				CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
//				customerOrderDTO.setCustomers1Dto(customers1dto);
//				Order1DTO order1dto = mapper.map(order, Order1DTO.class);
//				customerOrderDTO.setOrder1dto(order1dto);
//				customerOrderDTOs.add(customerOrderDTO);
//			}
//			response.getOrderResponse(customerOrderDTOs);
//			return response;   
//		}
//		response.orderNotFoundResponse();
//		return response;	
	}

	
	public SuccessResponse getCurrentCustomerUsingRoomNo(String roomNo) {
		Long orderId = orderRepository.findCustomersByDateRoomNumberAndTime(roomNo, RoomStatus.ENGAGE);
		if (orderId != null) {
			Optional<Order> order = orderRepository.findById(orderId);
			Optional<Customers> customers = customersRepository.findById(order.get().getCustomers_id());
			Customers1DTO customers1dto = mapper.map(customers, Customers1DTO.class);
			CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
			customerOrderDTO.setCustomers1Dto(customers1dto);
			Order1DTO order1dto = mapper.map(order, Order1DTO.class);
			customerOrderDTO.setOrder1dto(order1dto);
			response.getOrderResponse(customerOrderDTO);
			return response;
			
		}
		response.orderNotFoundResponse();
		return response;

	}


      public SuccessResponse getAllOrderByBookingDate(String bookingDate) {
    	  List<Order> orders = orderRepository.getAllOrderByBookingDate(bookingDate);

			if (orders != null) {
		
		    List<CustomerOrderDTO> customerOrderDTOs = orders.stream()
		        .map(order -> {
		            Optional<Customers> customerOptional = customersRepository.findById(order.getCustomers_id());
		            Customers1DTO customers1dto = customerOptional.map(customer -> mapper.map(customer, Customers1DTO.class))
		                .orElse(null); 
		            
		            CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
		            customerOrderDTO.setCustomers1Dto(customers1dto);

		            Order1DTO order1dto = mapper.map(order, Order1DTO.class);
		            customerOrderDTO.setOrder1dto(order1dto);

		            return customerOrderDTO;
		        })
		        .collect(Collectors.toList());

		    if (!customerOrderDTOs.isEmpty()) {
		        response.getOrderResponse(customerOrderDTOs);
		    } else {
		        response.orderNotFoundResponse();
		    }

		    return response;
		}

		response.orderNotFoundResponse();
		return response;
	

		    
      }
	
@SuppressWarnings("unused")
@Override
	public SuccessResponse GetTheDailySale(String Date) {
//		System.out.println("Service received date: " + Date);
		SuccessResponse response = new SuccessResponse();
		if (Date == null || Date.isEmpty()) {
			response.DateIsNull();
			return response;
		}

		Long cashDailySale = orderRepository.getSaleOnBookingDate(Date,PaymentType.CASH);
		Long onlineDailySale = orderRepository.getSaleOnBookingDate(Date,PaymentType.ONLINE);
		Long totalDailySale = orderRepository.getSaleOnBookingDate(Date,null);
		
		AmountDTO amountDTO =  new AmountDTO();
		
		amountDTO.setCash_amount(cashDailySale);
		amountDTO.setOnline_amount(onlineDailySale);
		amountDTO.setTotal_amount(totalDailySale);
		
		if (amountDTO != null) {
			response.getTheDaysWiseSale(amountDTO);
			return response;
		} 
		response.dateNotfound();
		return response;
	}

//------------------------------------------------------------------------------------------------------------------------------	

//Get The sale monthly	
	@SuppressWarnings("unused")
	@Override
	public SuccessResponse getTheMonthWiseSale(String monthYear) {
		SuccessResponse response = new SuccessResponse();
		 Long cashMonthSale = orderRepository.getTheMonthWiseSale(monthYear,PaymentType.CASH);
		 Long onlineMonthSale  = orderRepository.getTheMonthWiseSale(monthYear,PaymentType.ONLINE);
		 Long totalMonthSale = orderRepository.getTheMonthWiseSale(monthYear,null);

		 
		AmountDTO amountDTO =  new AmountDTO();
		amountDTO.setCash_amount(cashMonthSale);
		amountDTO.setOnline_amount(onlineMonthSale);
		amountDTO.setTotal_amount(totalMonthSale);
			
		if (amountDTO != null) {
			response.setMonthWiseSales(amountDTO);
			return response;
		} 
		response.notAnySaleForThisMonth();
		return response;
	}

//--------------------------------------------------------------------------------------------------------------------------------

	@SuppressWarnings("unused")
	@Override
	public SuccessResponse getTheYearWiseSale(String year) {
		
		SuccessResponse response = new SuccessResponse();
		 Long cashYearSale = orderRepository.getTheYearWiseSale(year,PaymentType.CASH);
		 Long onlineYearSale  = orderRepository.getTheYearWiseSale(year,PaymentType.ONLINE);
		 Long totalYearSale = orderRepository.getTheYearWiseSale(year,null);

		 
		AmountDTO amountDTO =  new AmountDTO();
		amountDTO.setCash_amount(cashYearSale);
		amountDTO.setOnline_amount(onlineYearSale);
		amountDTO.setTotal_amount(totalYearSale);
			
		if (amountDTO != null) {
			response.setYearWiseSales(amountDTO);
			return response;
		} 
		response.notAnySaleForThisYear();
		return response;
	
	}

//----------------------------------------------------------------------------------------------------------------	



	public SuccessResponse getTheRoomsUsingOrderStatus(int page,int size,OrderStatus orderStatus) {
		
//		Pageable pageable = PageRequest.of(page, size);
//		Page<Order> ordersPage = orderRepository.getAllOrderStatusIn(orderStatus, pageable);
//
//		List<CustomerOrderDTO> customerOrderDTOs = ordersPage.getContent().stream()
//		    .map(order -> {
//		        Optional<Customers> customerOptional = customersRepository.findById(order.getCustomers_id());
//		        Customers1DTO customers1dto = customerOptional.map(customer -> mapper.map(customer, Customers1DTO.class))
//		            .orElse(null);
//
//		        Order1DTO order1dto = mapper.map(order, Order1DTO.class);
//		        CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
//		        customerOrderDTO.setCustomers1Dto(customers1dto);
//		        customerOrderDTO.setOrder1dto(order1dto);
//
//		        return customerOrderDTO;
//		    })
//		    .collect(Collectors.toList());
//
//		if (!customerOrderDTOs.isEmpty()) {
//		    response.getOrderResponse(customerOrderDTOs);
//		} else {
//		    response.orderNotFoundResponse();
//		}
//
//		return response;

		
		List<CustomerOrderDTO> customerOrderDTOs = new ArrayList<>();
        
		 Pageable pageable = PageRequest.of(page, size);
	        Page<Order> ordersPage = orderRepository.getAllOrderStatusIn(orderStatus,pageable);
			
	        List<Order> orders = ordersPage.getContent();


	   if (!ordersPage.isEmpty()) {
		   
		for(Order order:orders) {
			Optional<Customers> customers = customersRepository.findById(order.getCustomers_id());			
				Customers1DTO customers1dto = mapper.map(customers, Customers1DTO.class);
				CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
				customerOrderDTO.setCustomers1Dto(customers1dto);				
				Order1DTO order1dto = mapper.map(order, Order1DTO.class);
				customerOrderDTO.setOrder1dto(order1dto);
				customerOrderDTOs.add(customerOrderDTO);
		}
				
		response.getOrderResponse(customerOrderDTOs);
		return response;
		} else
			response.orderNotFoundResponse();
		return response;	

	}



}


//if(customersDTO.getDob() != null) {
//	if(Functions.getAgeUsingDate(customersDTO.getDob()) < 18 ) {
//		response.notRegisterCustomer();
//		return response;
//	}
//}
//
//LocalDateTime now = LocalDateTime.now();
//DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//String formattedDateTime = now.format(formatter);
//
//	List<Long> relatedCustomer_id = new ArrayList<>();
//
//	if(orderDto.getPayments() != null) {
//   Payment payment1 = orderDto.getPayments().get(0);
//	
//	if(payment_file != null) {
//	
//	  StoredImages storeFile1;
//	try {
//		storeFile1 = storeImageAzure.storeFile(payment_file.getOriginalFilename(),
//				  payment_file.getInputStream(), payment_file.getSize(), 6);
//		  payment1.setImage_link(storeFile1.getImg_link());
//		  payment1.setCustomer_id(orderDto.getCustomers_id());
//		  payment1.setTransaction_date(formattedDateTime);
//
//	} catch (IOException e) {
//		// TODO Auto-generated catch block
//		e.printStackTrace();
//	}
//     paymentRepository.save(payment1);
// }
//	}
//	
//
//
//	
//List<RelatedCustomer> relatedCustomer = customersDTO.getRelatedCustomer();
//
//if(relatedCustomer != null && related_file != null) {
//
//	for(int i=0;i<relatedCustomer.size();i++) {
//		RelatedCustomer relCustomer = relatedCustomer.get(i);
//		
//	    if (i >= 0 && i < related_file.size()) {
//
//		  MultipartFile file = related_file.get(i);
//		  StoredImages storeFile1;
//		try {
//			storeFile1 = storeImageAzure.storeFile(file.getOriginalFilename(),
//					file.getInputStream(), file.getSize(), 5);
//			  relCustomer.setImage_link(storeFile1.getImg_link());
//			  relCustomer.setImage_name(storeFile1.getImage_name());
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//		
//	    }
//		
//	    RelatedCustomer relatedCustomer2 = relatedCustomerRepository.save(relCustomer);
//	    relatedCustomer_id.add(relatedCustomer2.getRelated_customer_id());
//	}
//}
//	
//	
//
//	if(image_file != null)
//	{
//	
//try {
//	StoredImages storeFile = storeImageAzure.storeFile(image_file.getOriginalFilename(),
//			image_file.getInputStream(), image_file.getSize(), 1);
//	customersDTO.setImage_name(storeFile.getImage_name());
//	customersDTO.setImage_link(storeFile.getImg_link());
//
//	
//} catch (IOException e) {
//	e.printStackTrace();
//	response.ExceptionForImg(response);
//	return response;
//}
//	}
//
//
//
//Customers saveCustomer = null;
//
//CustomerOrderDTO customerOrderDTO =new CustomerOrderDTO();
//
//
//if(customersDTO.getCustomer_id() != null) {
//	 Optional<Customers> customer = customersRepository.findById(customersDTO.getCustomer_id());
//	 
//	 if(customer.isPresent()) {
//		 Customers customers2 = customer.get();
//		 customers2.setModification_time(formattedDateTime);
//		 if(customersDTO.getAddresses() != null) {
//            customers2.getAddresses().addAll(customersDTO.getAddresses());
//		 }
//		 
//		 if(customersDTO.getVehicles() != null) {
//            customers2.getVehicles().addAll(customersDTO.getVehicles());
//		 }
//		 
//		 if(customersDTO.getRelatedCustomer() != null) {
//            customers2.getRelatedCustomer().addAll(customersDTO.getRelatedCustomer());
//		 }
//		 
//		 if(image_file != null) {
//			 customers2.setImage_name(customersDTO.getImage_name());
//			 customers2.setImage_link(customersDTO.getImage_link());
// 		}
//		 
//		 
//		 
//	  saveCustomer = customersRepository.save(customers2);       	
//	  Customers1DTO customers1dto = mapper.map(saveCustomer, Customers1DTO.class);
//	  customerOrderDTO.setCustomers1Dto(customers1dto); 
//	  customerOrderDTO.setRelatedCustomer(customersDTO.getRelatedCustomer());
//	 }		
//}
//
//
//if(saveCustomer == null)
//{
//
//	Optional<Customers> byEmail = customersRepository.findByEmail(customersDTO.getCustomer_email());
//	if (byEmail.isPresent()) {
//		response.emailAlreadyExist();
//		return response;
//	}
//	Optional<Customers> byMobile = customersRepository.findByMobile(customersDTO.getCustomer_mobile());
//	if (byMobile.isPresent()) {
//		response.moibleAlreadyExist();
//		return response;
//	}
//  
//	
//	customersDTO.setCreation_time(formattedDateTime);
//    String modifiedString = Functions.generateBookingId("CUSTID");
//		customersDTO.setCustomer_no(modifiedString);
//	Customers map = mapper.map(customersDTO, Customers.class);
//	saveCustomer = customersRepository.save(map);
//	
//	Customers1DTO customers1dto = mapper.map(saveCustomer, Customers1DTO.class);
//	customerOrderDTO.setCustomers1Dto(customers1dto); 
//	customerOrderDTO.setRelatedCustomer(saveCustomer.getRelatedCustomer());			
//}
//
// orderDto.setCustomers_id(saveCustomer.getCustomer_id());
//
//
//Long totalAmount = 0L;
//
//if(orderDto.getFoodDetails() != null) {
//  	 for(FoodDetail foodDetail:orderDto.getFoodDetails()) {
//		Long price = detailRepository.findPriceByFoodId(foodDetail.getFood_id());
//		String  foodName = detailRepository.findFoodNameByFoodId(foodDetail.getFood_id());
//		Long amount = price * foodDetail.getQuantity();
//		totalAmount +=amount;
//		foodDetail.setAmount(amount);
//		foodDetail.setFood_name(foodName);
//		detailRepository.save(foodDetail);
//	 }
//}
//
//Long paidAmount = 0L;
//
//if(orderDto.getPayments() != null) {
//	for(Payment payment:orderDto.getPayments()) {
//		payment.setTransaction_date(formattedDateTime);
//		payment.setCustomer_id(orderDto.getCustomers_id());
//		paidAmount += payment.getAmount();
//		
//		paymentRepository.save(payment);
//	}
//}
//
//
//if(orderDto.getOrder_id() != null) {
//    Optional<Order> orderOptional = orderRepository.findById(orderDto.getOrder_id());
//    
//    if(orderOptional.get().getOrderStatus() != OrderStatus.COMPLETE)
//    {
//         if (orderOptional.isPresent()) {
//            Order order = orderOptional.get();
//            
//			for(FoodDetail foodDetail : order.getFoodDetails()) {
//                totalAmount += foodDetail.getAmount();        			
//    		}
//            
//    		if(orderDto.getFoodDetails() != null) { 
//               order.getFoodDetails().addAll(orderDto.getFoodDetails());
//    		}
//    		
//    		for(Payment payment : order.getPayments()) {
//    			paidAmount += payment.getAmount();        			
//    		}
//    		
//    		if(orderDto.getPayments() != null) {
//              order.getPayments().addAll(orderDto.getPayments());
//    		}
//    		
//    		if(order .getRoomDetails() != null) {
//    		  totalAmount +=order.getRoomDetails().getAmount();
//    		} 
//    		  
//    		Long remainAmount = totalAmount - paidAmount;
//    		
//    		if(totalAmount < paidAmount) {
//    			response.paidPaymentHigh();
//    			return response;
//    		}
//    		
//    		if(orderDto.getOrderStatus() != OrderStatus.PENDING) {
//    			order.setOrderStatus(orderDto.getOrderStatus());
//                
//    			if(orderDto.getOrderStatus() == OrderStatus.ACCEPT) {
//    				if(order.getRoomDetails() != null) {
//    				notification.setMessage("Confirm Your "+order.getOrder_no()+" for Room :"+Long.toString(order.getRoomDetails().getRoom_number()));
//    				notification.setCustomer_id(saveCustomer.getCustomer_id());
//    				notification.setRoomStatus(RoomStatus.ENGAGE);
//					notification.setCreation_time(formattedDateTime);
//					notificationRepository.save(notification);
//    				}
//    			}
//    			
//    			if(orderDto.getOrderStatus() == OrderStatus.COMPLETE) {
//    				if(order.getRoomDetails() != null) {
//                       roomRepository.changeStatus(order.getRoomDetails().getRoom_number());
//    				}
//    			}
//
//					
//    		}
//    			
////    		if(orderDto.getOuttime() != null && orderDto.getIntime() != null)
////    		{
////    		  order.setIntime(Functions.removeLeadingZero(orderDto.getIntime()));
////    		  order.setOuttime(Functions.removeLeadingZero(orderDto.getOuttime()));
////    		}
//    		  
//    		order.setRemaining_amount(remainAmount);
//     		order.setPaid_amount(paidAmount);
//     		order.setTotalAmount(totalAmount+orderDto.getExtra_amount());
//    		order.setExtendTime(orderDto.getExtendTime());
//
//     		orderRepository.save(order);
//     		OrderDTO orderDto1 = mapper.map(order, OrderDTO.class);
//     		response.updateOrderResponse(orderDto1);
//     		return response;
//         }	
//    }else {
//   	 response.orderNotUpdate();
//     		return response;
//    }  
//        
//    
//}
//totalAmount +=orderDto.getRoomDetails().getAmount();
//Long remainAmount = totalAmount - paidAmount;
//if(totalAmount < paidAmount) {
//	response.paidPaymentHigh();
//	return response;
//}
//
////if(orderDto.getOuttime() != null && orderDto.getIntime() != null) {
////	orderDto.setIntime(Functions.removeLeadingZero(orderDto.getIntime()));
////	orderDto.setOuttime(Functions.removeLeadingZero(orderDto.getOuttime()));
////	}
//	orderDto.setRemaining_amount(remainAmount);
//	orderDto.setPaid_amount(paidAmount);
//	orderDto.setTotalAmount(totalAmount);
//	
//
//	   
//	int noOfCount = relatedCustomer_id.size();
//	
//	
//	orderDto.setNoOfCount(noOfCount+1);
//	orderDto.setRelated_customers_id(relatedCustomer_id);
//	
//	if(orderDto.getOrderStatus() == OrderStatus.PENDING) {
//		notification.setMessage(saveCustomer.getCustomer_no()+ ": "+saveCustomer.getCustomer_name()+" Are Request to Room :"+Long.toString(orderDto.getRoomDetails().getRoom_number()));
//		notification.setRoomStatus(RoomStatus.REQUEST);
//		notification.setCreation_time(formattedDateTime);
//		notificationRepository.save(notification);
//	}
//	
//	if(orderDto.getOrderStatus() == OrderStatus.ACCEPT) {
//		notification.setMessage("Room "+Long.toString(orderDto.getRoomDetails().getRoom_number())+": Are Booked..");
//		notification.setCreation_time(formattedDateTime);
//		notification.setRoomStatus(RoomStatus.ENGAGE);
//		notificationRepository.save(notification);
//	}
//	
//	
//String modifiedString = Functions.generateBookingId("ORDID");
//orderDto.setOrder_no(modifiedString);
//Order order = mapper.map(orderDto, Order.class);
//Order savedOrder= orderRepository.save(order);
//
//Order1DTO order1dto = mapper.map(savedOrder, Order1DTO.class);
//
//customerOrderDTO.setOrder1dto(order1dto);
//
//orderRepository.updateRoomStatusUsingRoomNo(RoomStatus.ENGAGE, order.getRoomDetails().getRoom_number());
//response.saveOrderResponse(customerOrderDTO);
//return response;