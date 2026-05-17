import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  NotificationArray: any[] = [];
  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {
    this.getNotification();
  }

  getNotification() {
    this.service.getAllNotification().subscribe((res) => {
      this.NotificationArray = res.response;
    });
  }

  NotificationClick(obj: any) {
    let Obj = {
      notification_id: obj.notification_id,
      is_view: true,
    };

    if (obj.roomStatus == 'REQUEST') {
      this.router.navigate(['/bookings']);
    }

    this.service.NotificationView(Obj).subscribe((data) => {});
  }
}
