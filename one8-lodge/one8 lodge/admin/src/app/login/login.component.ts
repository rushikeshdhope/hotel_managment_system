import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { mainresclass } from 'src/model/user';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginData: FormGroup;
  isAdmin: boolean = false;
  selectedRole: string = 'MANAGER';

  constructor(private fb: FormBuilder, private toastr: ToastrService, private route: Router, private http: HttpClient, private authService: AuthService) {
    this.LoginData = this.fb.group({
      user_name: ['', [Validators.required]],
      user_password: ['', [Validators.required]],
      role: ['']


    })
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }


  setRole(role: boolean) {
    if (role == true) {
      this.selectedRole = "ADMIN"
      this.LoginData.reset()

    } else {
      this.selectedRole = "MANAGER";
      this.LoginData.reset()

    }
    this.isAdmin = role;
  }
  LoginFormSubmit() {
    this.LoginData.get('role')?.setValue(this.selectedRole);
    const url = 'http://localhost:1098/hotel_booking/v1/user/login'; 

    this.http.post<mainresclass>(url, this.LoginData.value).subscribe((res: mainresclass) => {
      if (res.message == "LOGIN SUCCESFULLY..!") {
        this.authService.login(res.response.role);
        if (res.response.role == "MANAGER") {

          this.route.navigate(['/bookings']);
        } else {

          this.route.navigate(['/adminDashboardRoute']);
        }
        this.toastr.success(res.message);
        this.LoginData.reset();

      }
      else {


        this.toastr.error(res.message);
      }

    }, (error) => {
      // this.toastr.error(error.message);

    })

    //  this.toastr.success("Hii");
  }




}
