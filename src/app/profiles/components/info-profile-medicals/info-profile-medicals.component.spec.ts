import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfileMedicalsComponent } from './info-profile-medicals.component';

describe('InfoProfileMedicalsComponent', () => {
  let component: InfoProfileMedicalsComponent;
  let fixture: ComponentFixture<InfoProfileMedicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoProfileMedicalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProfileMedicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
