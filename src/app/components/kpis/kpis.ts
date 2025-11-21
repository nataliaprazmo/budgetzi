import { Component } from '@angular/core';
import { KpiCard } from '../kpi-card/kpi-card';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransactionState } from '../../types/transaction-states.types';
import {
  selectFilteredBalance,
  selectFilteredTotalExpenses,
  selectFilteredTotalIncome,
  selectMonthlySavingsRate,
} from '../../store/transaction.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-kpis',
  imports: [KpiCard, AsyncPipe],
  templateUrl: './kpis.html',
  styleUrl: './kpis.scss',
})
export class Kpis {
  totalExpenses$: Observable<number>;
  totalIncomes$: Observable<number>;
  totalBalance$: Observable<number>;
  monthlySavingsRate$: Observable<number>;

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.totalExpenses$ = this.store.select(selectFilteredTotalExpenses);

    this.totalIncomes$ = this.store.select(selectFilteredTotalIncome);

    this.totalBalance$ = this.store.select(selectFilteredBalance);

    this.monthlySavingsRate$ = this.store.select(selectMonthlySavingsRate);
  }
}
