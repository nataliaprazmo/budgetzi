import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeToggle } from './transaction-type-toggle';

describe('TransactionTypeToggle', () => {
  let component: TransactionTypeToggle;
  let fixture: ComponentFixture<TransactionTypeToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTypeToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTypeToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
