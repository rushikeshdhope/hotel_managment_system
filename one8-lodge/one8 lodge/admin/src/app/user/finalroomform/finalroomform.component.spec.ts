import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalroomformComponent } from './finalroomform.component';

describe('FinalroomformComponent', () => {
  let component: FinalroomformComponent;
  let fixture: ComponentFixture<FinalroomformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalroomformComponent]
    });
    fixture = TestBed.createComponent(FinalroomformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
