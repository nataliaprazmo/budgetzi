import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransactionState } from './types/transaction-states.types';
import { selectFilteredBalance } from './store/transaction.selectors';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    AsyncPipe,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('💰 Budgetzi');
  totalBalance$: Observable<number>;

  constructor(private store: Store<TransactionState>) {
    this.totalBalance$ = this.store.select(selectFilteredBalance);
  }
}
