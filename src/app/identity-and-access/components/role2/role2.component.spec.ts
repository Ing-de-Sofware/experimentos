import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Role2Component } from './role2.component';

describe('Role2Component', () => {
  let component: Role2Component;
  let fixture: ComponentFixture<Role2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Role2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Role2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
