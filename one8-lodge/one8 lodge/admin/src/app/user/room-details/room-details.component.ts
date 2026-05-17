import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { roomObjClass } from 'src/model/admin';
import { UserService } from '../user.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit {
  catId: number = 0;
  AddNewRoomContainer: boolean = false;
  newRoomForm: FormGroup;
  editmode: boolean = false;
  RoomDetailArray: roomObjClass[] = [];
  categoryName: string = '';
  constructor(
    private ActivatedRoutes: ActivatedRoute,
    private service: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.newRoomForm = this.fb.group({
      room_number: ['', [Validators.required]],
      room_category_id: [''],
      description: [''],
      room_id: [''],
      files: [null],

      acPrice: this.fb.group({
        three_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        six_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        nine_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        twelve_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        sixteen_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        twentyfour_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        full_night: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
      }),
      nonacPrice: this.fb.group({
        three_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        six_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        nine_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        twelve_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        sixteen_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        twentyfour_hour: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
        full_night: [
          '',
          [Validators.maxLength(5), Validators.pattern('^[0-9]*$')],
        ],
      }),

      roomStatus: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.ActivatedRoutes.params.subscribe((params) => {
      this.catId = params['id'];
    });
    this.GetRoom();
    this.GetRoomCat();
  }

  OnImageSelect(event: any, roomId: number) {
    this.service.showLoader();
    if (event.target.files.length > 0) {
      const formData = new FormData();

      // Append roomId to the FormData object
      formData.append('roomId', roomId.toString());

      // Append each selected file to the FormData object
      for (let i = 0; i < event.target.files.length; i++) {
        formData.append('files', event.target.files[i]);
      }

      // Now you can send the formData to your API
      this.uploadImages(formData);
    }
  }

  uploadImages(formData: FormData) {
    this.service.showLoader();
    this.service.roomImageSave(formData).subscribe(
      (response) => {
        this.service.hideLoader();

        if (response.message == 'ROOM SAVE SUCCESFULLY') {
          this.toastr.success(response.message);
          this.GetRoom();
        } else {
          this.toastr.error(response.message);
        }

        //
      },
      (error) => {
        console.error('Upload failed', error);
      }
    );
  }
  DeleteImages(id: number) {
    this.service.showLoader();
    this.service.roomImageDelete(id).subscribe(
      (response) => {
        this.service.hideLoader();

        if (response.message == 'DELETE ROOM IMAGE SUCCESFULLY') {
          this.toastr.success(response.message);
          this.GetRoom();
        } else {
          this.toastr.error(response.message);
        }

        //
      },
      (error) => {
        console.error('Upload failed', error);
      }
    );
  }

  GetRoomCat() {
    this.service.showLoader();
    this.service.getRoomCatUsingId(this.catId).subscribe((res: any) => {
      this.service.hideLoader();

      this.categoryName = res.response.room_category_name;
    });
  }

  GetRoom() {
    this.service.GetRoomDetailFun(this.catId).subscribe((res) => {
      if (res.response != null) {
        this.RoomDetailArray = res?.response;
        this.RoomDetailArray.reverse();
      } else {
        this.RoomDetailArray = [];
      }
    });
  }

  ClickAddRoom() {
    this.newRoomForm.reset();
    this.AddNewRoomContainer = true;
  }

  closeNav() {
    this.AddNewRoomContainer = false;
    this.editmode = false;
    this.newRoomForm.reset();
  }

  onFileChange(event: any): void {
    const files = event.target.files as FileList;
    if (files) {
      this.formData.delete('files');
      for (let i = 0; i < files.length; i++) {
        this.formData.append('files', files[i]);
      }

      this.newRoomForm.patchValue({
        files: files,
      });
      this.newRoomForm.get('File')?.updateValueAndValidity();
    }
  }
  formData = new FormData();

  AddRoomFunTs() {
    this.service.showLoader();

    this.newRoomForm.get('room_category_id')?.setValue(this.catId);

    let formValue = this.newRoomForm.value;
    let payload: any = {
      room_number: formValue.room_number,
      room_category_id: formValue.room_category_id,
      roomStatus: formValue.roomStatus,
      description: formValue.description,
      File: formValue.File,
    };

    // Conditionally add acPrice to the payload if any of its fields are filled
    if (Object.values(formValue.acPrice).some((value) => value)) {
      payload.acPrice = formValue.acPrice;
    }

    // Conditionally add nonacPrice to the payload if any of its fields are filled
    if (Object.values(formValue.nonacPrice).some((value) => value)) {
      payload.nonacPrice = formValue.nonacPrice;
    }

    // If room_id is present, add it to the payload (used for edit mode)
    if (formValue.room_id) {
      payload.room_id = formValue.room_id;
    }

    // this.formData.append('room_number',payload.room_number);
    // this.formData.append('room_id',payload.room_id);
    //   this.formData.append('acPrice.three_hour',payload.acPrice.three_hour);
    //   this.formData.append('acPrice.six_hour',payload.acPrice.six_hour);
    //   this.formData.append('acPrice.twelve_hour',payload.acPrice.twelve_hour);
    //   this.formData.append('acPrice.sixteen_hour',payload.acPrice.sixteen_hour);
    //   this.formData.append('acPrice.twentyfour_hour',payload.acPrice.twentyfour_hour);
    //   this.formData.append('acPrice.full_night',payload.acPrice.full_night);
    //   this.formData.append('nonacPrice.three_hour',payload.nonacPrice.three_hour);
    //   this.formData.append('nonacPrice.six_hour',payload.nonacPrice.six_hour);
    //   this.formData.append('nonacPrice.twelve_hour',payload.nonacPrice.twelve_hour);
    //   this.formData.append('nonacPrice.sixteen_hour',payload.nonacPrice.sixteen_hour);
    //   this.formData.append('nonacPrice.twentyfour_hour',payload.nonacPrice.twentyfour_hour);
    //   this.formData.append('nonacPrice.full_night',payload.nonacPrice.full_night);
    //   this.formData.append('room_category_id',payload.room_category_id);
    //   this.formData.append('roomStatus',payload.roomStatus);
    //   this.formData.append('description',payload.description);
    //   this.formData.append('File',payload.File);

    if (this.editmode != true) {
      this.formData.append('room_number', payload.room_number);
      //this.formData.append('room_id',payload.room_id);
      if (payload.acPrice) {
        this.formData.append('acPrice.three_hour', payload.acPrice.three_hour);
        this.formData.append('acPrice.six_hour', payload.acPrice.six_hour);
        this.formData.append('acPrice.nine_hour', payload.acPrice.nine_hour);
        this.formData.append(
          'acPrice.twelve_hour',
          payload.acPrice.twelve_hour
        );
        this.formData.append(
          'acPrice.sixteen_hour',
          payload.acPrice.sixteen_hour
        );
        this.formData.append(
          'acPrice.twentyfour_hour',
          payload.acPrice.twentyfour_hour
        );
        this.formData.append('acPrice.full_night', payload.acPrice.full_night);
      }

      // Append non-AC prices
      if (payload.nonacPrice) {
        this.formData.append(
          'nonacPrice.three_hour',
          payload.nonacPrice.three_hour
        );
        this.formData.append(
          'nonacPrice.six_hour',
          payload.nonacPrice.six_hour
        );
        this.formData.append(
          'nonacPrice.nine_hour',
          payload.nonacPrice.nine_hour
        );
        this.formData.append(
          'nonacPrice.twelve_hour',
          payload.nonacPrice.twelve_hour
        );
        this.formData.append(
          'nonacPrice.sixteen_hour',
          payload.nonacPrice.sixteen_hour
        );
        this.formData.append(
          'nonacPrice.twentyfour_hour',
          payload.nonacPrice.twentyfour_hour
        );
        this.formData.append(
          'nonacPrice.full_night',
          payload.nonacPrice.full_night
        );
      }

      this.formData.append('room_category_id', payload.room_category_id);
      this.formData.append('roomStatus', payload.roomStatus);
      this.formData.append('description', payload.description);
      this.formData.append('File', payload.File);

      this.service.SaveRoomDetailFun(this.formData).subscribe((res) => {
        this.service.hideLoader();

        if (res.message == 'ROOM SAVE SUCCESFULLY') {
          this.AddNewRoomContainer = false;
          this.newRoomForm.reset();

          this.GetRoom();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
        this.formData = new FormData();
      });
    } else {
      if (payload.acPrice) {
        this.formData.append('acPrice.three_hour', payload.acPrice.three_hour);
        this.formData.append('acPrice.six_hour', payload.acPrice.six_hour);
        this.formData.append('acPrice.nine_hour', payload.acPrice.nine_hour);
        this.formData.append(
          'acPrice.twelve_hour',
          payload.acPrice.twelve_hour
        );
        this.formData.append(
          'acPrice.sixteen_hour',
          payload.acPrice.sixteen_hour
        );
        this.formData.append(
          'acPrice.twentyfour_hour',
          payload.acPrice.twentyfour_hour
        );
        this.formData.append('acPrice.full_night', payload.acPrice.full_night);
      }

      // Append non-AC prices
      if (payload.nonacPrice) {
        this.formData.append(
          'nonacPrice.three_hour',
          payload.nonacPrice.three_hour
        );
        this.formData.append(
          'nonacPrice.six_hour',
          payload.nonacPrice.six_hour
        );
        this.formData.append(
          'nonacPrice.nine_hour',
          payload.nonacPrice.nine_hour
        );
        this.formData.append(
          'nonacPrice.twelve_hour',
          payload.nonacPrice.twelve_hour
        );
        this.formData.append(
          'nonacPrice.sixteen_hour',
          payload.nonacPrice.sixteen_hour
        );
        this.formData.append(
          'nonacPrice.twentyfour_hour',
          payload.nonacPrice.twentyfour_hour
        );
        this.formData.append(
          'nonacPrice.full_night',
          payload.nonacPrice.full_night
        );
      }
      this.formData.append('room_number', payload.room_number);
      this.formData.append('room_id', payload.room_id);

      this.formData.append('room_category_id', payload.room_category_id);
      this.formData.append('roomStatus', payload.roomStatus);
      this.formData.append('description', payload.description);
      this.formData.append('File', payload.File);

      this.service.SaveRoomDetailFun(this.formData).subscribe((res) => {
        this.service.hideLoader();

        if (res.message == 'ROOM UPDATE SUCCESFULLY') {
          this.AddNewRoomContainer = false;
          this.newRoomForm.reset();
          this.GetRoom();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
        this.formData = new FormData();
      });
    }
  }

  DeleteRoom(Id: number) {
    this.service.showLoader();
    this.service.DeleteRoomDetailFun(Id).subscribe((res) => {
      this.service.hideLoader();

      if (res.message == 'DELETE ROOM SUCCESFULLY') {
        this.AddNewRoomContainer = false;

        this.newRoomForm.reset();
        this.GetRoom();
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  EditRoom(roomData: any) {
    this.editmode = true;
    this.AddNewRoomContainer = true;
    this.newRoomForm.patchValue({
      room_number: roomData.room_number,
      room_category_id: roomData.room_category_id,
      roomStatus: roomData.roomStatus,
      room_id: roomData.room_id,
      description: roomData.description,
    });

    if (roomData.acPrice != null) {
      this.newRoomForm.get('acPrice')!.patchValue({
        three_hour: roomData.acPrice.three_hour,
        six_hour: roomData.acPrice.six_hour,
        nine_hour: roomData.acPrice.nine_hour,
        twelve_hour: roomData.acPrice.twelve_hour,
        sixteen_hour: roomData.acPrice.sixteen_hour,
        twentyfour_hour: roomData.acPrice.twentyfour_hour,
        full_night: roomData.acPrice.full_night,
      });
    } else {
    }
    if (roomData.nonacPrice != null) {
      this.newRoomForm.get('nonacPrice')!.patchValue({
        three_hour: roomData.nonacPrice.three_hour,
        six_hour: roomData.nonacPrice.six_hour,
        nine_hour: roomData.nonacPrice.nine_hour,
        twelve_hour: roomData.nonacPrice.twelve_hour,
        sixteen_hour: roomData.nonacPrice.sixteen_hour,
        twentyfour_hour: roomData.nonacPrice.twentyfour_hour,
        full_night: roomData.nonacPrice.full_night,
      });
    } else {
    }
  }

  navigateRoomForm(id: number) {
    this.router.navigate(['/navigateRoomForm', id]);
  }
}
