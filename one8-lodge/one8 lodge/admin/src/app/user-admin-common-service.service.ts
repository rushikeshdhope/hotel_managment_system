import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forgotPassClass, mainForgotPassclass, mainresclass, setNewPassClass } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserAdminCommonServiceService {
  SendOtpApi ='http://localhost:1098/hotel_booking/v1/user/sendEmail';
  ForgotOtpSetApi='http://localhost:1098/hotel_booking/v1/user/forgetPassword';
  sliderImage='http://localhost:1098/hotel_booking/v1/user/';
  
  

  constructor(private http : HttpClient) { }


  sendOtpFun(forgotPassObj : forgotPassClass ){
return this.http.post<mainresclass>(this.SendOtpApi, forgotPassObj);
  }

  ForgotPassSet(NewPassObj:setNewPassClass){
    return this.http.post<mainresclass>(this.ForgotOtpSetApi,NewPassObj)
  }

  saveSliderImages(data:FormData){
    return this.http.post<mainresclass>(this.sliderImage +"sliderimage/saveSliderImage",data)
  }
  getSliderImages(){
    return this.http.get<mainresclass>(this.sliderImage +"sliderimage/getAllSliderImage")
  }
  deleteSliderImages(id:any){
    return this.http.delete<mainresclass>(this.sliderImage +"sliderimage/deleteSliderImageById/"+id)
  }
}
