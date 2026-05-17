import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { roomObjClass } from 'src/model/admin';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  catId : number =0;
  AddNewRoomContainer : boolean = false;
  newRoomForm : FormGroup;
  editmode : boolean =false;
  RoomDetailArray : roomObjClass[]=[];
  constructor(private ActivatedRoutes : ActivatedRoute, private service : AdminService,private fb : FormBuilder,private toastr: ToastrService){
    this.newRoomForm = this.fb.group({
      room_number:['',[Validators.required]] ,
      rate:['',[Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
      ac:[''],
      hours:[''],
      roomStatus:[''],
      roomCategory_id:[''],
      room_id: ['']
      
    });
  }

  ngOnInit(){
    this.ActivatedRoutes.params.subscribe(params=>{ 
  
      console.log("result",params)
      this.catId = params['id'];
      console.log("id in a providerdesc", this.catId);
    })
    this.addNewRoom();

   
  }

  addNewRoom(){
    this.service.GetRoomDetailFun(this.catId).subscribe((res)=>{
      this.RoomDetailArray = res.response;
      console.log("result data room",res);
    })
  }

  ClickAddRoom(){
    this.AddNewRoomContainer= true;
  }

  closeNav(){
    this.AddNewRoomContainer = false;
    this.newRoomForm.reset();
  }



  AddRoomFunTs(){
    this.newRoomForm.get('roomCategory_id')?.setValue(this.catId);
    if(this.editmode != true){
    console.log("form value",this.newRoomForm.value);
    this.service.SaveRoomDetailFun(this.newRoomForm.value).subscribe((res)=>{
      console.log("res of new room",res);

      if(res.message == "ROOM SAVE SUCCESFULLY"){
        this.AddNewRoomContainer= false;
        
       this.newRoomForm.reset();
       this.addNewRoom();
        this.toastr.success(res.message);
      }else{
        this.toastr.error(res.message);
      }
     
    });
  }else{
console.log("edit",this.newRoomForm.value);

    this.service.SaveRoomDetailFun(this.newRoomForm.value).subscribe((res)=>{
      console.log("res of new room",res);

      if(res.message == "ROOM UPDATE SUCCESFULLY"){
        this.AddNewRoomContainer= false;
        
       this.newRoomForm.reset();
       this.addNewRoom();
        this.toastr.success(res.message);
      }else{
        this.toastr.error(res.message);
      }
     
    });


  }
      
   
  }

  DeleteRoom(Id : number){
    this.service.DeleteRoomDetailFun(Id).subscribe((res)=>{
      console.log("res of delete room",res);
      if(res.message == "DATA DELETE SUCCESFULLY..!"){
        this.AddNewRoomContainer= false;
        
       this.newRoomForm.reset();
       this.addNewRoom();
        this.toastr.success(res.message);
      }else{
        this.toastr.error(res.message);
      }
     

    });
  }


  EditRoom(roomData: any) {
    this.editmode = true;
    this.AddNewRoomContainer = true;
    this.newRoomForm.patchValue({
      room_number: roomData.room_number,
      rate: roomData.rate,
      ac: roomData.ac,
      hours: roomData.hours,
      room_id: roomData.room_id,
      roomStatus: roomData.roomStatus
    });
  }

}
