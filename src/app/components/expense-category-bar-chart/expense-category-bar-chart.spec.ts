import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoryBarChart } from './expense-category-bar-chart';

describe('ExpenseCategoryBarChart', () => {
  let component: ExpenseCategoryBarChart;
  let fixture: ComponentFixture<ExpenseCategoryBarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseCategoryBarChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseCategoryBarChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
