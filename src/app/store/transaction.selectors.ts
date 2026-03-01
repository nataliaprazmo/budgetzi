import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TransactionState } from '../types/transaction-states.types';
import {
  calculateTotalByType,
  groupTransactionsByMonth,
  groupExpensesByCategory,
  calculateSavingsRate,
  getExpenseCategories,
  formatToMonthLabel,
} from '../lib/utils';

export const selectTransactionState = createFeatureSelector<TransactionState>('transaction');

export const selectAllTransactions = createSelector(
  selectTransactionState,
  (state) => state.transactions
);

export const selectTransactionById = (id: string) =>
  createSelector(selectAllTransactions, (transactions) =>
    transactions.find((t) => t.id === id)
  );

export const selectTransactionsLoaded = createSelector(
  selectAllTransactions,
  (transactions) => Array.isArray(transactions) && transactions.length > 0
);

export const selectExpenseCategories = createSelector(selectAllTransactions, (transactions) =>
  getExpenseCategories(transactions)
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
  calculateTotalByType(transactions, 'income')
);

export const selectTotalExpenses = createSelector(selectAllTransactions, (transactions) =>
  calculateTotalByType(transactions, 'expense')
);

export const selectBalance = createSelector(
  selectTotalIncome,
  selectTotalExpenses,
  (income, expenses) => income - expenses
);

export const selectFilteredTotalIncome = createSelector(
  selectFilteredTransactions,
  (transactions) =>
    calculateTotalByType(transactions, 'income')
);

export const selectFilteredTotalExpenses = createSelector(
  selectFilteredTransactions,
  (transactions) =>
    calculateTotalByType(transactions, 'expense')
);

export const selectFilteredBalance = createSelector(
  selectFilteredTotalIncome,
  selectFilteredTotalExpenses,
  (income, expenses) => income - expenses
);

export const selectExpensesByMonth = createSelector(selectFilteredTransactions, (transactions) => {
  return groupTransactionsByMonth(transactions, 'expense');
});

export const selectIncomeByMonth = createSelector(selectFilteredTransactions, (transactions) => {
  return groupTransactionsByMonth(transactions, 'income');
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

export const selectExpensesByCategory = createSelector(
  selectFilteredTransactions,
  (transactions) => {
    return groupExpensesByCategory(transactions);
  }
);

export const selectPieChartData = createSelector(selectExpensesByCategory, (expensesByCategory) => {
  const categories = Object.keys(expensesByCategory);
  const amounts = Object.values(expensesByCategory);

  return {
    labels: categories,
    data: amounts,
  };
});

export const selectMonthlySavingsRate = createSelector(
  selectFilteredTotalIncome,
  selectFilteredTotalExpenses,
  (income, expenses) => {
    return calculateSavingsRate(income, expenses);
  }
);
