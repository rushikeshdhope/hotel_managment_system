import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitbalconyComponent } from './suitbalcony.component';

describe('SuitbalconyComponent', () => {
  let component: SuitbalconyComponent;
  let fixture: ComponentFixture<SuitbalconyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuitbalconyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuitbalconyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
