import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../types/transaction.types';
import {
  clearAllTransactions,
  exportTransactions,
  importTransactionsFromCsv,
  loadTransactionsFromSample,
} from '../../store/transaction.actions';
import { TransactionState } from '../../types/transaction-states.types';
import { selectAllTransactions, selectTransactionLoading } from '../../store/transaction.selectors';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { ActionButtons } from '../action-buttons/action-buttons';
import { MaterialModule } from '../../shared/material.module';
import { BaseButton } from '../base-button/base-button';

@Component({
  selector: 'app-data-management',
  imports: [MaterialModule, AsyncPipe, MatSnackBarModule, ActionButtons, BaseButton],
  templateUrl: './data-management.html',
  styleUrl: './data-management.scss',
})
export class DataManagement {
  transactions$: Observable<Transaction[]>;
  loading$: Observable<undefined | boolean>;

  constructor(
    private store: Store<{ transaction: TransactionState }>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.transactions$ = store.select(selectAllTransactions);
    this.loading$ = store.select(selectTransactionLoading);
    this.store
      .select((state) => state.transaction)
      .subscribe((state) => {
        if (state.error) {
          this.showErrorMessage(`Error: ${state.error}`);
        } else if (state.transactions.length > 0) {
          this.showSuccessMessage('Transactions loaded successfully');
        }
      });
  }

  goToDashboard() {
    this.router.navigate(['/']);
  }

  importSample() {
    this.store.dispatch(loadTransactionsFromSample());
  }

  importCsv(file: File) {
    this.store.dispatch(importTransactionsFromCsv({ file }));
  }

  exportCsv() {
    this.store.dispatch(exportTransactions());
  }

  clearAllData() {
    const confirmed = window.confirm('Are you sure you want to clear all transactions?');
    if (!confirmed) return;
    this.store.dispatch(clearAllTransactions());
    this.showSuccessMessage('All transactions cleared');
  }

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['snackbar-error'] });
  }
}
