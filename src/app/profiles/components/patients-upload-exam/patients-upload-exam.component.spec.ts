import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsUploadExamComponent } from './patients-upload-exam.component';

describe('PatientsUploadExamComponent', () => {
  let component: PatientsUploadExamComponent;
  let fixture: ComponentFixture<PatientsUploadExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsUploadExamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsUploadExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
