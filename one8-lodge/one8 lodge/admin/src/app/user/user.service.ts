import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditRoomNameClass, getFoodTypeClass, mainresclass2, roomObjClass, SaveRoomNameClass } from 'src/model/admin';
import { AddCustomerClass, mainForgotPassclass, mainresclass } from 'src/model/user';
import { BehaviorSubject, Observable } from 'rxjs';   

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // http://localhost:1098/hotel_booking/v1/customers/test

  // https://one8lodge.mahaapp.online/hotel_booking/v1/admin/
  AdminApi='http://localhost:1098/hotel_booking/v1/admin/';
  CustomerApi='http://localhost:1098/hotel_booking/v1/customers/';
  RoomBook='http://localhost:1098/hotel_booking/v1/user/';
  bookingApi='http://localhost:1098/hotel_booking/v1/user/order/';
  roomImage='http://localhost:1098/hotel_booking/v1/admin/room/';
  // http://localhost:9091/hotel_booking/v1/admin/room/getAllRoom
 




  

  getRoomFun()
  {
  return this.http.get<mainresclass2>(this.AdminApi +"room_category/getAllRoomCategory");
  }

  getRoomCatUsingId(id : number){
    return this.http.get<mainresclass2>(this.AdminApi +"room_category/getRoomCategoryById/"+id);
  }
  getFoodCatUsingId(id : number){
    return this.http.get<mainresclass2>(this.AdminApi +"food_category/getFoodCategoryById/"+id);
  }

  EditRoomFun(EditedData : FormData ){
    console.log("newly data",EditedData);
    
    return this.http.post<mainresclass>(this.AdminApi+"room_category/saveOrUpdateRoomCategory",EditedData);
  }
AddSubCat(data : any){
  return this.http.post<roomObjClass>(this.AdminApi+"food/saveOrupdateFood",data)
}
  getFoodFun()
  {
  return this.http.get<mainresclass2>(this.AdminApi+"food_category/getAllFoodCategory");
  }
  getFoodSubCatFun(id : number)
  {
  return this.http.get<mainresclass2>(this.AdminApi+"food/getFoodByCategoryId/"+ id);
  }
  DeleteFoodSubCatFun(id : number)
  {
  return this.http.delete<mainresclass2>(this.AdminApi+"food/deleteFoodById/"+ id);
  }


  EditFoodFun(EditedData : getFoodTypeClass ){
    return this.http.post<mainresclass>(this.AdminApi+"food_category/saveOrUpdateFoodCategory",EditedData);
  }

  DeleteFoodFun(id : number ){
    return this.http.delete<mainresclass>(this.AdminApi+"food_category/deleteFoodCategoryById/"+id);
  }
  DeleteRoomFun(id : number ){
    return this.http.delete<mainresclass>(this.AdminApi+"room_category/deleteRoomCategoryById/"+id);
  }

  SaveRoomDetailFun(roomObj : FormData){
    console.log("serviceForm",roomObj);
    
    return this.http.post<mainresclass>(this.AdminApi+"room/saveOrupdateRoom",roomObj);
  }
  GetRoomDetailFun(id : number  ){
    console.log("id get",id);

    console.log("API",this.AdminApi+"room/getRoomByCategoryId/"+id);
    
    
    return this.http.get<mainresclass2>(this.AdminApi+"room/getRoomByCategoryId/"+id);
  }
  GetAllRoomDetailFun(  ){
   
    
    return this.http.get<mainresclass2>(this.AdminApi+"room/getAllRoom");
  }
  DeleteRoomDetailFun(id : number  ){
    console.log("id get",id);
    
    return this.http.delete<mainresclass2>(this.AdminApi+"room/deleteRoomById/"+id);
  }
  InsertCustomer(formData : FormData  ){
   // console.log("id get",formData);
    
    return this.http.post<mainresclass2>(this.CustomerApi+"saveCustomer",formData);
  }
  BookRoom(data : any  ){
   // console.log("id get",formData);
    
    return this.http.post<mainresclass2>(this.RoomBook+"order/saveOrupdateOrder",data);
  }

  getAllCustomers(page: number, size: number) {
    const url = `${this.CustomerApi + "getAllCustomer"}?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
  // getAllCustomersUsingId(id : number) {
  //   return this.http.get<mainresclass2>(this.RoomBook+"customers/getCustomerById"+ id);
  // }
  getCustomersUsingMob(mob_no : number) {
    const url = `${this.CustomerApi + "getCustomerByMobile"}?mobile=${mob_no}`;
    return this.http.get<any>(url);
  }
  getCustomersUsingRoom(roomNo : number) {
    const url = `${this.bookingApi + "getCurrentCustomerUsingRoomNo"}?roomNo=${roomNo}`;
    return this.http.get<any>(url);
  }
  getBookingsUsingMob(mobNo : string) {
    const url = `${this.bookingApi + "getAllOrderByCustomerMobileNo"}?parameter=${mobNo}`;
    console.log("url",url)
    return this.http.get<any>(url);
  }
  getFoodUsingSearch(foodName : number) {
    const url = `${this.AdminApi + "food/getFoodByName/"}${foodName}`;
    return this.http.get<any>(url);
  }


  GetCustomerById(id : number  ){
    console.log("id get",id);
    
    return this.http.get<mainresclass2>(this.CustomerApi+"getCustomerById/"+id);
  }
  getAllBooking(page: number, size: number) {
   
   
    const url = `${this.bookingApi + "getAllOrder"}?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
  getBookingDetail(id : number){
    return this.http.get<mainresclass2>(this.bookingApi+'getOrderById/'+id);
  }
  
  search(selectedMethod: string, searchedData: any) {
    let url: string = '';
    console.log("service",selectedMethod);
    console.log("service",searchedData);
    
  
    if (selectedMethod === 'mob_no') {
      url = `${this.CustomerApi}getCustomerByMobile?mobile=${searchedData}`;
    } else if (selectedMethod === 'Name') {
      url = `${this.CustomerApi}getCustomerByName?customerName=${searchedData}`;
    } else if (selectedMethod === 'adhar_no') {
      url = `${this.CustomerApi}getCustomerByIdNumber?id_number=${searchedData}`;
    }
  
    return this.http.get<any>(url);
  }


  getAllNotification() {
   
    return this.http.get<mainresclass2>(this.AdminApi+"room/getAllNotication");
  }
  getTotalDay() {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
console.log(" servise formattedDate",formattedDate); 
    
    const url = `${this.bookingApi + "getTheDailySale"}?Date=${formattedDate}`;
    return this.http.get<any>(url);
   
    // return this.http.get<mainresclass2>(this.AdminApi+"room/getAllNotication");
  }
  getTotalMonth() {
   
    const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11, so we add 1

const formattedDate = `${year}-${month}`;
console.log(formattedDate); 

    const url = `${this.bookingApi + "getTheMonthWiseSale"}?monthYear=${formattedDate}`;
    return this.http.get<any>(url);
  }


  getTotalYear() {
    const date = new Date();
const year = date.getFullYear();

console.log(year); // Output: 2024

   
const url = `${this.bookingApi + "getTheYearWiseSale"}?year=${year}`;
return this.http.get<any>(url);
  }
  getIncomeAllRoom(date : string) {
//     const date = new Date();
// const year = date.getFullYear();

// console.log(year); // Output: 2024

   
const url = `${this.bookingApi + "getTotalAmountsByBookingDate"}?bookingDate=${date}`;
return this.http.get<any>(url);
  }

  getTotalRoomWise() {
    const date = new Date();
const year = date.getFullYear();

console.log(year); // Output: 2024

   
const url = `${this.bookingApi + "getTheYearWiseSale"}?year=${year}`;
return this.http.get<any>(url);
  }
 
  getBookingsByStatus(orderStatus: string, page: number, size: number){
    return this.http.get(`${this.bookingApi+"getTheRoomsUsingOrderStatus"}?orderStatus=${orderStatus}&page=${page}&size=${size}`);
  }
  
  getEngageTime(date : string, RoomNo : string) {
    

   
const url = `${this.bookingApi + "getEngageTime"}?roomNumber=${RoomNo}&date=${date}`;
return this.http.get<any>(url);
  }
 
  NotificationView(obj : any) {
   
    return this.http.post<mainresclass2>(this.AdminApi+"room/updateNotification",obj);
  }
 
  updatestatus(data : FormData) {
   
    return this.http.post<mainresclass2>(this.bookingApi +"saveAllOrder",data);
  }
  roomImageSave(data : FormData) {
   
    return this.http.post<mainresclass2>(this.roomImage+"saveRoomImages" ,data);
  }
  roomImageDelete(id : number) {
   
    return this.http.delete<mainresclass2>(this.roomImage+"deleteRoomImageByRoomId/" + id);
  }
  AllRoomNoGet() {
   
    return this.http.get<mainresclass2>(this.roomImage+"getAllRoomNumber");
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  showLoader(): void {
    this.isLoadingSubject.next(true);
  }

  hideLoader(): void {
    this.isLoadingSubject.next(false);
  }


  getOrderOrderId(id : number){
    return this.http.get(`${this.bookingApi+"getOrderById/"}`+ id);
  }

  FilterDateIncome(date : string){
    const url = `${this.bookingApi + "getTotalAmountByBookingDate"}?bookingDate=${date}`;
    return this.http.get<any>(url);
  }

  ChangeRoomStatus(form : FormData){
  console.log("Service Data",form);
  
    return this.http.post<mainresclass2>(this.roomImage+"saveOrupdateRoom", form)

  
    
  }
  getBookingsByDate(date : string){
  console.log("Service Data",date);
  
    return this.http.get<mainresclass2>(this.bookingApi+"getAllOrderByBookingDate/"+ date)

  
    
  }
 
  
}
