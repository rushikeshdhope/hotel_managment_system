import { Component, OnDestroy, OnInit } from '@angular/core';
import { forgotPassClass, mainForgotPassclass, mainresclass, setNewPassClass } from 'src/model/user';
import { UserAdminCommonServiceService } from '../user-admin-common-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit, OnDestroy {
  mailTo : string='';
  Role :string ='';
  EamilContainer:boolean=true;
  OtpContainer:boolean=false;
  newPasswordContainer:boolean=false;
  newPasswordForm : FormGroup;

  ngOnInit(){
    this.loadState();
  }

  ngOnDestroy() {
    this.clearState();
  }
  private clearState() {
    sessionStorage.removeItem('forgotPasswordState');
    sessionStorage.removeItem('Mail');
    sessionStorage.removeItem('UserObject');
  }

  private saveState() {
    const state = {
      EamilContainer: this.EamilContainer,
      OtpContainer: this.OtpContainer,
      newPasswordContainer: this.newPasswordContainer
    };
    sessionStorage.setItem('forgotPasswordState', JSON.stringify(state));
  }

  private loadState() {
    const state = sessionStorage.getItem('forgotPasswordState');
    if (state) {
      const parsedState = JSON.parse(state);
      this.EamilContainer = parsedState.EamilContainer;
      this.OtpContainer = parsedState.OtpContainer;
      this.newPasswordContainer = parsedState.newPasswordContainer;
    }
  }

  constructor(private service : UserAdminCommonServiceService,private toastr: ToastrService, private route : Router,private fb: FormBuilder){
this.newPasswordForm = this.fb.group({
  user_password:['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).+$/)]] ,
  user_password_confirmation:['',[Validators.required]]
  
}

)
  }

  forgotPassObj : forgotPassClass = new forgotPassClass();

  sendOptFunTs(){
   
   this.service.sendOtpFun(this.forgotPassObj).subscribe((res : mainresclass)=>{
      if(res.message=="SEND OTP SUCCESFULLY on Email..!")
       {
         sessionStorage.setItem("Mail",this.forgotPassObj.mailTo);
        
        this.toastr.success(res.message);
        this.EamilContainer=false;
        this.OtpContainer=true;
        this.saveState();
      
        this.forgotPassObj.otpfrombackend=res.response.otp;
        const myObjectString = JSON.stringify(res.response);
        sessionStorage.setItem('UserObject', myObjectString);
        this.mailTo ='';

        }else
        {
         
          this.toastr.error(res.message);

        }
          
    
     
    },(error) => {
      
      console.error('Error in subscription:', error);
    })
  }

  verifyOtpFunTs(){
    if(this.forgotPassObj.otpfrombackend == this.forgotPassObj.otpFromFrontEnd){
      this.toastr.success("OTP Verified");
      this.forgotPassObj.otpFromFrontEnd=0;
      this.OtpContainer=false;
      this.newPasswordContainer=true;
      this.saveState();

      

    }else{
      this.forgotPassObj.otpFromFrontEnd=0;
      this.toastr.error("OTP is not matched please try again");
    }
  }


  changePasswordFunTs(){
   
    
    if(this.newPasswordForm.value.user_password==this.newPasswordForm.value.user_password_confirmation){

      const emailSession = sessionStorage.getItem("Mail");
      this.forgotPassObj.mailTo=emailSession;
     const userSessiodata= sessionStorage.getItem('UserObject');

     if (userSessiodata) {
     const userObject = JSON.parse(userSessiodata);
     const ForgotObj ={
      user_name:userObject.user_name,
      user_password:this.newPasswordForm.value.user_password,
      role:userObject.role
    }

   
    
    this.service.ForgotPassSet(ForgotObj).subscribe((res :mainresclass)=>{
     
      
      if(res.message=="UPDATE PASSWORD SUCCESFULLY..!")
        {
          this.forgotPassObj = new forgotPassClass();

          this.toastr.success(res.message);
          this.route.navigate(['/login'])
          
        }else{
          this.toastr.error(res.message);
        }
    },(error) => {
      
      
      console.error('Error in subscription:', error);
    })
     }

      }else{
      this.toastr.error("Password and Confirm Password is not matched");
    }
   

  }


  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

}
