import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionActionsCell } from './transaction-actions-cell';

describe('TransactionActionsCell', () => {
  let component: TransactionActionsCell;
  let fixture: ComponentFixture<TransactionActionsCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionActionsCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionActionsCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
