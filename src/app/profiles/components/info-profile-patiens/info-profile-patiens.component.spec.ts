import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfilePatiensComponent } from './info-profile-patiens.component';

describe('InfoProfilePatiensComponent', () => {
  let component: InfoProfilePatiensComponent;
  let fixture: ComponentFixture<InfoProfilePatiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoProfilePatiensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProfilePatiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
