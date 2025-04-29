import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourpickerProfileColleagueComponent } from './hourpicker-profile-colleague.component';

describe('HourpickerProfileColleagueComponent', () => {
  let component: HourpickerProfileColleagueComponent;
  let fixture: ComponentFixture<HourpickerProfileColleagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HourpickerProfileColleagueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourpickerProfileColleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
