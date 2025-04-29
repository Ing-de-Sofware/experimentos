import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoPatientsComponent } from './photo-patients.component';

describe('PhotoPatientsComponent', () => {
  let component: PhotoPatientsComponent;
  let fixture: ComponentFixture<PhotoPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoPatientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
