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
import { Charts } from '../charts/charts';
import { MatIconModule } from '@angular/material/icon';
import { BaseButton } from '../base-button/base-button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    DataManagement,
    Filters,
    Kpis,
    AsyncPipe,
    TransactionsTable,
    Charts,
    MatIconModule,
    BaseButton,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  isLoaded$: Observable<boolean>;

  constructor(private store: Store<{ transaction: TransactionState }>, private router: Router) {
    this.isLoaded$ = this.store.select(selectTransactionsLoaded);
  }

  onAddFirstTransaction() {
    this.router.navigate(['/add']);
  }
}
