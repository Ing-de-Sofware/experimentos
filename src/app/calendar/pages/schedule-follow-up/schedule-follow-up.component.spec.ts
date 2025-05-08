import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFollowUpComponent } from './schedule-follow-up.component';

describe('ScheduleFollowUpComponent', () => {
  let component: ScheduleFollowUpComponent;
  let fixture: ComponentFixture<ScheduleFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleFollowUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
