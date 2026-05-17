import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Booking, ForgotPasswordResponse } from './models/customer';
import { mainresclass2, roomObjClass } from './models/customer';
import { Order } from './models/customer';

@Injectable({
  providedIn: 'root'
})
export class HotleservicesService {
  private imageslider = 'http://localhost:1098/hotel_booking/v1/user/sliderimage/getAllSliderImage';
  private getallrooms = 'http://localhost:1098/hotel_booking/v1/admin/room_category/getAllRoomCategory';
  private getroombyid = 'http://localhost:1098/hotel_booking/v1/admin/room/getRoomByCategoryId/';
  private roomdetails = 'http://localhost:1098/hotel_booking/v1';
  private userregistration = 'http://localhost:1098/hotel_booking/v1/customers/saveCustomer';
  private userlogin = 'http://localhost:1098/hotel_booking/v1/customers/loginCustomer';

  private password = 'http://localhost:1098/hotel_booking/v1/customers';
  AdminApi = 'http://localhost:1098/hotel_booking/v1/admin/';
  CustomerApi = 'http://localhost:1098/hotel_booking/v1/customers/';

  RoomBook = 'http://localhost:1098/hotel_booking/v1/user/';

  private time = 'http://localhost:1098/hotel_booking/v1/user/order/getEngageTime';

  private apiUrl = 'http://localhost:1098/hotel_booking/v1/user/order/saveAllOrder';
  private roomdata = 'http://localhost:1098/hotel_booking/v1/admin/room/getAllRoom';
  private profileGet = 'http://localhost:1098/hotel_booking/v1/customers';
  private profileUpdate = 'http://localhost:1098/hotel_booking/v1/customers/saveCustomer';
  userBookingsUrl = 'http://localhost:1098/hotel_booking/v1/user/order/getAllOrderByCustomerMobileNo?mobileNo='
  notifications = 'http://localhost:1098/hotel_booking/v1/admin/room';
  private baseUrl = 'http://localhost:1098/hotel_booking/v1/admin/room';
  paymentApi = 'http://localhost:1098/hotel_booking/v1/user/order/saveAllOrder';


  // http://localhost:1098/hotel_booking/v1/customers/test

  isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor(private http: HttpClient) { }


  getNotificationsByCustomerId(customerId: number): Observable<any> {
    const url = `${this.notifications}/getAllNoticationByCustomerId?customerId=${customerId}`;
    return this.http.get<any>(url);
  }


  updateNotification(params: { notification_id: number, is_view: boolean }): Observable<{ status: boolean, message: string, statusCode: string }> {
    const url = `${this.baseUrl}/updateNotification`;
    return this.http.post<{ status: boolean, message: string, statusCode: string }>(url, params);
  }


  BookRoom(data: any) {
    // console.log("id get",formData);

    return this.http.post<mainresclass2>(this.RoomBook + "order/saveOrupdateOrder", data);
  }


  getSliderImages(): Observable<any> {
    return this.http.get<any>(this.imageslider);
  }

  getAllRoomCategories(): Observable<any> {
    return this.http.get<any>(this.getallrooms);
  }

  getRoomByCategoryId(categoryId: string): Observable<any> {
    return this.http.get<any>(this.getroombyid + categoryId);
  }

  getRoomDetails(roomId: string): Observable<any> {
    return this.http.get<any>(`${this.roomdetails}/admin/room/getRoomById/${roomId}`);
  }

  saveCustomer(formData: FormData): Observable<any> {
    return this.http.post(this.userregistration, formData);
  }


  loginCustomer(credentials: { user_name: string, user_password: string }): Observable<any> {
    return this.http.post<any>(this.userlogin, credentials);
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    const url = `${this.password}/sendEmail`;
    const body = { mailTo: email };
    return this.http.post<any>(url, body);
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    const url = `${this.password}/forgetPassword`;
    const body = { user_name: email, user_password: newPassword };
    return this.http.post<any>(url, body);
  }


  GetAllRoomDetailFun() {


    return this.http.get<mainresclass2>(this.AdminApi + "room/getAllRoom");
  }

  getCustomersUsingMob(mob_no: string) {
    const url = `${this.CustomerApi + "getCustomerByMobile"}?mobile=${mob_no}`;
    return this.http.get<any>(url);
  }

  getEngageTime(date: string, roomNumber: string): Observable<any> {
    let params = new HttpParams().set('date', date).set('roomNumber', roomNumber);

    return this.http.get<any>(this.time, { params });
  }
  saveOrder(order: any): Observable<any> {
    console.log("service", order);

    return this.http.post<Order>(this.apiUrl, order);
  }
  getAllRooms(): Observable<any> {
    return this.http.get<any>(this.roomdata);
  }

  getCustomerById(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.profileGet}/getCustomerById/${customerId}`);
  }

  updateCustomerProfile(formData: FormData): Observable<any> {
    return this.http.post<any>(this.profileUpdate, formData);
  }

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('logincustomerId');
  }

  logoutCustomer(): void {
    localStorage.removeItem('logincustomerId');
    this.isLoggedInSubject.next(false); // Notify observers
  }

  getUserBookings(mobileNo: any): Observable<Booking[]> {
  return this.http.get<Booking[]>(`${this.userBookingsUrl}${mobileNo}`);
  }

  payment(formData: FormData): Observable<any> {
    return this.http.post(this.paymentApi, formData);
  }

}