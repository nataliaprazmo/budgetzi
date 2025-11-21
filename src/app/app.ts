import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransactionState } from './types/transaction-states.types';
import { selectBalance } from './store/transaction.selectors';
import { ThemeService } from './services/theme.service';
import { MaterialModule } from './shared/material.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatToolbarModule,
    CurrencyPipe,
    AsyncPipe,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MaterialModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('💰 Budgetzi');
  totalBalance$: Observable<number>;

  constructor(
    private store: Store<{ transaction: TransactionState }>,
    protected themeService: ThemeService
  ) {
    this.totalBalance$ = this.store.select(selectBalance);
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }
}
