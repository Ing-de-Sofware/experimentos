import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalhistoryComponent } from './clinicalhistory.component';

describe('ClinicalhistoryComponent', () => {
  let component: ClinicalhistoryComponent;
  let fixture: ComponentFixture<ClinicalhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClinicalhistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
