import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorViewColleagueComponent } from './doctor-view-colleague.component';

describe('DoctorViewColleagueComponent', () => {
  let component: DoctorViewColleagueComponent;
  let fixture: ComponentFixture<DoctorViewColleagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorViewColleagueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorViewColleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
