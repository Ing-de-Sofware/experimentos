import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsPendingTaskComponent } from './patients-pending-task.component';

describe('PatientsPendingTaskComponent', () => {
  let component: PatientsPendingTaskComponent;
  let fixture: ComponentFixture<PatientsPendingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsPendingTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsPendingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
