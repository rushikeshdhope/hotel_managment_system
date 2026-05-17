import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotleservicesService } from '../hotleservices.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  resetPasswordForm: FormGroup;
  emailError: string | null = null;
  otpError: string | null = null;
  otpSent: boolean = false;
  otp: any;
  otpVerified: boolean = false;
  passwordUpdated: boolean = false; 
  updateMessage: string | null = null; 

  constructor(private fb: FormBuilder, private forgotPasswordService: HotleservicesService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });
  }

  onSubmitEmail(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.forgotPasswordService.sendResetPasswordEmail(email).subscribe(
        response => {
          console.log('Response:', response);
          if (response.message == 'SEND OTP SUCCESFULLY on Email..!') {
            this.otpSent = true;
            this.otp = response.response; 
            console.log('otp',this.otpSent)
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error occurred:', error.message);
          this.emailError = 'An error occurred. Please try again later.';
        }
      );
    }
  }

  onSubmitOtp(): void {
    if (this.otpForm.valid) {
      const enteredOtp = this.otpForm.get('otp')?.value;

      if (this.otp == enteredOtp) {
        this.otpVerified = true;
        this.resetPasswordForm.enable(); 
        this.otpError = null;
      } else {
        this.otpError = 'OTP is not matched. Please try again.';
        this.otpVerified = false;
      }
    }
  }

  onSubmitResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;

      this.forgotPasswordService.resetPassword(email, newPassword).subscribe(
        response => {
          console.log('Response:', response);
          if (response.message === 'UPDATE PASSWORD SUCCESFULLY..!') {
            this.passwordUpdated = true;
            this.otpSent = false;
            this.otpVerified = false;
            this.updateMessage = response.message;
            this.resetForms();
            setTimeout(() => {
              this.passwordUpdated = false; 
            }, 3000);
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error occurred:', error.message);
          this.emailError = 'An error occurred. Please try again later.';
        }
      );
    }
  }

  private passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  private resetForms(): void {
    this.forgotPasswordForm.reset();
    this.otpForm.reset();
    this.resetPasswordForm.reset();
    this.resetPasswordForm.disable();
  }
}
