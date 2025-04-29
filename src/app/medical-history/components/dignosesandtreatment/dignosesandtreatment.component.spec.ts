import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DignosesandtreatmentComponent } from './dignosesandtreatment.component';

describe('DignosesandtreatmentComponent', () => {
  let component: DignosesandtreatmentComponent;
  let fixture: ComponentFixture<DignosesandtreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DignosesandtreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DignosesandtreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
