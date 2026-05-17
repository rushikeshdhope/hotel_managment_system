import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { mainresclass } from 'src/model/user';
import { getRoomTypeClass, mainresclass2, SaveRoomNameClass } from 'src/model/admin';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomName: string='';
  NewroomName:string='';
  editMode: boolean=false;
  AddNewRoomContainer: boolean=false;
  editRowIndex: number = -1;

  constructor(private service : AdminService,private toastr: ToastrService, private router: Router){}

  RoomArray: getRoomTypeClass[]=[];
  RoomObj:getRoomTypeClass = new getRoomTypeClass();
  InsertRoomObj:SaveRoomNameClass = new SaveRoomNameClass();

  ngOnInit(): void {
    this.GetRoomType();
  }

  GetRoomType(){
    this.service.getRoomFun().subscribe((res:mainresclass2)=>{
       this.RoomArray=res.response;

      console.log("room type",this.RoomArray);
    });
  }

  EditRoom(index: number,Name: string){
    this.editMode=true;
    this.editRowIndex = index;
    this.roomName= Name;
  }

  EditRoomName(data :any){  
    // console.log("Editeddata", this.roomName);
    // this.RoomObj.room_category_id = data.room_category_id;
    // this.RoomObj.room_category_name = this.roomName;
    
    // this.service.EditRoomFun( this.RoomObj).subscribe((res:mainresclass)=>{
    //   console.log("room type",res);
    //   if(res.message == "CATEGORY UPDATE SUCCESFULLY"){
    //     this.editMode=false;
    //     this.editRowIndex = -1;
    //     this.GetRoomType();
        
    //     this.toastr.success(res.message);
    //   }else{
    //     this.toastr.error(res.message);
    //   }
     
    // });
  }

  ClickAddRoom(){
    this.AddNewRoomContainer= true;
  }

  NewRoom(){  
    
    console.log("Editeddata", this.NewroomName);
   
    this.InsertRoomObj.room_category_name = this.NewroomName;
    
    this.service.EditRoomFun( this.InsertRoomObj).subscribe((res:mainresclass)=>{
      console.log("room type",res);
      if(res.message == "CATEGORY SAVE SUCCESFULLY"){
        this.AddNewRoomContainer= false;
        
       
        this.GetRoomType();
        this.NewroomName='';
        this.toastr.success(res.message);
      }else{
        this.toastr.error(res.message);
      }
     
    });
  }

  
  isValidRoomName(): boolean {
    // Validate roomName against the pattern
    const pattern = /^[a-z A-Z]*$/;
    return pattern.test(this.roomName);
  }
  isValidRoomNewName(): boolean {
    // Validate roomName against the pattern
    const pattern = /^[a-z A-Z]*$/;
    return pattern.test(this.NewroomName) && this.NewroomName.trim().length > 0;
  }

  DeleteRoom(id : number){
    this.service.DeleteRoomFun(id).subscribe((res:mainresclass)=>{
      console.log(res);
      if(res.message == "DATA DELETE SUCCESFULLY..!"){
       
        
       
        this.GetRoomType();
       
        this.toastr.success(res.message);
      }else{
        this.toastr.error(res.message);
      }
     
  
      
    });
  }



  navigateRoomDetail(id : number){
    this.router.navigate(['/roomdetail',id]);
  }


}
