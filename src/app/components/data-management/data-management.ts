import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../types/transaction.types';
import { loadTransactionsFromSample } from '../../store/transaction.actions';
import { TransactionState } from '../../types/transaction-states.types';
import { selectAllTransactions, selectTransactionLoading } from '../../store/transaction.selectors';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-data-management',
  imports: [MatCardModule, MatButtonModule, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './data-management.html',
  styleUrl: './data-management.css',
})
export class DataManagement {
  transactions$: Observable<Transaction[]>;
  loading$: Observable<undefined | boolean>;

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.transactions$ = store.select(selectAllTransactions);
    this.loading$ = store.select(selectTransactionLoading);
  }

  importSample() {
    this.store.dispatch(loadTransactionsFromSample());
  }
}
