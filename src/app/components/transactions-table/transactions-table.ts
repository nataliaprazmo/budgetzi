import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { AsyncPipe, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Transaction } from '../../types/transaction.types';
import { Store } from '@ngrx/store';
import { TransactionState } from '../../types/transaction-states.types';
import { selectAllTransactions } from '../../store/transaction.selectors';

@Component({
  selector: 'app-transactions-table',
  imports: [
    MatTableModule,
    MatBadgeModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    AsyncPipe,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    MatChipsModule,
  ],
  templateUrl: './transactions-table.html',
  styleUrl: './transactions-table.scss',
})
export class TransactionsTable {
  transactions$: Observable<Transaction[]>;

  displayedColumns: string[] = ['type', 'title', 'description', 'category', 'amount', 'date'];

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.transactions$ = this.store.select(selectAllTransactions);
  }
}
