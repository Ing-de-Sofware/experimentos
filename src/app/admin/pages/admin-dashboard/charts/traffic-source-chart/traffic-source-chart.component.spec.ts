import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficSourceChartComponent } from './traffic-source-chart.component';

describe('TrafficSourceChartComponent', () => {
  let component: TrafficSourceChartComponent;
  let fixture: ComponentFixture<TrafficSourceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficSourceChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrafficSourceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
