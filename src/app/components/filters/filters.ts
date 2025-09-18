import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerModule,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransactionState } from '../../types/transaction-states.types';
import { selectExpenseCategories } from '../../store/transaction.selectors';
import { setTransactionFilters } from '../../store/transaction.actions';

@Component({
  selector: 'app-filters',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatNativeDateModule,
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

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.categories$ = this.store.select(selectExpenseCategories);
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
