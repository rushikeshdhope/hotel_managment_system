import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suitbalcony',
  templateUrl: './suitbalcony.component.html',
  styleUrl: './suitbalcony.component.css'
})
export class SuitbalconyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initializeGallery();
  }

  initializeGallery(): void {
    const images = document.querySelectorAll('.gallery-image');
    const modal = document.getElementById('image-modal') as HTMLElement;
    const modalImg = document.getElementById('modal-image') as HTMLImageElement;

    images.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = (img as HTMLImageElement).src; // Cast img to HTMLImageElement
      });
    });

    modal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
}

