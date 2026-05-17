import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    LuxuryComponent,
    DeluxeComponent,
    StandardComponent,
    FooterComponent,
    SuitbalconyComponent,
    BookingComponent,
    RoomDetailsComponent,
    BookRoomComponent,
    RegisterUserComponent,
    UserLoginComponent,
    ForgotPasswordComponent,
    ContactUsComponent,
    AboutUsComponent,
    ProfileComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
