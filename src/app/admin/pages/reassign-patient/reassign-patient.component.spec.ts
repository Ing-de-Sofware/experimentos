import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignPatientComponent } from './reassign-patient.component';

describe('ReassignPatientComponent', () => {
  let component: ReassignPatientComponent;
  let fixture: ComponentFixture<ReassignPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReassignPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReassignPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
