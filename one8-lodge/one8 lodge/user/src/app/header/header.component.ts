import { Component, HostListener, OnInit, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { HotleservicesService } from '../hotleservices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isNavOpen = false;
  alreadyloggedin!: string | null;
  isSidebarOpen = false;
  logginStatus: boolean = false;
  notifications: any[] = [];
  get: any;
  notificationCount: number = 0;
  isScrolledDown = false;
  lastScrollTop = 100;

  constructor(private router: Router, private authService: HotleservicesService , private render : Renderer2) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.logginStatus = status;
    });
    this.fetchNotifications();
  }

  isNotificationOpen = false;
 
  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
    if (this.isNotificationOpen) {
      this.fetchNotifications();
    }
  }

  fetchNotifications() {
    const customerId = localStorage.getItem('logincustomerId');
    if (customerId) {
      this.authService.getNotificationsByCustomerId(Number(customerId)).subscribe(response => {
        if (response.status) {
          this.notifications = response.response;
          this.notificationCount = this.notifications.filter(notification => !notification.is_view).length;
        }
      }, error => {
        console.error('Error fetching notifications', error);
      });
    }
  }

  markAsViewedAndRoute(notificationId: number) {
    this.authService.updateNotification({ notification_id: notificationId, is_view: true }).subscribe(response => {
      if (response.status) {
        console.log("Marked as Viewed",response);
        this.fetchNotifications();
        this.router.navigate(['/booking']);
      } else {
        console.error('Failed to mark notification as viewed', response.message);
      }
    }, error => {
      console.error('Error marking notification as viewed', error);
    });
  }

  book() {
    this.router.navigate(['/book-room']);

    // this.alreadyloggedin = localStorage.getItem("logincustomerId")
    // console.log("Already loggedin", this.alreadyloggedin);
    
    // if(this.alreadyloggedin){
    //   this.router.navigate(['/book-room']);
    // } else {
    // this.router.navigate(['/login-user']);
    // }
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.sidebar') && !target.closest('.menu-icon') &&
        !target.closest('.notification-box') && !target.closest('.notification-icon')) {
      this.isSidebarOpen = false;
      this.isNotificationOpen = false;
    }
  }

  logout() {
    this.authService.logoutCustomer();
    this.router.navigate(['/login-user']);
  }

  
  collapseNavbar(): void {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      this.render.removeClass(navbarCollapse, 'show');
    }
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      this.isScrolledDown = true;
    } else {
      this.isScrolledDown = false;
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
  }

}
