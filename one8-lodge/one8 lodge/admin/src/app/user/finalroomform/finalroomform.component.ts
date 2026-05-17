import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { mainresclass2 } from 'src/model/admin';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finalroomform',
  templateUrl: './finalroomform.component.html',
  styleUrls: ['./finalroomform.component.css'],
})
export class FinalroomformComponent implements OnInit {
  customerRoomArray: any[] = [];
  SearchedArray: any[] = [];
  FoodSubCatArray: any[] = [];
  FoodArray: any[] = [];

  catId: number = 0;
  selectedFoodItems: {
    food_id: number;
    quantity: number;
    food_name: string;
    rate: number;
    total_rate: number;
  }[] = [];
  selectedFoodId: number = 0;
  quantity: number = 1;
  Array: any;

  constructor(
    private ActivatedRoutes: ActivatedRoute,
    private service: UserService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.ActivatedRoutes.params.subscribe((params) => {
  
      this.catId = params['id'];
  
    });
    this.getCustomerDetail();
    this.GetFoodCat();
  }

  GetFoodCat() {
    this.service.showLoader();
    this.service.getFoodFun().subscribe((res: mainresclass2) => {
      this.service.hideLoader();
      this.FoodArray = res.response;

  
    });
  }

  onCategorySelected(event: any) {
    this.service.hideLoader();


    this.service.getFoodSubCatFun(event.target.value).subscribe((res: any) => {
      this.service.hideLoader();

      if (res.response != null) {
        this.FoodSubCatArray = res?.response;
        this.FoodSubCatArray.reverse();
      } else {
      }

  
    });
  }

  getCustomerDetail() {
    this.service.showLoader();
    this.service.getCustomersUsingRoom(this.catId).subscribe((res) => {
      this.service.hideLoader();
  
      if (res.response != null) {
        this.customerRoomArray.push(res.response);
      } else {
      }

  
    });
  }

  onSubCategorySelected(id: number) {

    this.selectedFoodId = id;

  }

  addFoodItem() {
    const selectedFood = this.SearchedArray.find(
      (food) => food.food_id == this.selectedFoodId
    );


    if (selectedFood) {
      this.toastr.success('Food Add');  
      this.selectedFoodItems.push({
        food_id: this.selectedFoodId,
        quantity: this.quantity,
        food_name: selectedFood.food_name,
        rate: selectedFood.rate,
        total_rate: selectedFood.rate * this.quantity,
      });
    }

  }

  removeFoodItem(index: number) {
    this.selectedFoodItems.splice(index, 1);
  }

  addFood(orderId: number) {
    this.service.showLoader();
    const formData = new FormData();
    formData.append('order_id', orderId.toString());

    this.selectedFoodItems.forEach((item, index) => {
      formData.append(`foodDetails[${index}].food_id`, item.food_id.toString());
      formData.append(
        `foodDetails[${index}].quantity`,
        item.quantity.toString()
      );
    });

    this.http
      .post(
        'http://localhost:1098/hotel_booking/v1/user/order/saveAllOrder',
        formData
      )
      .subscribe(
        (response: any) => {
          this.service.hideLoader();
      
          if (response.message == 'ORDER UPDATE SUCCESFULLY') {
            this.customerRoomArray = [];
            this.getCustomerDetail();
            this.selectedFoodItems = [];
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  submitOrder(orderId: number) {
    this.addFood(orderId);
    this.SearchedArray = [];
    this.quantity=1;
    this.selectedFoodId =0;

    // this.customerRoomArray=[];

    // this.getCustomerDetail();
  }

  getOrderMob(event: any) {
    this.SearchedArray = [];
    this.service.showLoader();

    if (event.target.value === '') {
      this.service.hideLoader();
      this.SearchedArray = [];
      // this.changeBookings(this.currentMenu);
    } else {
      this.service
        .getFoodUsingSearch(event.target.value)
        .subscribe((res) => {
          if (res.response != null) {
            this.SearchedArray = res.response;
          } else {
            this.toastr.error('FOOD NOT FOUND ..');

            this.SearchedArray = [];
          }

          this.service.hideLoader();
        },
        (error) => {
          // Handle error case if needed
          this.toastr.error('An error occurred. Please try again.');
          this.service.hideLoader();
          
        });
    }
  }

}
