import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrl: './standard.component.css'
})
export class StandardComponent implements OnInit {

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

