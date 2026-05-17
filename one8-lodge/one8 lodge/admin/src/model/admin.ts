export class getRoomTypeClass{
    room_category_id: number=0;
room_category_name : string='';
description: string='';
image_link :any;
}


export class mainresclass2 {
    message: string='';
    
response:any;
status:boolean=false;
Code :string='';

}
export class EditRoomNameClass
{
        room_category_id: number=0;
    room_category_name:string='';
}
export class SaveRoomNameClass
{
    description:string='';
    room_category_name:string='';
    file:any;
}





export class getFoodTypeClass{
    food_category_id: number=0;
    food_category_name : string='';

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
        "nine_hour":number;
        "twelve_hour":number;
        "sixteen_hour":number;
        "twentyfour_hour":number;
        "full_night":number;
        


     };
     "nonacPrice":{
        "Duration":any,
        "three_hour":number;
        "six_hour":number;
        "nine_hour":number;
        "twelve_hour":number;
        "sixteen_hour":number;
        "twentyfour_hour":number;
        "full_night":number;
        


     };
     "ac":boolean
    "roomStatus":any
}

