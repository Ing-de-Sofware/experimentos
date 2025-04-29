import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardProfilePatiensComponent } from './info-card-profile-patiens.component';

describe('InfoCardProfilePatiensComponent', () => {
  let component: InfoCardProfilePatiensComponent;
  let fixture: ComponentFixture<InfoCardProfilePatiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoCardProfilePatiensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCardProfilePatiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
