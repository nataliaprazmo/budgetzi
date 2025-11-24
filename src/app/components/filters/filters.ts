import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransactionState } from '../../types/transaction-states.types';
import { selectExpenseCategories } from '../../store/transaction.selectors';
import { setTransactionFilters } from '../../store/transaction.actions';
import { MaterialModule } from '../../shared/material.module';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-filters',
  imports: [
    AsyncPipe,
    FormsModule,
    MaterialModule,
    MatDatepickerModule,
    MatDateRangeInput,
    MatDateRangePicker,
  ],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  type: 'all' | 'income' | 'expense' = 'all';
  category: string | 'all' | null = 'all';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  categories$: Observable<string[]>;
  isExpanded = false;

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.categories$ = this.store.select(selectExpenseCategories);
  }

  toggleDrawer() {
    this.isExpanded = !this.isExpanded;
  }

  applyFilters() {
    const filters: any = {
      type: this.type !== 'all' ? this.type : undefined,
      category: this.type === 'expense' && this.category !== 'all' ? this.category : undefined,
      fromDate: this.fromDate ?? undefined,
      toDate: this.toDate ?? undefined,
    };
    this.store.dispatch(setTransactionFilters({ filters }));
  }
}
