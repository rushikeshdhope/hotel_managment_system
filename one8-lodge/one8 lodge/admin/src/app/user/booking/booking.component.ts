import { Component, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { PdfGeneratorService } from '../pdf-generator.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  totalAmountsByOrderId: { [orderId: string]: number } = {};
  isSidebarOpen = false;
  ShowPagibtn = true;
  showDiv: boolean = true;
  currentMenu: string = 'accepted';
  dateValue: string = '';
  roomValue: string = '';
  amountForPay: number = 0;
  PaymentType: number = 0;
  mobNo: number = 0;
  bookings: any[] = [];
  AcceptedArray: any[] = [];
  PendingBookingarray: any[] = [];
  Completearray: any[] = [];
  RoomNoArray: any[] = [];
  EngageTimeNoArray: any[] = [];
  amount: number = 0;
  searchValue: string = '';

  page: number = 0;
  size: number = 10;
  hasNextPage: boolean = true;
  viewFood: boolean = false;
  activeBookingId: number | null = null;
  activeBookingId1: number | null = null;
  inputAmount: number = 0;

  constructor(
    private userService: UserService,
    private pdfGeneratorService: PdfGeneratorService,
    private toastr: ToastrService,
    private router: Router,
    public service: AuthService
  ) {}

  ngOnInit() {
    this.changeBookings('accepted');

    this.getRoomNo();
  }

  openNav() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeNav() {
    this.isSidebarOpen = false;
  }

  viewFoodDetails() {}

  showFood(bookingId: number): void {
    if (this.activeBookingId === bookingId) {
      this.activeBookingId = null;
    } else {
      this.activeBookingId = bookingId;
    }
  }

  showpayment(bookingId: number): void {
    if (this.activeBookingId1 === bookingId) {
      this.activeBookingId1 = null;
    } else {
      this.activeBookingId1 = bookingId;
    }
  }

  getRoomNo() {
    this.userService.showLoader();
    this.userService.AllRoomNoGet().subscribe((data: any) => {
      this.userService.hideLoader();

      this.RoomNoArray = data.response;
    });
  }

  payAmt(data: any) {
    if (!data.inputAmount || data.inputAmount <= 0) {
      this.toastr.error('Please enter a valid amount.');
      return;
    }

    if (!data.order1dto.PaymentType) {
      this.toastr.error('Please select a payment type.');
      return;
    }

    this.userService.showLoader();

    const formData = new FormData();
    let val = data.inputAmount.toString();
    let type = data.order1dto.PaymentType.toString();

    formData.append('payments[0].amount', val);
    formData.append('order_id', data.order1dto.order_id);
    formData.append('payments[0].type', type);

    this.userService.updatestatus(formData).subscribe(
      (res) => {
        this.userService.hideLoader();

        if (res.message == 'ORDER UPDATE SUCCESFULLY') {
          data.inputAmount = 0;
          data.PaymentType = '';
          this.changeBookings('accepted');
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      },
      (error) => {
        this.userService.hideLoader();
        this.toastr.error('Payment failed. Please try again.');
      }
    );
  }

  navigateFinalRoom(id: number) {
    this.router.navigate(['/finalroomform', id]);
  }

  getOrderMob() {
    this.bookings = [];
    this.userService.showLoader();

    if (this.searchValue === '') {
      this.userService.showLoader();
       this.changeBookings(this.currentMenu);
    } else {
      this.userService
        .getBookingsUsingMob(this.searchValue)
        .subscribe((res) => {
          if (res.response != null) {
            this.bookings = res.response;
            console.log("Searched res",res.response);
          } else {
            this.toastr.error('BOOKING NOT FOUND FOR THIS SEARCH');

            this.bookings = [];
          }

          this.userService.hideLoader();
        },
        (error) => {
          // Handle error case if needed
          this.toastr.error('An error occurred. Please try again.');
          this.changeBookings(this.currentMenu);
          this.userService.hideLoader();
          // this.bookings = [];
          
        });
    }
  }

  getAllBooking(page: number, size: number) {
    this.userService.showLoader();

    this.userService.getAllBooking(page, size).subscribe((data) => {
      this.userService.hideLoader();

      if (data.response != null) {
        this.bookings = data.response.reverse();

        this.hasNextPage = this.bookings.length === this.size;
      } else {
        this.hasNextPage = false;
      }
    });
  }

  getBookingsByStatus(orderStatus: string, page: number, size: number) {
    this.userService.showLoader();
    this.userService
      .getBookingsByStatus(orderStatus, page, size)
      .subscribe((data: any) => {
        this.userService.hideLoader();

        if (data.response != null) {
          this.bookings = data.response.map((booking: any) => {
            return {
              ...booking,
              inputAmount: booking.order1dto.remaining_amount,
            };
          });

          this.totalAmountsByOrderId = this.bookings.reduce(
            (totals: { [orderId: string]: number }, booking: any) => {
              const orderId = booking.order1dto.order_id;
              const totalForThisOrder = booking.order1dto.foodDetails.reduce(
                (subtotal: number, food: any) => {
                  return subtotal + food.amount;
                },
                0
              );

              if (!totals[orderId]) {
                totals[orderId] = 0;
              }
              totals[orderId] += totalForThisOrder;

              return totals;
            },
            {}
          );

          this.hasNextPage = this.bookings.length === this.size;
        } else {
          this.bookings = [];
          this.hasNextPage = false;
        }
      });
  }

  toggleFoodDetails(booking: any) {
    booking.showFoodDetails = !booking.showFoodDetails;
  }

  updateOrderStatus(orderId: number, status: string) {
    this.userService.hideLoader();
    const formData = new FormData();
    formData.append('order_id', orderId.toString());
    formData.append('orderStatus', status);

    this.userService.updatestatus(formData).subscribe(
      (response) => {
        this.userService.showLoader();

        if (status === 'COMPLETE') {
          this.getBookingsByStatus('ACCEPT', this.page, this.size);
        } else {
          this.getBookingsByStatus('PENDING', this.page, this.size);
        }
        if (response.message == 'ORDER UPDATE SUCCESFULLY') {
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }

  fetchCurrentBookings() {
    if (this.currentMenu === 'accepted') {
      this.getBookingsByStatus('ACCEPT', this.page, this.size);
    } else if (this.currentMenu === 'pending') {
      this.getBookingsByStatus('PENDING', this.page, this.size);
    } else if (this.currentMenu === 'completed') {
      this.getBookingsByStatus('COMPLETE', this.page, this.size);
    } else if (this.currentMenu === 'manully') {
      this.getBookingsByStatus('MANUAL', this.page, this.size);
    } else if (this.currentMenu === 'approve') {
      this.getBookingsByStatus('APPROVE', this.page, this.size);
    }
  }

  previousPage() {
    if (this.page >= 1) {
      this.page--;
      this.fetchCurrentBookings();
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.page++;
      this.fetchCurrentBookings();
    }
  }

  downloadBill(booking: any): void {
    this.pdfGeneratorService.generatePdf(
      booking,
      `bill-${booking.order1dto.order_id}.pdf`
    );
  }

  changeBookings(status: string) {
    this.ShowPagibtn = true;
    this.currentMenu = status;
    this.showDiv = true;
    this.page = 0;
    this.fetchCurrentBookings();
    this.showDiv = true;
  }

  AddExtraAmount(id: number) {
    let Obj = {
      order_id: id,
      extra_amount: this.amount,
    };

    this.userService.BookRoom(Obj).subscribe((data) => {});
  }

  hasNonPendingOrders(): boolean {
    return this.bookings.some(
      (booking) =>
        booking.order1dto.orderStatus !== 'PENDING' &&
        booking.order1dto.orderStatus !== 'MANUAL'
    );
  }
  hasNonCompletedOrders(): boolean {
    return this.bookings.some(
      (booking) => booking.order1dto.orderStatus == 'COMPLETE'
    );
  }

  handleInputs(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;

    if (type === 'date') {
      this.dateValue = input.value;
    } else if (type === 'room') {
      this.roomValue = input.value;
      this.TakeDateRoomNo(this.dateValue, this.roomValue);
    }
  }
  handleInputsGetbooking(event: Event): void {
    this.ShowPagibtn = false;
    const input = event.target as HTMLInputElement;

    const date = input.value;

    this.userService.showLoader();
    this.userService.getBookingsByDate(date).subscribe((data: any) => {
      this.userService.hideLoader();
      if (data.response != null) {
        this.bookings = data.response;
      } else {
        this.bookings = [];
      }
    });
  }

  TakeDateRoomNo(dateValue: string, roomValue: string): void {
    this.userService.showLoader();
    this.showDiv = true;

    this.userService.getEngageTime(dateValue, roomValue).subscribe((data) => {
      this.userService.hideLoader();

      if (data.response != null) {
        this.EngageTimeNoArray = data.response;
        this.showDiv = true;
      } else {
        this.toastr.show(data.message);
        this.EngageTimeNoArray = [];
        this.showDiv = true;
      }
    });
  }

  navigateBooking(id: any) {
    this.router.navigate(['/newBooking', 'order', id, '0']);
  }
  NavigateRooms() {
    this.router.navigate(['/userDashboardRoute']);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    const target = event.target as HTMLElement;
    const element = document.querySelector('.abs2') as HTMLElement;
    if (element && !element.contains(target)) {
      this.showDiv = false;
    }
  }
}
