import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-transactions-table-filters',
  imports: [MatChipsModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './transactions-table-filters.html',
  styleUrl: './transactions-table-filters.scss',
})
export class TransactionsTableFilters {
  @Input() selectedTypeFilter: 'all' | 'income' | 'expense' = 'all';
  @Input() selectedCategoryFilter: string = 'all';
  @Input() availableCategories: string[] = [];

  @Output() typeFilterChange = new EventEmitter<'all' | 'income' | 'expense'>();
  @Output() categoryFilterChange = new EventEmitter<string>();

  onTypeFilterChange(type: 'all' | 'income' | 'expense') {
    this.selectedTypeFilter = type;
    this.typeFilterChange.emit(type);
  }

  onCategoryFilterChange(category: string) {
    this.selectedCategoryFilter = category;
    this.categoryFilterChange.emit(category);
  }
}
