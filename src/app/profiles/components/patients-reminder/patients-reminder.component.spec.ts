import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsReminderComponent } from './patients-reminder.component';

describe('PatientsReminderComponent', () => {
  let component: PatientsReminderComponent;
  let fixture: ComponentFixture<PatientsReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsReminderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
