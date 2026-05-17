import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotleservicesService } from '../hotleservices.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as Aos from 'aos';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  ngOnInit(): void {
    
    
    Aos.init();
  }


  loginForm: FormGroup;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private orderService: HotleservicesService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.email]],
      user_password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Mark all fields as touched
      this.toastr.error('Please fill out all required fields correctly.', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        
      });
      return;
    }

    const credentials = {
      user_name: this.loginForm.get('user_name')?.value,
      user_password: this.loginForm.get('user_password')?.value
    };

    this.orderService.loginCustomer(credentials).subscribe(
      response => {
        console.log("Result", response);
        
        if (response.status) {
          localStorage.setItem('logincustomerId', response.response.customer_id);
          this.orderService.isLoggedInSubject.next(true);
          this.toastr.success(response.message,'', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
        
          });
          this.router.navigate(['/book-room']);
        } else {
          this.toastr.error('Login failed', '', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            
          });
        }
      },
      error => {
        console.error('Error logging in', error);
        this.toastr.error('Error logging in', '', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          
        });
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
