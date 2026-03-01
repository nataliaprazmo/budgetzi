import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAmountCell } from './transaction-amount-cell';

describe('TransactionAmountCell', () => {
  let component: TransactionAmountCell;
  let fixture: ComponentFixture<TransactionAmountCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionAmountCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionAmountCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
