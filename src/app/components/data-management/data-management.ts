import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
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
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-data-management',
  imports: [MatCardModule, MatButtonModule, AsyncPipe, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './data-management.html',
  styleUrl: './data-management.css',
})
export class DataManagement {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  transactions$: Observable<Transaction[]>;
  loading$: Observable<undefined | boolean>;

  constructor(
    private store: Store<{ transaction: TransactionState }>,
    private snackBar: MatSnackBar
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

  importSample() {
    this.store.dispatch(loadTransactionsFromSample());
  }

  importCsv() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (!file) return;

      this.store.dispatch(importTransactionsFromCsv({ file }));
      input.value = '';
    }
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
