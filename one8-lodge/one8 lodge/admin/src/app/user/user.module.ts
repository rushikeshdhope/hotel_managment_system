import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RoomComponent } from './room/room.component';
import { FoodComponent } from './food/food.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { CustomersComponent } from './customers/customers.component';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { CustomerComponent } from './customer/customer.component';
import { BookingComponent } from './booking/booking.component';
import { NotificationComponent } from './notification/notification.component';
import { SliderImagesComponent } from './slider-images/slider-images.component';
// import { DemoComponent } from './demo/demo.component';
import { FinalroomformComponent } from './finalroomform/finalroomform.component';
import { WebcamModule } from 'ngx-webcam';
import { NewbookingComponent } from './newbooking/newbooking.component';



@NgModule({
  declarations: [
    UserComponent,
    UserDashboardComponent,
    RoomComponent,
    FoodComponent,
    RoomDetailsComponent,
    CustomersComponent,
    FoodDetailsComponent,
    CustomerComponent,
    BookingComponent,
    NotificationComponent,
    SliderImagesComponent,

    FinalroomformComponent,
    NewbookingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule
  ]
})
export class UserModule { }
