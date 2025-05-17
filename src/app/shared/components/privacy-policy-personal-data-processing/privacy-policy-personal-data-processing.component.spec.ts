import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyPersonalDataProcessingComponent } from './privacy-policy-personal-data-processing.component';

describe('PrivacyPolicyPersonalDataProcessingComponent', () => {
  let component: PrivacyPolicyPersonalDataProcessingComponent;
  let fixture: ComponentFixture<PrivacyPolicyPersonalDataProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyPolicyPersonalDataProcessingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivacyPolicyPersonalDataProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
