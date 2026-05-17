import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderImagesComponent } from './slider-images.component';

describe('SliderImagesComponent', () => {
  let component: SliderImagesComponent;
  let fixture: ComponentFixture<SliderImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderImagesComponent]
    });
    fixture = TestBed.createComponent(SliderImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
