import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { roomObjClass } from 'src/model/admin';
import { UserService } from '../user.service';
import { mainresclass } from 'src/model/user';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css'],
})
export class FoodDetailsComponent implements OnInit {
  categoryName: string = '';
  catId: number = 0;
  editMode: boolean = false;

  editRowIndex: number = -1;
  AddFoodSubcatContainer: boolean = false;
  FoodSubcatForm: FormGroup;
  FOodSubCatArray: any = [];
  editmode: boolean = false;
  RoomDetailArray: roomObjClass[] = [];
  constructor(
    private ActivatedRoutes: ActivatedRoute,
    private service: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.FoodSubcatForm = this.fb.group({
      food_name: ['', Validators.required],
      rate: ['', Validators.required],
      foodCategory_id: [''],
      food_id: [''],
    });
  }

  ngOnInit() {
    this.ActivatedRoutes.params.subscribe((params) => {
      this.catId = params['id'];
    });

    this.GetFoodSubCat();
    this.GetRoomCat();
  }

  GetRoomCat() {
    this.service.getFoodCatUsingId(this.catId).subscribe((res: any) => {
      this.categoryName = res.response.food_category_name;
    });
  }

  GetFoodSubCat() {
    this.service.showLoader();
    this.service.getFoodSubCatFun(this.catId).subscribe((res: any) => {
      this.service.hideLoader();
      if (res.response != null) {
        this.FOodSubCatArray = res?.response;
        this.FOodSubCatArray.reverse();
      } else {
        this.FOodSubCatArray = [];
      }
    });
  }

  ClickAddFoodSubCategory() {
    this.AddFoodSubcatContainer = true;
  }

  AddFoodSubCat() {
    if (this.FoodSubcatForm.valid) {
      this.service.showLoader();
      if (this.editMode != true) {
        this.FoodSubcatForm.get('foodCategory_id')?.setValue(this.catId);

        if (this.FoodSubcatForm)
          this.service
            .AddSubCat(this.FoodSubcatForm.value)
            .subscribe((res: any) => {
              if (res.response != null) {
                this.service.hideLoader();

                if (res.message == 'FOOD SAVE SUCCESFULLY') {
                  this.FoodSubcatForm.reset();

                  this.GetFoodSubCat();
                  this.AddFoodSubcatContainer = false;

                  this.toastr.success(res.message);
                } else {
                  this.toastr.error(res.message);
                }

                this.GetFoodSubCat();
              } else {
                // this.toastr.error(res.response);
              }
            });
      } else {
        this.service
          .AddSubCat(this.FoodSubcatForm.value)
          .subscribe((res: any) => {
            if (res.response != null) {
              this.service.hideLoader();

              if (res.message == 'FOOD UPDATE SUCCESFULLY') {
                this.FoodSubcatForm.reset();
                this.editMode = false;

                this.GetFoodSubCat();
                this.AddFoodSubcatContainer = false;

                this.toastr.success(res.message);
              } else {
                this.toastr.error(res.message);
              }
            }
          });
      }
    } else {
      this.toastr.error('Please fill all the fields');
    }
  }

  closeNav() {
    this.AddFoodSubcatContainer = false;
    this.FoodSubcatForm.reset();
  }

  DeleteRoom(id: number) {
    this.service.showLoader();
    this.service.DeleteFoodSubCatFun(id).subscribe((res: mainresclass) => {
      this.service.hideLoader();

      if (res.message == 'DELETE FOOD SUCCESFULLY') {
        this.GetFoodSubCat();

        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  EditRoom(index: number, data: any) {
    this.editMode = true;
    this.editRowIndex = index;
    this.AddFoodSubcatContainer = true;
    this.FoodSubcatForm.patchValue({
      food_name: data.food_name,
      rate: data.rate,
      foodCategory_id: data.foodCategory_id,
      isVeg: data.veg,
      food_id: data.food_id,
    });
  }
}
