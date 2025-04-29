import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalexamsComponent } from './medicalexams.component';

describe('MedicalexamsComponent', () => {
  let component: MedicalexamsComponent;
  let fixture: ComponentFixture<MedicalexamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalexamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
