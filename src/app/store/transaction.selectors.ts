import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TransactionState } from '../types/transaction-states.types';

export const selectTransactionState = createFeatureSelector<TransactionState>('transaction');

export const selectAllTransactions = createSelector(
  selectTransactionState,
  (state) => state.transactions
);

export const selectTransactionLoading = createSelector(
  selectTransactionState,
  (state) => state.loading
);

export const selectTransactionFilters = createSelector(
  selectTransactionState,
  (state) => state.filters
);

export const selectFilteredTransactions = createSelector(
  selectAllTransactions,
  selectTransactionFilters,
  (transactions, filters) => {
    if (!filters) return transactions;
    return transactions.filter((transaction) => {
      if (filters.type && transaction.type !== filters.type) return false;

      if (filters.category && transaction.type === 'expense') {
        if ((transaction as any).category !== filters.category) return false;
      }

      if (filters.fromDate && new Date(transaction.date) < filters.fromDate) return false;
      if (filters.toDate && new Date(transaction.date) > filters.toDate) return false;

      return true;
    });
  }
);

export const selectTotalIncome = createSelector(selectAllTransactions, (transactions) =>
  transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
);

export const selectTotalExpenses = createSelector(selectAllTransactions, (transactions) =>
  transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
);

export const selectBalance = createSelector(
  selectTotalIncome,
  selectTotalExpenses,
  (income, expenses) => income - expenses
);

export const selectFilteredTotalIncome = createSelector(
  selectFilteredTransactions,
  (transactions) =>
    transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
);

export const selectFilteredTotalExpenses = createSelector(
  selectFilteredTransactions,
  (transactions) =>
    transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
);

export const selectFilteredBalance = createSelector(
  selectFilteredTotalIncome,
  selectFilteredTotalExpenses,
  (income, expenses) => income - expenses
);
