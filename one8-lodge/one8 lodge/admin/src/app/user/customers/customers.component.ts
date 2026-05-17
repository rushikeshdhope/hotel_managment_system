import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { roomObjClass } from 'src/model/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  // customerForm: FormGroup;
  // BookRoomForm: FormGroup;
  selectedFile: File | null = null;
  customerTable: boolean = false;
  customerFormContainer: boolean = true;
  allCustomerArray: any[] = [];
  SearchCustomerArray: any[] = [];
  RoomDetailArray: roomObjClass[] = [];

  bookForm: boolean = false;
  page: number = 0;
  size: number = 10;
  Mob_No: number = 0;
  selectedCustomerIds: number[] = [];
  searchCriteria: string[] = ['mob_no', 'Name', 'adhar_no'];
  selectedCriteria: string = 'mob_no';
  searchValue: string = '';
  hasNextPage: boolean = true;
  Date = new Date();

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // this.customerForm = this.fb.group({
    //   customer_name: ['', Validators.required],
    //   customer_mobile: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)],],
    //   customer_email: ['', [Validators.required, Validators.email]],
    //   identity_type: ['', Validators.required],
    //   idenetity_number: ['', Validators.required],
    //   file: [null, Validators.required],
    // });
    // this.BookRoomForm = this.fb.group({
    //   intime: ['', Validators.required],
    //   outtime: ['', [Validators.required]],
    //   expectedTime: [''],
    //   customer_id: ['', [Validators.required]],
    //   noOfCount: ['', [Validators.required]],
    //   date: ['', [Validators.required]],

    //   roomDetails: this.fb.group({
    //     room_number: ['', Validators.required],
    //     duration: ['', Validators.required],
    //     is_ac: [''],
    //     amount: ['', Validators.required],
    //   }),
    // });
  }

  
  getAllCustomers(page: number, size: number) {
    this.service.showLoader();
    this.service.getAllCustomers(page, size).subscribe(
      (res) => {
       
        console.log('customer data', res);
        this.service.hideLoader();

        if (res.response && res.response.content != null) {
          this.allCustomerArray = res.response.content;
          // Check if the returned array has fewer items than the requested size
          this.hasNextPage = this.allCustomerArray.length === this.size;
        } else {
          this.allCustomerArray = [];
          this.hasNextPage = false;
          console.log('current array', this.allCustomerArray);
        }
      },
      (error) => {
        console.error('Error fetching customer data', error);
        this.allCustomerArray = [];
        this.hasNextPage = false;
      }
    );
  }

  previousPage() {
    if (this.page >= 1) {
      this.page--;
      this.getAllCustomers(this.page, this.size);
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.page++;
      this.getAllCustomers(this.page, this.size);
    }
  }

  // Back() {
  //   this.clearState();
  // }

  // ngOnDestroy() {
  //   this.clearState();
  // }
  // private clearState() {
  //   sessionStorage.removeItem('customer');
  //   sessionStorage.removeItem('bookForm');
  //   sessionStorage.removeItem('customerFormContainer');
  //   sessionStorage.removeItem('customerTable');
  // }

  // private saveState() {
  //   const state = {
  //     bookForm: this.bookForm,
  //     customerFormContainer: this.customerFormContainer,
  //     customerTable: this.customerTable,
  //   };
  //   sessionStorage.setItem('customer', JSON.stringify(state));
  // }

  // private loadState() {
  //   const state = sessionStorage.getItem('customer');
  //   if (state) {
  //     const parsedState = JSON.parse(state);
  //     this.bookForm = parsedState.bookForm;
  //     this.customerFormContainer = parsedState.customerFormContainer;
  //     this.customerTable = parsedState.customerTable;
  //   }
  // }

  ngOnInit(): void {
    // this.loadState();
    //  this.GetRoom();
     this.getAllCustomers(this.page, this.size);
  }

//   formData = new FormData();
//   onFileChange(event: any): void {
//     const file = event.target.files?.[0];
//     console.log(file);

//     if (file) {
//       this.customerForm.patchValue({
//         file: file,
//       });
//       this.customerForm.get('file')?.updateValueAndValidity();
//     }
//   }

//   OpenCustomerContainer() {
//     this.customerTable = true;
//     this.customerFormContainer = false;
//     this.bookForm = false;
//     this.saveState();

//     this.getAllCustomers(this.page, this.size);
//   }

//   // onSubmit() {
//   //   console.log(this.BookRoomForm.value.intime);
//   //   console.log(this.BookRoomForm.value.outtime);
//   //   console.log(this.BookRoomForm.value.customer_id);
//   //   console.log(this.BookRoomForm.value.roomDetails.room_id);
//   //   console.log(this.BookRoomForm.value.roomDetails.is_ac);
//   //   console.log(this.BookRoomForm.value.roomDetails.amount);
//   //   // console.log(this.BookRoomForm.value.file)

//   //   if (this.customerForm.valid) {
//   //     const formData = new FormData();
//   //     formData.append('customer_name', this.customerForm.value.customer_name);
//   //     formData.append('customer_mobile',this.customerForm.value.customer_mobile);
//   //     formData.append('customer_email', this.customerForm.value.customer_email);
//   //     formData.append('identity_type', this.customerForm.value.identity_type);
//   //     formData.append('idenetity_number',this.customerForm.value.idenetity_number);
//   //     formData.append('file', this.customerForm.value.file);
//   //     this.service.InsertCustomer(formData).subscribe((res) => {
//   //       console.log(res);
//   //       if (res.message == 'CUSTOMER REGISTER SUCCESFULLY') {
//   //         this.customerForm.reset();
//   //         this.customerForm.get('file')!.setValue(null);

//   //         this.fileInput.nativeElement.value = '';
//   //         this.toastr.success(res.message);
//   //       } else {
//   //         this.toastr.error(res.message);
//   //       }
//   //     });
//   //     // Perform the form submission logic here (e.g., HTTP request)
//   //     console.log('Form Submitted', formData);
//   //   } else {
//   //     this.toastr.error('Please fill all the required fields');
//   //     // console.log('Form is invalid');
//   //   }
//   // }

//   onACChange(value: boolean) {
//     console.log('ac s res', this.RoomDetailArray);

//     this.BookRoomForm.patchValue({ is_ac: value });

//     // const roomNumber = this.BookRoomForm.get('roomDetails.room_number')?.value;
//     // const Duration = this.BookRoomForm.get('roomDetails.duration')?.value;
//     // console.log('Room Number:', roomNumber);
//     // console.log('Duration:', Duration);
//     console.log('value:', value);

//     // const room = this.RoomDetailArray.find((room) => room.room_id === roomNumber  );

//     const roomNumber = this.BookRoomForm.get('roomDetails.room_number')?.value;
//     const Duration = this.BookRoomForm.get('roomDetails.duration')?.value;
//     const room = this.RoomDetailArray.find(
//       (room) => room.room_number === roomNumber
//     );

//     if (value == true) {
//       if (room) {
//         console.log('roomdata', room);
//         console.log('dura', Duration);

//         const price = room.acPrice[Duration as keyof typeof room.acPrice];
//         this.BookRoomForm.get('roomDetails.amount')?.setValue(price);
//         console.log(`AC Price for ${Duration}:`, price);
//       } else {
//         console.log('Room not found.');
//       }
//     } else {
//       if (room) {
//         console.log('roomdata', room);
//         console.log('dura', Duration);

//         const price = room.nonacPrice[Duration as keyof typeof room.nonacPrice];
//         this.BookRoomForm.get('roomDetails.amount')?.setValue(price);
//         console.log(`AC Price for ${Duration}:`, price);
//       } else {
//         console.log('Room not found.');
//       }
//     }

//     //console.log("filter",room);
//   }


// //   onSubmitBookRoom() {
// //     console.log('1', this.BookRoomForm.value);

    

// //     const formDataWithoutCustomerId = { ...this.BookRoomForm.value };

// //     // Remove customer_id from the form data if it exists
// //     delete formDataWithoutCustomerId.customer_id;

// //     const requestData = {
// //       ...formDataWithoutCustomerId,
// //       customers_id: this.selectedCustomerIds,
// //     };
// //     console.log('Request Data', requestData);

// //     this.service.BookRoom(requestData).subscribe((res) => {
// //       console.log(res);

// //       if (res.message == 'ORDER SAVE SUCCESFULLY') {
// //         this.BookRoomForm.reset();

// //         this.bookForm = false;
// //         this.customerForm.reset();
// //         this.toastr.success(res.message);
// //       } else {
// //         this.toastr.error(res.message);
// //       }
// //     });
  
// // }

//   onCustomerSelect(event: any) {
//     const options = event.target.options;
//     // this.selectedCustomerIds = [];
//     for (const option of options) {
//       if (option.selected) {
//         this.selectedCustomerIds.push(Number(option.value));
//       }
//     }
//     console.log('Selected Customer IDs', this.selectedCustomerIds);
//   }

//   GetRoom() {
//     this.service.GetAllRoomDetailFun().subscribe((res) => {
//       console.log('AllRoom', res);



//       if (res.response != null) {
//         this.RoomDetailArray = res?.response;
//         this.RoomDetailArray = this.RoomDetailArray.filter(room => room.roomStatus === 'AVAILABLE');

//         this.RoomDetailArray.reverse();
//       } else {
//       }
//       console.log('result data room', this.RoomDetailArray);
//     });
//   }

//   BooKRooMFun() {
//     // data : any
//     this.bookForm = true;

//     this.customerFormContainer = false;
//     // console.log("for edit data",data);
//     this.customerTable = false;
//     this.saveState();
//     // this.customerFormContainer=true;
//     //  this.GetRoom()
//     //   this.customerForm.patchValue({
//     //     customer_name:data.customer_name,
//     //     customer_mobile:data.customer_mobile,
//     //     customer_email:data.customer_email,
//     //     identity_type:data.identity_type,
//     //     idenetity_number:data.idenetity_number,

//     //     file:data.file

//     //   })

//     this.BookRoomForm.patchValue({
//       // customer_id: data.customer_id
//     });
//     console.log('BookRoomForm', this.BookRoomForm.value);
//   }

  NavigateBookings() {
    this.router.navigate(['/bookings']);
  }

//   BookRoom() {}
//   GetInsertedAdhar(event: any) {
//     this.Mob_No = event.target.value;
//     console.log('adhar', this.Mob_No);

//     this.service.getCustomersUsingMob(this.Mob_No).subscribe((res) => {
//       console.log('mob res', res);

//       if (res.response != null) {
//         this.SearchCustomerArray = res.response;
//         console.log('SearchCustomerArray', this.SearchCustomerArray);
//       } else {
//         this.SearchCustomerArray = [];
//       }
//     });
//   }

  onCriteriaChange(event: any) {
    this.selectedCriteria = event.target.value;
    console.log('selected ', this.selectedCriteria);
  }

  onSearch() {
    this.service.showLoader();
    if (this.searchValue.trim()) {
      this.service.search(this.selectedCriteria, this.searchValue).subscribe(
        (results) => {
          this.service.hideLoader();
          console.log('Search results:', results);
          this.allCustomerArray = results.response;
          // Handle search results (e.g., display them in the UI)
        },
        (error) => {
          console.error('Search error:', error);
        }
      );
    }
  }

  navigateBookRoom(id : number){
    this.router.navigate(['/userDashboardRoute','customer',id]);
    // this.router.navigate(['/newBooking','customer',id]);
  }
}
