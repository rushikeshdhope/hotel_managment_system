import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from '../auth.guard';
import { RoomComponent } from './room/room.component';
import { FoodComponent } from './food/food.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { CustomersComponent } from './customers/customers.component';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { BookingComponent } from './booking/booking.component';
import { NotificationComponent } from './notification/notification.component';
import { SliderImagesComponent } from './slider-images/slider-images.component';
import { DemoComponent } from './demo/demo.component';
import { FinalroomformComponent } from './finalroomform/finalroomform.component';
import { NewbookingComponent } from './newbooking/newbooking.component';




const routes: Routes = [
  { path: 'userDashboardRoute/:type/:CustomerId', component: UserDashboardComponent, canActivate: [AuthGuard]},
  { path: 'userDashboardRoute', component: UserDashboardComponent, canActivate: [AuthGuard]},
  { path: 'userRoomRoute', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'userFoodRoute', component: FoodComponent, canActivate: [AuthGuard] },
  { path: 'roomdetail/:id', component: RoomDetailsComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'notificatonRoute', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'SliderImagesRoute', component: SliderImagesComponent, canActivate: [AuthGuard] },
  { path: 'demo', component: DemoComponent, canActivate: [AuthGuard] },
  { path: 'demo/:id', component: DemoComponent, canActivate: [AuthGuard] },
  { path: 'fooddetail/:id', component: FoodDetailsComponent, canActivate: [AuthGuard] },
  { path: 'finalroomform/:id', component: FinalroomformComponent, canActivate: [AuthGuard] },
  { path: 'newBooking/:type/:CustomerId/:RoomNumber', component: NewbookingComponent, canActivate: [AuthGuard] },
  // { path: 'newBooking', component: NewbookingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
