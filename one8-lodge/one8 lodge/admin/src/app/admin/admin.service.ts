import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditRoomNameClass, getFoodTypeClass, mainresclass2, roomObjClass, SaveRoomNameClass } from 'src/model/admin';
import { mainForgotPassclass, mainresclass } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  // AdminApi='http://localhost:1098/hotel_booking/v1/admin/';
  // bookingApi='http://localhost:1098/hotel_booking/v1/user/order/';
  AdminApi='http://localhost:1098/hotel_booking/v1/admin/';
bookingApi='http://localhost:1098/hotel_booking/v1/user/order/';
 

  
  getRoomFun()
  {
  return this.http.get<mainresclass2>(this.AdminApi +"room_category/getAllRoomCategory");
  }

  EditRoomFun(EditedData : SaveRoomNameClass ){
    console.log("newly data",EditedData);
    
    return this.http.post<mainresclass>(this.AdminApi+"room_category/saveOrUpdateRoomCategory",EditedData);
  }

  getFoodFun()
  {
  return this.http.get<mainresclass2>(this.AdminApi+"food_category/getAllFoodCategory");
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

  SaveRoomDetailFun(roomObj : roomObjClass  ){
    console.log("serviceForm",roomObj);
    
    return this.http.post<mainresclass>(this.AdminApi+"room/saveOrupdateRoom",roomObj);
  }
  GetRoomDetailFun(id : number  ){
    console.log("id get",id);
    
    return this.http.get<mainresclass2>(this.AdminApi+"room/getRoomByCategoryId/"+id);
  }
  DeleteRoomDetailFun(id : number  ){
    console.log("id get",id);
    
    return this.http.delete<mainresclass2>(this.AdminApi+"room/deleteRoomById/"+id);
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

  getAllNotification() {
   
    return this.http.get<mainresclass2>(this.AdminApi+"room/getAllNotication");
  }

  GetAllRoomDetailFun(  ){
   
    
    return this.http.get<mainresclass2>(this.AdminApi+"room/getAllRoom");
  }

  getRoomCatUsingId(id : number){
    return this.http.get<mainresclass2>(this.AdminApi +"room_category/getRoomCategoryById/"+id);
  }

  FilterDateIncome(date : string){
    const url = `${this.bookingApi + "getTotalAmountByBookingDate"}?bookingDate=${date}`;
    return this.http.get<any>(url);
  }
 
}
