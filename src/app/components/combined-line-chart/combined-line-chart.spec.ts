import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedLineChart } from './combined-line-chart';

describe('CombinedLineChart', () => {
  let component: CombinedLineChart;
  let fixture: ComponentFixture<CombinedLineChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinedLineChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedLineChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
