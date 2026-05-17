import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';
import { mainresclass } from 'src/model/user';
import { getFoodTypeClass, mainresclass2 } from 'src/model/admin';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  foodName: string='';
  NewFoodCatName:string='';
  editMode: boolean=false;
  AddNewFoodContainer: boolean=false;
  editRowIndex: number = -1;


  constructor(private service : AdminService,private toastr: ToastrService){}

  FoodArray: getFoodTypeClass[]=[];
  RoomObj:getFoodTypeClass = new getFoodTypeClass();

  ngOnInit(): void {
    this.GetFoodCat();
  }

  GetFoodCat(){
    this.service.getFoodFun().subscribe((res:mainresclass2)=>{
       this.FoodArray=res.response;

      console.log("room type",this.FoodArray);
    });
  }

  EditRoom(index: number,Name: string){
    this.editMode=true;
    this.editRowIndex = index;
    this.foodName= Name;
  }

  EditRoomName(data :any){  
    console.log("Editeddata", this.foodName);
    this.RoomObj.food_category_id = data.food_category_id;
    this.RoomObj.food_category_name = this.foodName;
    
    this.service.EditFoodFun( this.RoomObj).subscribe((res:mainresclass)=>{
      console.log("room type",res);
      if(res.message == "CATEGORY UPDATE SUCCESFULLY"){
        this.editMode=false;
        this.editRowIndex = -1;
        this.GetFoodCat();
        
        this.toastr.success(res.message);
      }else{
        this.toastr.error(res.message);
      }
     
    });
  }

  ClickAddRoom(){
    this.AddNewFoodContainer= true;
  }

  NewRoom(){  
    
    console.log("Editeddata", this.NewFoodCatName);
   
    this.RoomObj.food_category_name = this.NewFoodCatName;
    
    this.service.EditFoodFun( this.RoomObj).subscribe((res:mainresclass)=>{
      console.log("room type",res);
      if(res.message == "CATEGORY SAVE SUCCESFULLY"){
        this.AddNewFoodContainer= false;
        
       
        this.GetFoodCat();
        this.NewFoodCatName='';
        this.toastr.success(res.message);
      }else{
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
    return pattern.test(this.NewFoodCatName) && this.NewFoodCatName.trim().length > 0;
  }


  DeleteFood(id : number){
    this.service.DeleteFoodFun(id).subscribe((res:mainresclass)=>{
      console.log(res);
      if(res.message == "DATA DELETE SUCCESFULLY..!"){
        
        
       
        this.GetFoodCat();
       
        this.toastr.success(res.message);
      }else{
        this.toastr.error(res.message);
      }
     
  
      
    });
  }



}
