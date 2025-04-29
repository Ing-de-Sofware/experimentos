import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceAssignPatientComponent } from './space-assign-patient.component';

describe('SpaceAssignPatientComponent', () => {
  let component: SpaceAssignPatientComponent;
  let fixture: ComponentFixture<SpaceAssignPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceAssignPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpaceAssignPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
