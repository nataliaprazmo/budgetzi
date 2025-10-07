import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTableFilters } from './transactions-table-filters';

describe('TransactionsTableFilters', () => {
  let component: TransactionsTableFilters;
  let fixture: ComponentFixture<TransactionsTableFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsTableFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsTableFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
