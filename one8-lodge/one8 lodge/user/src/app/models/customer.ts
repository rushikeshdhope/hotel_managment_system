export interface ForgotPasswordResponse {
  response: {
    user_name: string | null;
    role: string | null;
    otp: number;
  };
  status: boolean;
  message: string;
  statusCode: string;
}

export class mainresclass2 {
  message: string = '';
  response: any;
  status: boolean = false;
  Code: string = '';

}



export interface Customer {
  customer_id: number;
  customer_name: string;
  customer_mobile: string;

}

export interface Room {
  room_number: number;
  acPrice: { [key: string]: number };
  nonacPrice: { [key: string]: number };

}

export interface OrderData {
  date: string;
  intime: string;
  outtime: string;
  customers_id: number[];
  roomDetails: {
    room_number: number;
    is_ac: boolean;
    amount: number;
    duration: string;
  };
}



export interface Order {
  customer_name: string;
  customer_mobile: string;
  customer_email: string;
  identity_type: string;
  idenentify_number: string;
  customerFile: File | null;
  password: string;
  addresses: Address[];
  dob: string;
  relatedCustomer: RelatedCustomer[];
  relatedFile: File | null;
  date: string;
  intime: string;
  outtime: string;
  roomDetails: RoomDetails;
}

interface Address {
  line1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface RelatedCustomer {
  name: string;
  idenentifyType: string;
}

interface RoomDetails {
  room_number: string;
  duration: string;
  is_ac: boolean;
  amount: string;
}

export interface Booking {
customers1Dto: any;
order1dto: any;
relatedCustomer: any;
  room_number: any;
  customer_name: any;
    id: number;
    guestName: string;
    roomNumber: number;
    checkInDate: Date;
    checkOutDate: Date;
    status: string;
    response:any
  }



  export class roomObjClass 
{
    "images":any;
"room_id":number;
"image_link": any;
"description": string;
    "room_number":number;
    "room_category_id":number;
     "acPrice":{
        "Duration":any,

        "three_hour":number;
        "six_hour":number;
        "twelve_hour":number;
        "sixteen_hour":number;
        "twentyfour_hour":number;
        "full_night":number;
        


     };
     "nonacPrice":{
        "Duration":any,
        "three_hour":number;
        "six_hour":number;
        "twelve_hour":number;
        "sixteen_hour":number;
        "twentyfour_hour":number;
        "full_night":number;
        


     };
     "ac":boolean
    "roomStatus":any
}
