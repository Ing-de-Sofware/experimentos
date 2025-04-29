import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPatientComponent } from './treatment-patient.component';

describe('TreatmentPatientComponent', () => {
  let component: TreatmentPatientComponent;
  let fixture: ComponentFixture<TreatmentPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreatmentPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
