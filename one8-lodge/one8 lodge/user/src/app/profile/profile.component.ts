import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotleservicesService } from '../hotleservices.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  identityTypes = ['ADHARCARD', 'PANCARD', 'DRIVING_LICENCE'];
  profileImage: string | undefined;
  customerId!: any;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotleservicesService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      customer_id: [{ value: '', disabled: true }, Validators.required],
      customer_name: ['', Validators.required],
      customer_email: ['', [Validators.required, Validators.email]],
      customer_mobile: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      identity_type: [''],
      identity_number: ['', Validators.required],
      file: [null]
    });

    this.customerId = localStorage.getItem('logincustomerId')
    this.loadCustomerData();
  }

  loadCustomerData(): void {
    const customerId = localStorage.getItem('logincustomerId');
    console.log("ID For Profile", customerId);
    
    if (customerId) {
      this.hotelService.getCustomerById(customerId).subscribe(
        data => {
          this.profileForm.patchValue({
            customer_name: data.response.customer_name,
            customer_email: data.response.customer_email,
            customer_mobile: data.response.customer_mobile,
            identity_type: data.response.identity_type,
            identity_number: data.response.idenetity_number,

          });
          this.profileImage = data.response.image_link;
          console.log("Result", data);
          
        },
        
        error => {
          console.error('Error fetching customer data', error);
        }
      );
    }
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
    console.log("File", this.selectedFile);
    
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('customer_id', this.customerId);
      formData.append('customer_name', this.profileForm.get('customer_name')?.value);
      formData.append('customer_email', this.profileForm.get('customer_email')?.value);
      formData.append('customer_mobile', this.profileForm.get('customer_mobile')?.value);
      formData.append('identity_type', this.profileForm.get('identity_type')?.value);
      formData.append('identity_number', this.profileForm.get('identity_number')?.value);
  
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
  
      this.hotelService.updateCustomerProfile(formData).subscribe(
        response => {
          console.log('Profile updated successfully', response);
          this.loadCustomerData();
          this.toastr.success(response.message);
          // Navigate or show success message
        },
        error => {
          console.error('Error updating profile', error);
          this.toastr.error('Error updating profile');
        }
      );
    }
  }
  
}
