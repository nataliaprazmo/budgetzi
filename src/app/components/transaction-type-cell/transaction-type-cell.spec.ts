import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeCell } from './transaction-type-cell';

describe('TransactionTypeCell', () => {
  let component: TransactionTypeCell;
  let fixture: ComponentFixture<TransactionTypeCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTypeCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTypeCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
