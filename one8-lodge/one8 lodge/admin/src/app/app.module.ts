import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';

import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './loader.interceptor';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserModule } from './user/user.module';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { WebcamModule } from 'ngx-webcam';
import { DemoComponent } from './user/demo/demo.component';

// import { PdfGeneratorService } from './pdf-generator.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    ForgotpasswordComponent,
    PdfGeneratorComponent,
    DemoComponent
    
   
   
  ],
  imports: [
    
    BrowserModule,
  UserModule,
    AdminModule,
    AppRoutingModule,
 FormsModule,
 
HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    WebcamModule
    

   
  ],
  providers: [
    // PdfGeneratorService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true,  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
