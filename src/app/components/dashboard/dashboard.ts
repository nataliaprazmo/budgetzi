import { Component } from '@angular/core';
import { DataManagement } from '../data-management/data-management';
import { Kpis } from '../kpis/kpis';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTransactionsLoaded } from '../../store/transaction.selectors';
import { TransactionState } from '../../types/transaction-states.types';
import { AsyncPipe } from '@angular/common';
import { Filters } from '../filters/filters';
import { TransactionsTable } from '../transactions-table/transactions-table';

@Component({
  selector: 'app-dashboard',
  imports: [DataManagement, Filters, Kpis, AsyncPipe, TransactionsTable],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  isLoaded$: Observable<boolean>;

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.isLoaded$ = this.store.select(selectTransactionsLoaded);
  }
}
