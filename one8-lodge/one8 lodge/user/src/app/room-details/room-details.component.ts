import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotleservicesService } from '../hotleservices.service'; 
import { DatePipe, formatDate } from '@angular/common';
import * as Aos from 'aos';


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
  providers: [DatePipe]  

})
export class RoomDetailsComponent implements OnInit {
  room: any; 
  selectedImage: string | undefined;
  engageTimeData: any;
  roomnum: any;
  datetodisplay: any;
  alreadyloggedin!: string | null;
  SeprateInTime: any;
  SeprateOutTime: any;
  Adate!: string;
  Broom!: string | null;

  constructor(private route: ActivatedRoute, private hotelService: HotleservicesService,private router:Router, private datePipe: DatePipe) { }


  ngOnInit(): void {
    Aos.init();
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.getRoomDetails(roomId);
    }
    const currentDate = this.getCurrentDate();
    this.Adate = this.getCurrentDate();
    localStorage.setItem("EngagedDate", currentDate)
    console.log("EngagedDate", currentDate);
    
    this.datetodisplay = this.getCurrentDate();
    const currentRoomNumber = localStorage.getItem("room id");
    this.Broom = localStorage.getItem("room id");
    this.fetchEngageTime(currentDate, currentRoomNumber);
    this.refreshtime()
  }
  getRoomDetails(roomId: string): void {
    this.hotelService.getRoomDetails(roomId).subscribe(
      (data) => {
        localStorage.setItem('room id', data.response.room_number);
        this.roomnum=data.response.room_number;
        console.log("room id",data.response.room_number);
        localStorage.setItem('amount', data.response.amount);
        console.log("amount",data.response.amount);

        this.room = data.response; 
      },
      (error) => {
        console.error('Error fetching room details', error);
      }
    );
  }
  displaySelectedImage(selectedImage: any): void {
    if (this.room && this.room.images && this.room.images.length > 0) {
      this.room.images[0] = selectedImage;
    }
  }

  fetchEngageTime(currentDate: string, currentRoomNumber: any): void {
    console.log("Date api",currentDate, "time api", this.roomnum);
    
    this.hotelService.getEngageTime(currentDate, currentRoomNumber).subscribe(
      (data) => {
        this.engageTimeData = data.response;
        this.SeprateInTime = data.response[0][0]
        this.SeprateOutTime = data.response[0][1]
        localStorage.setItem("SeprateInTime", this.SeprateInTime)
        localStorage.setItem("SeprateOutTime", this.SeprateOutTime)
        console.log("SeprateInTime", data.response[0][0]);
        console.log("SeprateOutTime", data.response[0][1]);

        console.log(this.engageTimeData);
      },
      (error) => {
        console.error('Error fetching engage time', error);
      }
    );
  }
  checkloggin(){
    this.router.navigate(['/book-room',this.roomnum]);

    // this.alreadyloggedin = localStorage.getItem("logincustomerId")
    // console.log("Already loggedin", this.alreadyloggedin);
    
    // if(this.alreadyloggedin){
    //   this.router.navigate(['/book-room']);
    // } else {
    // this.router.navigate(['/login-user']);
    // }
  }

  getCurrentDate(): string {
    const now = new Date();
    const formattedDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    console.log("formattedDate",formattedDate);
    
    return formattedDate || ''; 
  }

  refreshtime(){
    this.fetchEngageTime(this.Adate, this.Broom);
  }

}
