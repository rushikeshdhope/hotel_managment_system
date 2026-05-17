import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HotleservicesService } from '../hotleservices.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @ViewChild('roomTypesSection1') roomTypesSection1!: ElementRef;
  @ViewChild('roomTypesSection2') roomTypesSection2!: ElementRef;

  sliderImages: string[] = [];
  currentSlideIndex = 0;
  roomCategories: any[] = [];

  icons = [
    { class: 'fas fa-parking', name: 'Parking' },
    { class: 'fas fa-clock', name: '24 Hours Check In' },
    { class: 'fas fa-concierge-bell', name: 'Room Service' },
    { class: 'fas fa-broom', name: 'Cleaning Service' },
    { class: 'fas fa-box-tissue', name: 'Tissue Box' },
    { class: 'fas fa-tv', name: 'Smart Television' },
    { class: 'fas fa-coffee', name: 'Kettle' },
    { class: 'fas fa-bath', name: 'Bathtub' },
    { class: 'fas fa-shower', name: 'Shower' },
    { class: 'fas fa-hot-tub', name: 'Hot Water' },
    { class: 'fas fa-wind', name: 'AC' },
    { class: 'fas fa-bell-concierge', name: 'Concierge' },
    { class: 'fas fa-glass-whiskey', name: 'Complimentary Water' },
    { class: 'fas fa-soap', name: 'Complimentary Toiletries' },
    { class: 'fas fa-tree', name: 'Nature View' },
  ];

  constructor(private hotelService: HotleservicesService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    Aos.init();
    this.hotelService.getSliderImages().subscribe(
      (data: any) => {
        if (data && data.response) {
          this.sliderImages = data.response.map((item: any) => item.image_link);
          this.startSlider();
          console.log("res",data);
        } else {
          console.error('Unexpected API response format:', data);
        }
      },
      (error) => {
        console.error('Error fetching slider images', error);
      }
    );

    this.hotelService.getAllRoomCategories().subscribe(
      (data: any) => {
        this.roomCategories = data.response;
      },
      (error) => {
        console.error('Error fetching room categories', error);
      }
    );
  }

  startSlider(): void {
    setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.sliderImages.length;
    }, 2000); 
  }

  navigateRoomDetail(id: number): void {
    this.router.navigate(['/luxary', id]);
  }

  scrollToRooms() {
    console.log("Scroll");
    
    this.roomTypesSection1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.roomTypesSection2.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
