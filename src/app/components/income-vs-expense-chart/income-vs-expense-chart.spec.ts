import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeVsExpenseChart } from './income-vs-expense-chart';

describe('IncomeVsExpenseChart', () => {
  let component: IncomeVsExpenseChart;
  let fixture: ComponentFixture<IncomeVsExpenseChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeVsExpenseChart],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeVsExpenseChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
