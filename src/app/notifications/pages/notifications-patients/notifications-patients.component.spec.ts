import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPatientsComponent } from './notifications-patients.component';

describe('NotificationsPatientsComponent', () => {
  let component: NotificationsPatientsComponent;
  let fixture: ComponentFixture<NotificationsPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsPatientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
