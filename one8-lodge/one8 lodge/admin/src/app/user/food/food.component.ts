import { Component, OnInit } from '@angular/core';

// import { AdminService } from '../admin.service';
import { mainresclass } from 'src/model/user';
import { getFoodTypeClass, mainresclass2 } from 'src/model/admin';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  foodName: string = '';
  NewFoodCatName: string = '';
  editMode: boolean = false;
  AddNewFoodContainer: boolean = false;
  editRowIndex: number = -1;

  constructor(
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  FoodArray: getFoodTypeClass[] = [];
  RoomObj: getFoodTypeClass = new getFoodTypeClass();

  ngOnInit(): void {
    this.GetFoodCat();
  }

  GetFoodCat() {
    this.service.showLoader();
    this.service.getFoodFun().subscribe((res: mainresclass2) => {
      this.service.hideLoader();
      if (res.response != null) {
        this.FoodArray = res?.response;
      } else {
        this.FoodArray = [];
      }
    });
  }

  EditRoom(index: number, Name: string) {
    this.editMode = true;
    this.editRowIndex = index;
    this.foodName = Name;
  }

  EditRoomName(data: any) {
    this.service.showLoader();

    this.RoomObj.food_category_id = data.food_category_id;
    this.RoomObj.food_category_name = this.foodName;

    this.service.EditFoodFun(this.RoomObj).subscribe((res: mainresclass) => {
      this.service.hideLoader();

      if (res.message == 'CATEGORY UPDATE SUCCESFULLY') {
        this.editMode = false;
        this.editRowIndex = -1;
        this.GetFoodCat();

        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  ClickAddRoom() {
    this.AddNewFoodContainer = true;
  }

  NewRoom() {
    this.service.showLoader();

    this.RoomObj.food_category_name = this.NewFoodCatName;

    this.service.EditFoodFun(this.RoomObj).subscribe((res: mainresclass) => {
      this.service.hideLoader();

      if (res.message == 'CATEGORY SAVE SUCCESFULLY') {
        this.AddNewFoodContainer = false;

        this.GetFoodCat();
        this.NewFoodCatName = '';
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  isValidRoomName(): boolean {
    // Validate roomName against the pattern
    const pattern = /^[a-z A-Z]*$/;
    return pattern.test(this.foodName);
  }
  isValidRoomNewName(): boolean {
    // Validate roomName against the pattern
    const pattern = /^[a-z A-Z]*$/;
    return (
      pattern.test(this.NewFoodCatName) && this.NewFoodCatName.trim().length > 0
    );
  }

  DeleteFood(id: number) {
    this.service.showLoader();
    this.service.DeleteFoodFun(id).subscribe((res: mainresclass) => {
      this.service.hideLoader();

      if (res.message == 'DELETE CATEGORY SUCCESFULLY') {
        this.GetFoodCat();

        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  navigateFoodDetail(id: number) {
    this.router.navigate(['/fooddetail', id]);
  }
}
