import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDoctorsPatientComponent } from './find-doctors-patient.component';

describe('FindDoctorsPatientComponent', () => {
  let component: FindDoctorsPatientComponent;
  let fixture: ComponentFixture<FindDoctorsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindDoctorsPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindDoctorsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
