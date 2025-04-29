import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Role1Component } from './role1.component';

describe('Role1Component', () => {
  let component: Role1Component;
  let fixture: ComponentFixture<Role1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Role1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Role1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
