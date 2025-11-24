import { Component } from '@angular/core';
import { Kpis } from '../kpis/kpis';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectTransactionLoading,
  selectTransactionsLoaded,
} from '../../store/transaction.selectors';
import { TransactionState } from '../../types/transaction-states.types';
import { AsyncPipe } from '@angular/common';
import { TransactionsTable } from '../transactions-table/transactions-table';
import { Charts } from '../charts/charts';
import { SkeletonKpiCard } from '../skeleton-kpi-card/skeleton-kpi-card';
import { MaterialModule } from '../../shared/material.module';
import { RouterModule } from '@angular/router';
import { Filters } from '../filters/filters';

@Component({
  selector: 'app-dashboard',
  imports: [
    Kpis,
    AsyncPipe,
    TransactionsTable,
    Charts,
    MaterialModule,
    SkeletonKpiCard,
    RouterModule,
    Filters,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  isLoaded$: Observable<boolean>;
  loading$: Observable<undefined | boolean>;

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.isLoaded$ = this.store.select(selectTransactionsLoaded);
    this.loading$ = this.store.select(selectTransactionLoading);
  }
}
