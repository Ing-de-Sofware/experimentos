import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalreportsComponent } from './externalreports.component';

describe('ExternalreportsComponent', () => {
  let component: ExternalreportsComponent;
  let fixture: ComponentFixture<ExternalreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternalreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
