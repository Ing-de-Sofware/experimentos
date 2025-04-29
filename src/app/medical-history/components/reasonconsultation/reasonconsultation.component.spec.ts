import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonconsultationComponent } from './reasonconsultation.component';

describe('ReasonconsultationComponent', () => {
  let component: ReasonconsultationComponent;
  let fixture: ComponentFixture<ReasonconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReasonconsultationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReasonconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
