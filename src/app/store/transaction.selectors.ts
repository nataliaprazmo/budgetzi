import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TransactionState } from '../types/transaction-states.types';

export const selectTransactionState = createFeatureSelector<TransactionState>('transaction');

export const selectAllTransactions = createSelector(
  selectTransactionState,
  (state) => state.transactions
);

export const selectTransactionsLoaded = createSelector(
  selectAllTransactions,
  (transactions) => Array.isArray(transactions) && transactions.length > 0
);

export const selectExpenseCategories = createSelector(selectAllTransactions, (transactions) =>
  transactions
    .filter((t) => t.type === 'expense' && 'category' in t)
    .map((t) => (t as any).category)
    .filter((v, i, a) => a.indexOf(v) === i)
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

export const selectExpensesByMonth = createSelector(selectFilteredTransactions, (transactions) => {
  const grouped: Record<string, number> = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthLabel = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });

      grouped[monthLabel] = (grouped[monthLabel] || 0) + transaction.amount;
    });

  return grouped;
});

export const selectIncomeByMonth = createSelector(selectFilteredTransactions, (transactions) => {
  const grouped: Record<string, number> = {};

  transactions
    .filter((t) => t.type === 'income')
    .forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthLabel = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });

      grouped[monthLabel] = (grouped[monthLabel] || 0) + transaction.amount;
    });

  return grouped;
});

export const selectChartData = createSelector(
  selectExpensesByMonth,
  selectIncomeByMonth,
  (expenses, income) => {
    const allMonths = new Set([...Object.keys(expenses), ...Object.keys(income)]);
    const sortedMonths = Array.from(allMonths).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    return {
      labels: sortedMonths,
      expenseData: sortedMonths.map((month) => expenses[month] || 0),
      incomeData: sortedMonths.map((month) => income[month] || 0),
    };
  }
);
