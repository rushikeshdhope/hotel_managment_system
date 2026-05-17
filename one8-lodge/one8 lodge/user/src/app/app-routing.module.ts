import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LuxuryComponent } from './luxury/luxury.component';
import { DeluxeComponent } from './deluxe/deluxe.component';
import { StandardComponent } from './standard/standard.component';
import { FooterComponent } from './footer/footer.component';
import { SuitbalconyComponent } from './suitbalcony/suitbalcony.component';
import { BookingComponent } from './booking/booking.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'header',
    component:HeaderComponent
  },
  {
    path:'register-user',
    redirectTo:'register-user'
  },
  {
    path:'home',  
    component:HomePageComponent
  },
  {
    path:'luxary/:id',
    component: LuxuryComponent
  },
{
  path:'deluxe',
  component: DeluxeComponent
},
{
  path:'standard',
  component: StandardComponent
},

{
  path :'footer',
  component: FooterComponent
},
{
  path:'suitbalcony',
  component: SuitbalconyComponent
},
{
  path:'booking',
  component: BookingComponent
},
{ 
  path: 'room-details/:id',
  component: RoomDetailsComponent 
},
{
  path: 'book-room',
  component: BookRoomComponent
},
{
  path: 'book-room/:room_no',
  component: BookRoomComponent
},
{
  path: 'register-user',
  component: RegisterUserComponent
},
{
  path: 'login-user',
  component: UserLoginComponent
},
{
  path: 'forgot-password',
  component: ForgotPasswordComponent
},
{
  path: 'contact-us',
  component: ContactUsComponent
},
{
  path: 'about',
  component: AboutUsComponent
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'payment',
  component: PaymentComponent
},
{
  path: 'payment/:order_id',
  component: PaymentComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
