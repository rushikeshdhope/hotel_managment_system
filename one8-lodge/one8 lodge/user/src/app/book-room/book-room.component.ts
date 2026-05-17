import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { roomObjClass } from '../models/customer';
import { HotleservicesService } from '../hotleservices.service';
import * as Aos from 'aos';



@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {
  mobileNumber: string = '';

  @Output() mobileNumberSubmit = new EventEmitter<string>();


  modalForm: FormGroup | any;
  isModalOpen = true; 
  bookingForm: FormGroup;
  RoomDetailArray: roomObjClass[] = [];
  order_id: any;
  total_amount: any;
  isRoomNumberDisabled: boolean = false;
  room: any;
  mobileForm: any;
  dontshowmodel: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService, private service: HotleservicesService, private ActivatedRoutes: ActivatedRoute,private router:Router) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
    this.modalForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.bookingForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      // identity_type: ['', Validators.required],
      intime: ['', Validators.required],
      date: [formattedDate, Validators.required],
      outtime: ['', Validators.required],
      roomDetails: this.fb.group({
        room_number: ['', Validators.required],
        duration: ['', Validators.required],
        is_ac: [false],
        amount: ['', Validators.required]
      }),
      // relatedCustomer: this.fb.group({
      //   name: ['', Validators.required],
      //   idenetityType: ['', Validators.required]
      // }),
      bookingDate: [formattedDate, Validators.required],
      remark: [''],
      payments: this.fb.array([this.createPayment()]),
      // relatedFile: [null],
      // customerFile: [null]
    });
  }

  ngOnInit(): void { 
   
    this.dontshowmodel = localStorage.getItem("Booking Number")
    if(this.dontshowmodel){
      this.closeModal();
      this.bookingForm.patchValue({ customer_mobile: this.dontshowmodel });
    }


    Aos.init();

    this.ActivatedRoutes.params.subscribe(params => {
      const room_no = params['room_no'];
      this.room = params['room_no'];
      console.log('Route Room Number:', room_no);

      if (room_no && room_no !== '0') {
        this.isRoomNumberDisabled = true;
        this.bookingForm.patchValue({
          roomDetails: {
            room_number: room_no,
          },
        });

        this.service.GetAllRoomDetailFun().subscribe((res) => {
          console.log('AllRoom', res);
          if (res.response != null) {
            this.RoomDetailArray = res?.response;
              this.RoomDetailArray = this.RoomDetailArray.filter(room => room.room_number == room_no);
              console.log("routed room in array", this.RoomDetailArray);
            this.RoomDetailArray.reverse();
          } else {
          }
          console.log('result data room', this.RoomDetailArray);
        });
        this.RoomDetailArray = this.RoomDetailArray.filter(room => room.roomStatus === 'AVAILABLE');
        console.log("Patched Room Number:", this.RoomDetailArray);
      } else {
        this.GetRoom();
      }
    });
  }


  GetRoom() {
    this.service.GetAllRoomDetailFun().subscribe((res) => {
      console.log('AllRoom', res);
      if (res.response != null) {
        this.RoomDetailArray = res?.response;
          // this.RoomDetailArray = this.RoomDetailArray.filter(room => room.roomStatus === 'AVAILABLE');
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

    const selectedRoom = this.RoomDetailArray.find(room => room.room_number == roomNumber);
    console.log("selected room", selectedRoom);
    
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
    if (this.bookingForm.valid) {

    
    const formData = new FormData();

    console.log("bookingValue", this.bookingForm.value);  
    
   const customerMobile = this.bookingForm.get('customer_mobile')?.value;


    localStorage.setItem('customer_mobile', customerMobile);

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
    this.http.post('https://cloudepe.mahaapp.online/one8lodge/hotel_booking/v1/user/order/saveAllOrder', formData)
      .subscribe((response:any) => {
        console.log('Form submitted successfully', response);
        console.log('Response:', response);
        this.toastr.success(response.message);
        this.bookingForm.reset();
        this.total_amount = response.response.order1dto.totalAmount
        localStorage.setItem("amount",this.total_amount)
        console.log("amount",this.total_amount);
         this.order_id = response.response.order1dto.order_id
         window.alert('Booking is sent to Admin for Approval');
         this.router.navigate(['/booking']);
        // console.log("order id", this.order_id);
        // this.router.navigate(['/payment', this.order_id]); 
      }, error => {
        console.error('Error:', error);
      });
  
}
else {
      if (this.bookingForm.invalid) {
        this.bookingForm.markAllAsTouched();
        console.log(this.bookingForm);
      }
    }

  
  }

  onModalSubmit(): void {
    if (this.modalForm.valid) {
      const mobileNumber = this.modalForm.get('mobileNumber')?.value;
      localStorage.setItem("Booking Number", mobileNumber)
      this.bookingForm.patchValue({ customer_mobile: mobileNumber });

      this.closeModal();
    }
  }


  closeModal() {
    this.isModalOpen = false;

  }
  
}
