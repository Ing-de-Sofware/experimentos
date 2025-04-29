import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleagueSearchComponent } from './colleague-search.component';

describe('ColleagueSearchComponent', () => {
  let component: ColleagueSearchComponent;
  let fixture: ComponentFixture<ColleagueSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColleagueSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColleagueSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
