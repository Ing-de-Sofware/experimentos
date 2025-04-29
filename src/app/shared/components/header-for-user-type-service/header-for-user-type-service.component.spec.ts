import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderForUserTypeServiceComponent } from './header-for-user-type-service.component';

describe('HeaderForUserTypeServiceComponent', () => {
  let component: HeaderForUserTypeServiceComponent;
  let fixture: ComponentFixture<HeaderForUserTypeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderForUserTypeServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderForUserTypeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
