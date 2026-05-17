import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotleservicesService } from '../hotleservices.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'] // corrected property name
})
export class RegisterUserComponent {
  customerForm: FormGroup;
  selectedFile: File | null = null;
  customer_name: any;
  customer_mobile: any;
  password: any;
  city: any;
  state: any;
  country: any;
  pincode: any;
  line1: any;

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private orderService: HotleservicesService,
    private toastr: ToastrService,
    private router: Router // Inject Router
  ) {
    this.customerForm = this.fb.group({
      customer_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      customer_mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      customer_email: ['', [Validators.required, Validators.email]],
      identity_type: ['', Validators.required],
      idenetity_number: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', Validators.required],
      addresses: this.fb.group({
        line1: ['', Validators.required],
        city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        state: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        country: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]] 
      }),
      file: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      this.toastr.error('Please fill out all required fields correctly.');
      this.markAllAsTouched(this.customerForm); // Mark all fields as touched to display validation errors
      return;
    }

    const formData = new FormData();
    formData.append('customer_name', this.customerForm.get('customer_name')?.value);
    formData.append('customer_mobile', this.customerForm.get('customer_mobile')?.value);
    formData.append('customer_email', this.customerForm.get('customer_email')?.value);
    formData.append('identity_type', this.customerForm.get('identity_type')?.value);
    formData.append('idenetity_number', this.customerForm.get('idenetity_number')?.value);
    formData.append('password', this.customerForm.get('password')?.value);
    formData.append('dob', this.customerForm.get('dob')?.value);


    const address = this.customerForm.get('addresses')?.value;
    formData.append('addresses[0].line1', address.line1);
    formData.append('addresses[0].city', address.city);
    formData.append('addresses[0].state', address.state);
    formData.append('addresses[0].country', address.country);
    formData.append('addresses[0].pincode', address.pincode);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.orderService.saveCustomer(formData).subscribe(
      response => {
        console.log("submit response",response);
        
        if (response.message === "CUSTOMER REGISTER SUCCESFULLY") {
          this.toastr.success(response.message, '', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
        
          });
          this.customerForm.reset();
          this.router.navigateByUrl("login-user");
        } else {
          this.toastr.error(response.message, '', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
        
          });
        }
      },
      error => {
        console.error('Error saving customer', error);
        this.toastr.error('Error saving customer', '', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
      
        });
      }
    );
  }

  private markAllAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  validateEmail(event: any): void {
    let input = event.target.value;
  
    // Allow only valid email characters
    input = input.replace(/[^a-zA-Z0-9@._-]/g, '');
  
    // Prevent typing after ".com"
    const comIndex = input.indexOf('.com');
    if (comIndex !== -1 && input.length > comIndex + 4) {
      input = input.substring(0, comIndex + 4);
    }
  
    // Update the form control value
    const emailControl = this.customerForm.get('customer_email');
    if (emailControl) {
      emailControl.setValue(input);
    }
  }

  validateInput(event: any) {
    const input = event.target.value;
    this.customer_name = input.replace(/[^a-zA-Z\s]/g, '');
    const inputElement = event.target;
    inputElement.value = this.customer_name;
    const inputEvent = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(inputEvent);
  }

  validateNumber(event: any) {
    const input = event.target.value;
    this.customer_mobile = input.replace(/[^0-9]/g, '');
    const inputElement = event.target;
    inputElement.value = this.customer_mobile;
    const inputEvent = new Event('input');
    inputElement.dispatchEvent(inputEvent);
  }

  validatePassword(event: any) {
    const input = event.target.value;
    // Allow alphanumeric and special characters but not emojis
    this.password = input.replace(/[^a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':",.<>?/`~]/g, '');
    
    // Update the input value directly
    const inputElement = event.target;
    inputElement.value = this.password;
    
    // Emit an input event to ensure Angular's data binding is updated
    const inputEvent = new Event('input');
    inputElement.dispatchEvent(inputEvent);
  }

  validateInputCity(event: any) {
    const input = event.target.value;
    this.city = input.replace(/[^a-zA-Z\s]/g, '');
    const inputElement = event.target;
    inputElement.value = this.city;
    const inputEvent = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(inputEvent);
  }

  validateInputState(event: any) {
    const input = event.target.value;
    this.state = input.replace(/[^a-zA-Z\s]/g, '');
    const inputElement = event.target;
    inputElement.value = this.state;
    const inputEvent = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(inputEvent);
  }

  validateInputCountry(event: any) {
    const input = event.target.value;
    this.country = input.replace(/[^a-zA-Z\s]/g, '');
    const inputElement = event.target;
    inputElement.value = this.country;
    const inputEvent = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(inputEvent);
  }

  validatePincode(event: any) {
    const input = event.target.value;
    this.pincode = input.replace(/[^0-9]/g, '');
    const inputElement = event.target;
    inputElement.value = this.pincode;
    const inputEvent = new Event('input');
    inputElement.dispatchEvent(inputEvent);
  }

  validateInputAlphaNum(event: any) {
    const input = event.target.value;
    // Allow alphabets, numbers, and spaces
    this.line1 = input.replace(/[^a-zA-Z0-9\s]/g, '');
    const inputElement = event.target;
    inputElement.value = this.line1;
    const inputEvent = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(inputEvent);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  

  
}
