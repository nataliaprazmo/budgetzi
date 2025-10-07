import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Transaction } from '../../types/transaction.types';
import { Store } from '@ngrx/store';
import { TransactionState } from '../../types/transaction-states.types';
import { selectAllTransactions } from '../../store/transaction.selectors';
import { TransactionsTableFilters } from '../transactions-table-filters/transactions-table-filters';

@Component({
  selector: 'app-transactions-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    MatChipsModule,
    TransactionsTableFilters,
  ],
  templateUrl: './transactions-table.html',
  styleUrl: './transactions-table.scss',
})
export class TransactionsTable implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Transaction>();
  displayedColumns: string[] = ['type', 'title', 'description', 'category', 'amount', 'date'];
  selectedTypeFilter: 'all' | 'income' | 'expense' = 'all';
  selectedCategoryFilter: string = 'all';
  allTransactions: Transaction[] = [];
  availableCategories: string[] = [];

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.store.select(selectAllTransactions).subscribe((transactions) => {
      this.allTransactions = transactions;
      this.updateAvailableCategories();
      this.applyFilters();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateAvailableCategories() {
    const expenseTransactions = this.allTransactions.filter((t) => t.type === 'expense');
    const categories = expenseTransactions
      .map((t) => t.category)
      .filter((cat): cat is string => !!cat);
    this.availableCategories = [...new Set(categories)].sort();
  }

  applyFilters() {
    let filtered = this.allTransactions;

    if (this.selectedTypeFilter !== 'all') {
      filtered = filtered.filter((t) => t.type === this.selectedTypeFilter);
    }

    if (this.selectedTypeFilter === 'expense' && this.selectedCategoryFilter !== 'all') {
      filtered = filtered.filter((t) => t.category === this.selectedCategoryFilter);
    }

    this.dataSource.data = filtered;
  }

  setTypeFilter(type: 'all' | 'income' | 'expense') {
    this.selectedTypeFilter = type;
    if (type !== 'expense') {
      this.selectedCategoryFilter = 'all';
    }
    this.applyFilters();
  }

  setCategoryFilter(category: string) {
    this.selectedCategoryFilter = category;
    this.applyFilters();
  }
}
