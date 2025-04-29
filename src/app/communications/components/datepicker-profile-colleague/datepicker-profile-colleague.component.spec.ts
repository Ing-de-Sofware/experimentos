import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerProfileColleagueComponent } from './datepicker-profile-colleague.component';

describe('DatepickerProfileColleagueComponent', () => {
  let component: DatepickerProfileColleagueComponent;
  let fixture: ComponentFixture<DatepickerProfileColleagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatepickerProfileColleagueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatepickerProfileColleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
