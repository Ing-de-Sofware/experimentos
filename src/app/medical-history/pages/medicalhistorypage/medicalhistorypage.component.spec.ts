import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalhistorypageComponent } from './medicalhistorypage.component';

describe('MedicalhistorypageComponent', () => {
  let component: MedicalhistorypageComponent;
  let fixture: ComponentFixture<MedicalhistorypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalhistorypageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalhistorypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
