import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotleservicesService } from '../hotleservices.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-luxury',
  templateUrl: './luxury.component.html',
  styleUrls: ['./luxury.component.css']
})
export class LuxuryComponent implements OnInit {
  roomDetails: {
    description: string;
    image_link: string;
    room_number: string;
    roomStatus: string;
    room_id: number; 
  }[] = [];
  categoryId: any;

  constructor(private route: ActivatedRoute, private hotelService: HotleservicesService,private router:Router) { }

  ngOnInit(): void {
    Aos.init();
    this.route.params.subscribe(params=>{ 
  
      console.log("result",params)
      this.categoryId = params['id'];
      console.log("id ", this.categoryId);
    })
    this.getsubcatRooms(this.categoryId);

   
  
    this.initializeGallery();
    
  }

  getsubcatRooms(categoryId: string): void {
    this.hotelService.getRoomByCategoryId(categoryId).subscribe(
      (data) => {
    
        if (data && data.response) {
          this.roomDetails = data.response.map((room: any) => ({
            room_number: room.room_number,
            roomStatus: room.roomStatus,
            image_link: room.images.length > 0 ? room.images[0].img_link : '',
            description: room.description,
            room_id: room.room_id 
          }));
        } else {
          console.error('Unexpected API response format:', data);
        }
      },
      (error) => {
        console.error('Error fetching room details', error);
      }
    );
  }
  
  

  initializeGallery(): void {
    const images = document.querySelectorAll('.gallery-image');
    const modal = document.getElementById('image-modal') as HTMLElement;
    const modalImg = document.getElementById('modal-image') as HTMLImageElement;

    images.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = (img as HTMLImageElement).src;
      });
    });

    modal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
  navigateRoomDetail(roomId: number): void {
    if (roomId) {
      console.log('Navigating to room details with ID:', roomId); 
      this.router.navigate(['/room-details', roomId]);
    } else {
      console.error('Room ID is undefined or null');
    }
  }
  
}