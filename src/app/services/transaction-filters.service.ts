import { Injectable } from '@angular/core';
import { Transaction } from '../types/transaction.types';

@Injectable({
  providedIn: 'root',
})
export class TransactionFilterService {
  getAvailableCategories(transactions: Transaction[]): string[] {
    const expenseTransactions = transactions.filter((t) => t.type === 'expense');
    const categories = expenseTransactions
      .map((t) => t.category)
      .filter((cat): cat is string => !!cat);
    return [...new Set(categories)].sort();
  }

  applyFilters(
    transactions: Transaction[],
    typeFilter: 'all' | 'income' | 'expense',
    categoryFilter: string
  ): Transaction[] {
    let filtered = transactions;

    if (typeFilter !== 'all') {
      filtered = filtered.filter((t) => t.type === typeFilter);
    }

    if (typeFilter === 'expense' && categoryFilter !== 'all') {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    return filtered;
  }
}
