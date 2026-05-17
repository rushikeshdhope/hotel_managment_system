import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserService } from '../user.service';
import { roomObjClass } from 'src/model/admin';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  showDetailsTotal: boolean = false;
  showDetailsRoomWise: boolean = false;
  customerId: number = 0;
  type: string = 'room';
  isSidebarOpen = false;
  notificationCount: number = 0;
  RoomDetailArray: roomObjClass[] = [];
  RoomsByCategory: { [categoryName: string]: any[] } = {};
  engagedRooms: any[] = [];
  CLeanRooms: any[] = [];
  MonthArray: any[] = [];
  DayIncome: any[] = [];
  YearArray: any[] = [];
  AllRoomIncomeArray: any[] = [];
  FilteredroomsIncome: any[] = [];
  RoomWiseIncomeArray: any[] = [];
  isPosiVisible: boolean = false;
  isPosiVisibleRoomWiseIncome: boolean = false;
  roomDetailObservables: any[] = [];

  constructor(
    public service: AuthService,
    private userservice: UserService,
    private router: Router,
    private ActivatedRoutes: ActivatedRoute
  ) {}

  closePosi(): void {
    this.isPosiVisible = false;
  }
  closePosiAllRoom(): void {
    this.isPosiVisibleRoomWiseIncome = false;
  }
  ngOnInit(): void {
    this.ActivatedRoutes.params.subscribe((params) => {
      if (params['CustomerId'] == undefined) {
        this.customerId = 0;
      } else {
        this.customerId = params['CustomerId'];
      }

      if (params['type'] === 'order') {
        this.type = params['type'];
      } else if (params['type'] === 'customer') {
        this.type = params['type'];
      }
    });

    this.userservice.getTotalDay().subscribe((res) => {
      if (res.response != null) {
        this.DayIncome.push(res.response);
      } else {
        this.DayIncome = [];
      }
    });
    this.userservice.getTotalMonth().subscribe((res) => {
      if (res.response != null) {
        this.MonthArray = res.response;
      } else {
        this.MonthArray.push({ totalSale: 0 });
      }
    });
    this.userservice.getTotalYear().subscribe((res) => {
      if (res.response != null) {
        this.YearArray = res.response;
      } else {
        this.YearArray.push({ totalSale: 0 });
      }
    });

    this.GetRoom();
    this.getNotification();
  }

  getNotification() {
    this.userservice.getAllNotification().subscribe((res) => {
      if (res.response != null) {
        this.notificationCount = res.response.length;
      } else {
        this.notificationCount = 0;
      }
    });
  }
  GetRoom() {
    this.userservice.showLoader();
    this.roomDetailObservables = [];
    this.RoomsByCategory = {};
    this.engagedRooms = [];
    this.CLeanRooms = [];

    this.userservice.getRoomFun().subscribe((categoriesRes) => {
      this.userservice.hideLoader();

      if (categoriesRes.response != null) {
        const categoryArray = categoriesRes?.response || [];
        const categoryMap = new Map<number, string>();

        categoryArray.forEach(
          (category: {
            room_category_id: number;
            room_category_name: string;
          }) => {
            categoryMap.set(
              category.room_category_id,
              category.room_category_name
            );

            if (!this.RoomsByCategory[category.room_category_name]) {
              this.RoomsByCategory[category.room_category_name] = [];
            }

            this.roomDetailObservables.push(
              this.userservice.GetRoomDetailFun(category.room_category_id).pipe(
                retry(3),
                map((roomRes: any) => ({
                  categoryId: category.room_category_id,
                  roomDetailArray: roomRes?.response || [],
                })),
                catchError((error) => {
                  console.error(
                    `Error fetching details for category ID ${category.room_category_id}:`,
                    error
                  );
                  return throwError(error);
                })
              )
            );
          }
        );

        forkJoin(this.roomDetailObservables).subscribe(
          (roomResponses) => {
            roomResponses.forEach(({ categoryId, roomDetailArray }) => {
              const categoryName = categoryMap.get(categoryId);
              if (categoryName) {
                this.RoomsByCategory[categoryName] =
                  this.RoomsByCategory[categoryName].concat(roomDetailArray);

                this.engagedRooms = this.engagedRooms.concat(
                  roomDetailArray.filter(
                    (room: { roomStatus: string }) =>
                      room.roomStatus === 'ENGAGE'
                  )
                );
                this.CLeanRooms = this.CLeanRooms.concat(
                  roomDetailArray.filter(
                    (room: { roomStatus: string }) =>
                      room.roomStatus === 'CLEAN'
                  )
                );
              }
            });
          },
          (error) => {
            console.error('Error fetching room details:', error);
          }
        );
      }
    });
  }

  toggleViewshowDetailsTotal() {
    this.showDetailsTotal = !this.showDetailsTotal;
  }
  toggleViewRoomWise() {
    this.showDetailsRoomWise = !this.showDetailsRoomWise;
  }

  getCategoryKeys(): string[] {
    return Object.keys(this.RoomsByCategory);
  }

  openNav() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeNav() {
    this.isSidebarOpen = false;
  }

  navigateFinalRoom(id: number) {
    this.router.navigate(['/finalroomform', id]);
  }

  ChangeRoomStatus(id: string) {
    const confirmMessage = confirm(
      'Are you sure you want to change the room status?'
    );

    if (confirmMessage) {
      const formdata = new FormData();
      formdata.append('room_id', id);
      formdata.append('roomStatus', 'AVAILABLE');

      this.userservice.ChangeRoomStatus(formdata).subscribe((Res) => {
        this.GetRoom();
      });
    } else {
    }
  }
  navigateRoom(id: number) {
    this.router.navigate(['/newBooking', this.type, this.customerId, id]);
  }

  handleInputsDateIncome(event: Event): void {
    this.FilteredroomsIncome = [];
    const input = event.target as HTMLInputElement;

    const value = input.value;

    this.userservice.FilterDateIncome(value).subscribe((res) => {
      if (res.response != null) {
        this.FilteredroomsIncome.push(res.response);

        this.isPosiVisible = true;
      } else {
        this.FilteredroomsIncome = [];
        this.isPosiVisible = false;
      }
    });
  }
  handleInputsDateWiseRoomIncome(event: Event): void {
    this.RoomWiseIncomeArray = [];
    const input = event.target as HTMLInputElement;

    const value = input.value;
    this.isPosiVisibleRoomWiseIncome = true;
    this.userservice.getIncomeAllRoom(value).subscribe((res) => {
      if (res.response != null) {
        this.RoomWiseIncomeArray = res.response.reverse();
      } else {
        this.RoomWiseIncomeArray = [];
        this.isPosiVisibleRoomWiseIncome = false;
      }
    });
  }
}
