import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';
import { roomObjClass } from 'src/model/admin';

@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrls: ['./newbooking.component.css']
})
export class NewbookingComponent {

  bookingForm: FormGroup;
  RoomDetailArray: roomObjClass[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService, private service: UserService, private ActivatedRoutes: ActivatedRoute) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    this.bookingForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      identity_type: ['', Validators.required],
      intime: [formattedTime, Validators.required],
      date: [formattedDate, Validators.required],
      outtime: ['', Validators.required],
      roomDetails: this.fb.group({
        room_number: ['', Validators.required],
        duration: ['', Validators.required],
        is_ac: [false],
        amount: ['', Validators.required]
      }),
      relatedCustomer: this.fb.group({
        name: ['', Validators.required],
        idenetityType: ['', Validators.required]
      }),
      bookingDate: [formattedDate, Validators.required],
      remark: [''],
      payments: this.fb.array([this.createPayment()]),
      relatedFile: [null],
      customerFile: [null]
    });
  }

  ngOnInit(): void { 
   
    this.GetRoom()
  }


  GetRoom() {
    this.service.GetAllRoomDetailFun().subscribe((res) => {
      console.log('AllRoom', res);
      if (res.response != null) {
        this.RoomDetailArray = res?.response;
        this.RoomDetailArray = this.RoomDetailArray.filter(room => room.roomStatus === 'AVAILABLE');
        this.RoomDetailArray.reverse();
      } else {
      }
      console.log('result data room', this.RoomDetailArray);
    });
  }

  onRoomChange() {
    this.updateAmount();
  }

  onDurationChange() {
    this.updateAmount();
  }

  onAcChange() {
    this.updateAmount();
  }

  updateAmount() {
    const roomNumber = this.bookingForm.get('roomDetails.room_number')?.value;
    const duration = this.bookingForm.get('roomDetails.duration')?.value as keyof typeof this.RoomDetailArray[0]['acPrice'];
    const isAc = this.bookingForm.get('roomDetails.is_ac')?.value;

    console.log(roomNumber);
    console.log(duration);
    console.log(isAc);

    const selectedRoom = this.RoomDetailArray.find(room => room.room_number === roomNumber);
    if (selectedRoom) {
      let price;
      if (isAc) {
        price = selectedRoom.acPrice[duration];
      } else {
        price = selectedRoom.nonacPrice[duration];
      }
      this.bookingForm.get('roomDetails.amount')?.setValue(price);
    } else {
      this.bookingForm.get('roomDetails.amount')?.setValue('');
    }
  }



  createPayment(): FormGroup {
    return this.fb.group({
      amount: [''],
      type: ['']
    });
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.bookingForm.get(controlName)?.setValue(input.files);
    }
  }

  get payments(): FormArray {
    return this.bookingForm.get('payments') as FormArray;
  }

  onSubmit(): void {
    const formData = new FormData();

    console.log("bookingValue 55", this.bookingForm.value);

    // Append form fields to FormData
    Object.keys(this.bookingForm.controls).forEach(key => {
      const control = this.bookingForm.get(key);
      if (control) {
        const value = control.value;
        if (key === 'roomDetails' || key === 'relatedCustomer') {
          if (value) {
              Object.keys(value).forEach(subKey => {
                  formData.append(`${key}.${subKey}`, value[subKey]);
              });
          }
      } else if (key === 'payments') {
          const payments = this.bookingForm.get('payments') as FormArray;
          if (payments) {
            payments.controls.forEach((payment, index) => {
              const amount = payment.get('amount')?.value;
              const type = payment.get('type')?.value;
              if (amount && type) {
                formData.append(`payments[${index}].amount`, amount);
                formData.append(`payments[${index}].type`, type);
              }
            });
          }
        } else if (key === 'relatedFile' || key === 'customerFile') {
          const files = value as FileList;
          if (files) {
            for (let i = 0; i < files.length; i++) {
              formData.append(`${key}[]`, files[i]);
            }
          }
        } else {
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        }
      }
    });



   
    // Log all values of FormData for completeness
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
  });


    // Send data to API
    this.http.post('http://localhost:1098/hotel_booking/v1/user/order/saveAllOrder', formData)
      .subscribe(response => {
        const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        console.log('Response:', response);
      }, error => {
        console.error('Error:', error);
      });
  }

  

}
