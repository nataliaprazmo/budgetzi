import { Component } from '@angular/core';
import { DataManagement } from '../data-management/data-management';
import { Kpis } from '../kpis/kpis';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTransactionsLoaded } from '../../store/transaction.selectors';
import { TransactionState } from '../../types/transaction-states.types';
import { AsyncPipe } from '@angular/common';
import { TransactionsTable } from '../transactions-table/transactions-table';
import { Charts } from '../charts/charts';
import { Router } from '@angular/router';
import { SkeletonKpiCard } from '../skeleton-kpi-card/skeleton-kpi-card';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-dashboard',
  imports: [
    DataManagement,
    Kpis,
    AsyncPipe,
    TransactionsTable,
    Charts,
    MaterialModule,
    SkeletonKpiCard,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  isLoaded$: Observable<boolean>;

  constructor(private store: Store<{ transaction: TransactionState }>, private router: Router) {
    this.isLoaded$ = this.store.select(selectTransactionsLoaded);
  }
}
