import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitSalesChartComponent } from './visit-sales-chart.component';

describe('VisitSalesChartComponent', () => {
  let component: VisitSalesChartComponent;
  let fixture: ComponentFixture<VisitSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitSalesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
