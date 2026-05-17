export class mainresclass {
    message: string='';
    
response!:{
    role:string;
    otp:any;
};
status:boolean=false;
Code :string='';

}


export class forgotPassClass{
    mailTo : any;
    otpFromFrontEnd : number=0;
  otpfrombackend : number=0; 
  newPassword : any;
  comfirmPassword : any;

}
export class forgotPassClass2{
    mailTo : any;
   

}

export class  setNewPassClass{
    user_name : any;
    user_password :any;
    role : any;
}


export class mainForgotPassclass {
    message: string='';
    
response:number=0
status:boolean=false;
Code :string='';

}

export class AddCustomerClass {
    customer_name:string='';
    "customer_mobile":number
    "customer_email":any
    "identity_type":any
    "idenetity_number":number
}

