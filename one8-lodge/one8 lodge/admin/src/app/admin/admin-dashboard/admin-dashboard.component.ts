import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { roomObjClass } from 'src/model/admin';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { forkJoin, map } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  isSidebarOpen = false;
  notificationCount: number = 0;
  RoomDetailArray: roomObjClass[] = [];
  RoomsByCategory: { [categoryName: string]: any[] } = {};
  engagedRooms: any[] = [];
  MonthArray: any[] = [];
  DayIncome: any[] = [];
  YearArray: any[] = [];
  FilteredroomsIncome: any[] = [];
  CLeanRooms: any[] = [];
  roomDetailObservables: any[] = [];

  constructor(
    public service: AuthService,
    private userservice: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userservice.getTotalDay().subscribe((res) => {
      if (res.response != null) {
        this.DayIncome.push(res.response);
      } else {
        this.DayIncome = [];
      }
    });
    this.userservice.getTotalMonth().subscribe((res) => {
      if (res.response != null) {
        this.MonthArray.push(res.response);
      } else {
        this.MonthArray = [];
      }
    });
    this.userservice.getTotalYear().subscribe((res) => {
      if (res.response != null) {
        this.YearArray.push(res.response);
      } else {
        this.YearArray = [];
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
    this.roomDetailObservables = [];
    this.RoomsByCategory = {};
    this.engagedRooms = [];
    this.CLeanRooms = [];

    this.userservice.getRoomFun().subscribe((categoriesRes) => {
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

  getCategoryKeys(): string[] {
    return Object.keys(this.RoomsByCategory);
  }

  openNav() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeNav() {
    this.isSidebarOpen = false;
  }

  handleInputs(event: Event): void {
    this.FilteredroomsIncome = [];
    const input = event.target as HTMLInputElement;

    const value = input.value;

    this.userservice.FilterDateIncome(value).subscribe((res) => {
      if (res.response != null) {
        this.FilteredroomsIncome.push(res.response);
      } else {
        this.FilteredroomsIncome = [];
      }
    });
  }
}
