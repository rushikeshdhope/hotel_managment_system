import { Component, OnInit } from '@angular/core';
import { mainresclass } from 'src/model/user';
import {
  getRoomTypeClass,
  mainresclass2,
  SaveRoomNameClass,
} from 'src/model/admin';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  editMode: boolean = false;
  AddNewRoomContainer: boolean = false;
  editRowIndex: number = -1;

  roomcategoryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.roomcategoryForm = this.fb.group({
      room_category_name: ['', Validators.required],
      description: ['', Validators.required],
      room_category_id: [''],
      file: [null],
    });
  }

  RoomArray: getRoomTypeClass[] = [];
  RoomObj: getRoomTypeClass = new getRoomTypeClass();
  InsertRoomObj: SaveRoomNameClass = new SaveRoomNameClass();

  ngOnInit(): void {
    this.GetRoomType();
  }

  GetRoomType() {
    this.service.showLoader();
    this.service.getRoomFun().subscribe((res: mainresclass2) => {
      this.service.hideLoader();

      if (res.response != null) {
        this.RoomArray = res?.response.reverse();
        this.RoomArray.reverse();
      } else {
        this.RoomArray = [];
      }

      console.log('room type', this.RoomArray);
    });
  }

  EditRoom(index: number, data: any) {
    console.log('edited data', data);

    this.editMode = true;
    this.editRowIndex = index;
    this.AddNewRoomContainer = true;
    this.roomcategoryForm.patchValue({
      room_category_name: data.room_category_name,
      description: data.description,
      room_category_id: data.room_category_id,
      file: data.file,
    });
  }

  EditRoomName(data: any) {
    this.service.showLoader();

    this.service.EditRoomFun(this.formData).subscribe((res: mainresclass) => {
      this.service.hideLoader();
      console.log('room type', res);
      if (res.message == 'CATEGORY UPDATE SUCCESFULLY') {
        this.editMode = false;
        this.editRowIndex = -1;
        this.GetRoomType();

        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  ClickAddRoom() {
    this.AddNewRoomContainer = true;
  }

  formData = new FormData();
  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      this.roomcategoryForm.patchValue({
        file: file,
      });
      this.roomcategoryForm.get('file')?.updateValueAndValidity();
    }
  }

  NewRoom() {
    this.service.showLoader();
    if (this.roomcategoryForm.valid) {
      this.formData.append(
        'room_category_name',
        this.roomcategoryForm.value.room_category_name
      );
      this.formData.append(
        'description',
        this.roomcategoryForm.value.description
      );
      this.formData.append('file', this.roomcategoryForm.value.file);

      if (this.editMode != true) {
        this.service
          .EditRoomFun(this.formData)
          .subscribe((res: mainresclass) => {
            this.service.hideLoader();
            console.log('room type', res);
            if (res.message == 'CATEGORY SAVE SUCCESFULLY') {
              this.AddNewRoomContainer = false;
              this.roomcategoryForm.reset();

              this.GetRoomType();

              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.message);
            }
            this.formData = new FormData();
          });
      } else {
        this.formData.append(
          'room_category_id',
          this.roomcategoryForm.value.room_category_id
        );
        // console.log('edited data',this.roomcategoryForm.value.room_category_id);
        console.log(this.formData.get('room_category_id'));
        console.log(this.formData.get('room_category_name'));
        console.log(this.formData.get('description'));
        console.log(this.formData.get('file'));
        this.service.showLoader();

        this.service
          .EditRoomFun(this.formData)
          .subscribe((res: mainresclass) => {
            this.service.hideLoader();
            console.log('room type', res);
            if (res.message == 'CATEGORY UPDATE SUCCESFULLY') {
              this.AddNewRoomContainer = false;
              this.editMode = false;
              this.editRowIndex = -1;
              this.GetRoomType();

              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.message);
            }
          });
        this.formData = new FormData();
      }
    } else {
      console.log('invalid form');
    }
  }

  closeNav() {
    this.AddNewRoomContainer = false;
    this.roomcategoryForm.reset();
    this.editMode = false;
  }

  DeleteRoom(id: number) {
    this.service.showLoader();
    this.service.DeleteRoomFun(id).subscribe((res: mainresclass) => {
      this.service.hideLoader();
      console.log(res);
      if (res.message == 'DELETE CATEGORY SUCCESFULLY') {
        this.GetRoomType();

        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  navigateRoomDetail(id: number) {
    this.router.navigate(['/roomdetail', id]);
  }
}
