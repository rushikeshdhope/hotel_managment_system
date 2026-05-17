import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute, Router } from '@angular/router';
import { roomObjClass } from 'src/model/admin';
import { UserService } from '../user.service';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

interface Payment {
  amount: string;
  type: string;
}

@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrls: ['./newbooking.component.css'],
})
export class NewbookingComponent {
  Room_No: number = 0;
  customerId: number = 0;
  type: any = '';
  discountPercentages: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];

  bookingForm: FormGroup;
  RoomDetailArray: roomObjClass[] = [];
  useCustomerWebcam: boolean = false;
  useRelatedWebcam: boolean = false;
  customerTriggerObservable: Subject<void> = new Subject<void>();
  relatedTriggerObservable: Subject<void> = new Subject<void>();
  customerWebcamImages: WebcamImage[] = [];
  relatedWebcamImages: WebcamImage[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private service: UserService,
    private ActivatedRoutes: ActivatedRoute,
    private router: Router
  ) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    this.bookingForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_id: [''],
      customer_mobile: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      identity_type: [''],
      intime: [formattedTime, Validators.required],
      date: [formattedDate, Validators.required],
      advance_amount: [''],
      orderStatus: ['ACCEPT'],
      order_id: [''],
      extra_amount: [''],

      outtime: [''],
      roomDetails: this.fb.group({
        room_number: ['', Validators.required],
        duration: ['', Validators.required],
        is_ac: [false],
        amount: ['', Validators.required],
        discount: [null],
        discountableAmount: [{ value: 0, disabled: true }],
      }),
      relatedCustomer: this.fb.group({
        name: [''],
        idenetityType: [''],
      }),
      bookingDate: [formattedDate, Validators.required],
      remark: [''],
      payments: this.fb.array([this.createPayment()]),
      relatedFile: [null],
      customerFile: [null],
      manualBooking: [false],
    });
    this.bookingForm
      .get('manualBooking')
      ?.valueChanges.subscribe((isChecked) => {
        this.updateOrderStatus(isChecked);
      });

    this.bookingForm
      .get('roomDetails.discount')
      ?.valueChanges.subscribe((discount) => {
        this.calculateDiscountedAmount(discount);
      });
  }

  ngOnInit(): void {
    this.GetRoom();

    this.ActivatedRoutes.params.subscribe((params) => {
      this.Room_No = Number(params['RoomNumber']);
      this.customerId = Number(params['CustomerId']);

      this.type = params['type'];

      if (this.RoomDetailArray.length > 0) {
        this.handleParams();
      } else {
        this.service.GetAllRoomDetailFun().subscribe((res) => {
          if (res.response != null) {
            this.RoomDetailArray = res.response;
            this.RoomDetailArray.reverse();
            this.handleParams();
          }
        });
      }
    });
  }

  handleParams() {
    if (this.type === 'room') {
      this.bookingForm.patchValue({
        roomDetails: {
          room_number: this.Room_No,
        },
      });
    } else if (this.type === 'order') {
      this.getOrderByOrderId();
    } else if (this.type === 'customer') {
      this.getCustomer();

      this.bookingForm.patchValue({
        roomDetails: {
          room_number: this.Room_No,
        },
      });
    }
  }

  calculateDiscountedAmount(discount: number): void {
    const amount = this.bookingForm.get('roomDetails.amount')?.value;

    if (amount && discount) {
      const roundedAmount = Math.round(amount);

      const discountAmount = (roundedAmount * discount) / 100;
      const discountedAmount = roundedAmount - discountAmount;

      this.bookingForm
        .get('roomDetails.discountableAmount')
        ?.setValue(discountedAmount);
      this.bookingForm.get('advance_amount')?.setValue(discountAmount);
    }
  }

  getOrderByOrderId() {
    this.service.getOrderOrderId(this.customerId).subscribe((res: any) => {
      if (res.response != null) {
        this.bookingForm.patchValue({
          customer_name: res.response.customers1Dto.customer_name,
          customer_mobile: res.response.customers1Dto.customer_mobile,
          customer_id: res.response.customers1Dto.customer_id,
          identity_type: res.response.customers1Dto.identity_type,
          intime: res.response.order1dto.intime,
          date: res.response.order1dto.date,
          order_id: res.response.order1dto.order_id,

          roomDetails: {
            room_number: res.response.order1dto.roomDetails.room_number,
            duration: res.response.order1dto.roomDetails.duration,
            is_ac: res.response.order1dto.roomDetails.is_ac,
            amount: res.response.order1dto.roomDetails.amount,
          },
          relatedCustomer: {
            name: res.response.relatedCustomer?.name || '',
            idenetityType: res.response.relatedCustomer?.idenetityType || '',
          },
          bookingDate: res.response.order1dto.bookingDate,
          remark: res.response.order1dto.remark,

          relatedFile: res.response.relatedFile,
          customerFile: res.response.customerFile,
          manualBooking: res.response.manualBooking,
        });
      }
    });
  }

  updateOrderStatus(isChecked: boolean) {
    if (isChecked) {
      this.bookingForm.patchValue({ orderStatus: 'MANUAL' });
    } else {
      this.bookingForm.patchValue({ orderStatus: 'ACCEPT' });
    }
  }

  getCustomer() {
    this.service.GetCustomerById(this.customerId).subscribe((res: any) => {
      if (res.response != null) {
        const customer = res.response.customers;
        const relatedCustomerDTOs = res.response.relatedCustomerDTOs;

        this.bookingForm.patchValue({
          customer_name: customer.customer_name,
          customer_mobile: customer.customer_mobile,
          customer_email: customer.customer_email,
          idenetity_number: customer.idenetity_number || '',
          dob: customer.dob || '',
          customer_id: customer.customer_id,
          identity_type: customer.identity_type,
          customerFile: customer.images || [],
        });
      }
    });
  }

  GetRoom() {
    this.service.GetAllRoomDetailFun().subscribe((res) => {
      if (res.response != null) {
        this.RoomDetailArray = res?.response;

        this.RoomDetailArray.reverse();
        this.onRoomChange();
      } else {
      }
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

    const duration = this.bookingForm.get('roomDetails.duration')
      ?.value as keyof (typeof this.RoomDetailArray)[0]['acPrice'];
    const isAc = this.bookingForm.get('roomDetails.is_ac')?.value;

    const selectedRoom = this.RoomDetailArray.find(
      (room) => room.room_number === roomNumber
    );

    if (selectedRoom) {
      let price;
      if (isAc) {
        if (selectedRoom.acPrice != null) {
          price = selectedRoom.acPrice[duration];
        } else {
          this.toastr.error('Ac Value not present..  Select non AC');
        }
      } else {
        if (selectedRoom.nonacPrice != null) {
          price = selectedRoom.nonacPrice[duration];
        } else {
          this.toastr.error('Non AC Value not present..  Select  AC');
        }
      }
      this.bookingForm.get('roomDetails.amount')?.setValue(price);
    } else {
      this.bookingForm.get('roomDetails.amount')?.setValue('');
    }
  }

  createPayment(): FormGroup {
    return this.fb.group({
      amount: [''],
      type: [''],
    });
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const filesArray = Array.from(input.files);

      const existingFiles = this.bookingForm.get(controlName)?.value || [];
      this.bookingForm
        .get(controlName)
        ?.setValue([...existingFiles, ...filesArray]);
    }
  }

  get payments(): FormArray {
    return this.bookingForm.get('payments') as FormArray;
  }

  onSubmit(): void {
    let formData = new FormData();

    if (this.bookingForm.valid) {
      this.service.showLoader();

      Object.keys(this.bookingForm.controls).forEach((key) => {
        const control = this.bookingForm.get(key);
        if (control) {
          const value = control.value;

          if (key === 'roomDetails') {
            if (value) {
              Object.keys(value).forEach((subKey) => {
                if (subKey !== 'discount' && subKey !== 'discountableAmount') {
                  formData.append(`${key}.${subKey}`, value[subKey]);
                }
              });
            }
          } else if (key === 'relatedCustomer') {
            if (value) {
              Object.keys(value).forEach((subKey) => {
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
            const files = value as File[];
            if (files && files.length > 0) {
              files.forEach((file) => {
                formData.append(`${key}`, file);
              });
            }
          } else {
            if (value !== null && value !== undefined) {
              formData.append(key, value);
            }
          }
        }
      });

      formData.forEach((value, key) => {});

      this.http
        .post(
          'http://localhost:1098/hotel_booking/v1/user/order/saveAllOrder',
          formData
        )
        .subscribe(
          (response: any) => {
            this.service.hideLoader();
            if (
              response.message === 'ORDER SAVE SUCCESFULLY' ||
              response.message === 'ORDER UPDATE SUCCESFULLY'
            ) {
              formData = new FormData();

              this.toastr.success(response.message);
              this.bookingForm.reset();
              this.useCustomerWebcam = false;
              this.customerWebcamImages = [];
              this.useRelatedWebcam = false;
              this.relatedWebcamImages = [];
              this.router.navigate(['/bookings']);
            } else {
              this.toastr.error(response.message);
            }
          },
          (error) => {
            console.error('Error:', error);
            this.service.hideLoader();
          }
        );
    } else {
      const invalidFields = this.getInvalidFields();
      this.toastr.error(
        `Please fill the following fields: ${invalidFields.join(', ')}`
      );
    }
  }

  private getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    Object.keys(this.bookingForm.controls).forEach((key) => {
      const control = this.bookingForm.get(key);
      if (control instanceof FormArray) {
        (control as FormArray).controls.forEach(
          (abstractControl, index: number) => {
            const group = abstractControl as FormGroup;
            Object.keys(group.controls).forEach((subKey) => {
              const subControl = group.get(subKey);
              if (subControl?.invalid) {
                invalidFields.push(`Related Customer ${index + 1} ${subKey}`);
              }
            });
          }
        );
      } else if (control?.invalid) {
        invalidFields.push(key);
      }
    });
    return invalidFields;
  }

  toggleCustomerWebcamOption() {
    this.useCustomerWebcam = !this.useCustomerWebcam;
  }

  toggleRelatedWebcamOption() {
    this.useRelatedWebcam = !this.useRelatedWebcam;
  }

  triggerCustomerSnapshot(): void {
    this.customerTriggerObservable.next();
  }

  triggerRelatedSnapshot(): void {
    this.relatedTriggerObservable.next();
  }

  public handleCustomerImage(webcamImage: WebcamImage): void {
    this.customerWebcamImages.push(webcamImage);
    this.updateCustomerFormFiles();
  }

  public removeCustomerImage(index: number): void {
    this.customerWebcamImages.splice(index, 1);
    this.updateCustomerFormFiles();
  }

  public handleRelatedImage(webcamImage: WebcamImage): void {
    this.relatedWebcamImages.push(webcamImage);
    this.updateRelatedFormFiles();
  }

  public removeRelatedImage(index: number): void {
    this.relatedWebcamImages.splice(index, 1);
    this.updateRelatedFormFiles();
  }

  private updateCustomerFormFiles(): void {
    const imageFiles = this.customerWebcamImages.map((img, index) => {
      const imageBlob = this.dataURItoBlob(img.imageAsDataUrl);
      return new File([imageBlob], `webcam-image-customer-${index}.png`, {
        type: 'image/png',
      });
    });

    const existingFiles = this.bookingForm.get('customerFile')?.value || [];
    this.bookingForm.patchValue({ customerFile: [...imageFiles] });
  }

  private updateRelatedFormFiles(): void {
    const imageFiles = this.relatedWebcamImages.map((img, index) => {
      const imageBlob = this.dataURItoBlob(img.imageAsDataUrl);
      return new File([imageBlob], `webcam-image-related-${index}.png`, {
        type: 'image/png',
      });
    });

    this.bookingForm.patchValue({ relatedFile: [...imageFiles] });
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }
}
