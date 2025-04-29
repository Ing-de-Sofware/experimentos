import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPatiensComponent } from './search-patiens.component';

describe('SearchPatiensComponent', () => {
  let component: SearchPatiensComponent;
  let fixture: ComponentFixture<SearchPatiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPatiensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchPatiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
