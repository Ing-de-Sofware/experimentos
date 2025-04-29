import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPatientViewComponent } from './calendar-patient-view.component';

describe('CalendarPatientComponent', () => {
  let component: CalendarPatientViewComponent;
  let fixture: ComponentFixture<CalendarPatientViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarPatientViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarPatientViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
