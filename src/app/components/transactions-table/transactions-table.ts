import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { Transaction } from '../../types/transaction.types';
import { deleteTransaction } from '../../store/transaction.actions';
import { Store } from '@ngrx/store';
import { TransactionState } from '../../types/transaction-states.types';
import { selectAllTransactions } from '../../store/transaction.selectors';
import { TransactionsTableFilters } from '../transactions-table-filters/transactions-table-filters';
import { TransactionTypeCell } from '../transaction-type-cell/transaction-type-cell';
import { TransactionAmountCell } from '../transaction-amount-cell/transaction-amount-cell';
import { TransactionActionsCell } from '../transaction-actions-cell/transaction-actions-cell';
import { TransactionFilterService } from '../../services/transaction-filters.service';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialModule,
    DatePipe,
    TransactionsTableFilters,
    TransactionTypeCell,
    TransactionAmountCell,
    TransactionActionsCell,
  ],
  templateUrl: './transactions-table.html',
  styleUrl: './transactions-table.scss',
})
export class TransactionsTable implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Transaction>();
  displayedColumns: string[] = [
    'type',
    'title',
    'description',
    'category',
    'amount',
    'date',
    'actions',
  ];

  selectedTypeFilter: 'all' | 'income' | 'expense' = 'all';
  selectedCategoryFilter: string = 'all';
  allTransactions: Transaction[] = [];
  availableCategories: string[] = [];

  constructor(
    private store: Store<{ transaction: TransactionState }>,
    private filterService: TransactionFilterService
  ) {
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

  onDelete(id: string) {
    this.store.dispatch(deleteTransaction({ id }));
  }

  updateAvailableCategories() {
    this.availableCategories = this.filterService.getAvailableCategories(this.allTransactions);
  }

  applyFilters() {
    const filtered = this.filterService.applyFilters(
      this.allTransactions,
      this.selectedTypeFilter,
      this.selectedCategoryFilter
    );
    this.dataSource.data = filtered;
    this.dataSource.sort = this.sort;
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
