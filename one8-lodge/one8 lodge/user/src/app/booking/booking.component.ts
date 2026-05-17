import { Booking } from './../models/customer';
import { Component, EventEmitter, Output } from '@angular/core';
import { HotleservicesService } from '../hotleservices.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  bookings: Booking[] = [];
  userId: number | null = null;
  message: boolean = false;
  userMobStr: any;

  mobileNumber: any = '';

  @Output() mobileNumberSubmit = new EventEmitter<string>();

  modalForm!: FormGroup;
  isModalOpen = true;
  dontshowmodel: any;

  constructor(
    private service: HotleservicesService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.modalForm = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });
  }

  ngOnInit(): void {
    this.dontshowmodel = localStorage.getItem('Booking Number');
  
    if (this.dontshowmodel) {
      this.closeModal();
      this.getUserBookings();
    }
  }

  getUserBookings(): void {

    const mobileNo = this.dontshowmodel;

    this.service.getUserBookings(mobileNo).subscribe(
      (res: any) => {
        console.log('Response from API:', res);

        if (res.status && res.response.length > 0) {
          this.bookings = res.response;
          this.message = false;
        } else {
          this.bookings = [];
          this.message = true;
        }
        console.log('Response array:', this.bookings);
      },
      (error) => {
        console.error('Error fetching bookings:', error);
        this.bookings = [];
        this.message = true;
      }
    );
  }

  getStatus(order: any): string {
    return order.paid_amount === 0 ? 'Pending' : 'Paid';
  }

  payment(id: any) {
    console.log('order id', id);
    this.router.navigate(['/payment', id]);
  }

  onModalSubmit(): void {
    // if (this.modalForm.valid) {
    // const mobileNumber = this.modalForm.get('mobileNumber')?.value;
    // localStorage.setItem('Booking Number', mobileNumber);
    //  this.closeModal();
    // }



    if (this.modalForm.valid) {
      const mobileNumber = this.modalForm.get('mobileNumber')?.value;
      localStorage.setItem('Booking Number', mobileNumber);
      
      this.closeModal();
      this.ngOnInit();

      // setTimeout(() => {
      //   this.getUserBookings();
      // }, 0);
    }

}



closeModal() {
  this.isModalOpen = false;
}
}
