import { createReducer, on } from '@ngrx/store';
import * as TransactionActions from './transaction.actions';
import { initialState } from '../types/transaction-states.types';

export const transactionReducer = createReducer(
  initialState,

  on(TransactionActions.addTransaction, (state, { transaction }) => {
    const newTransactions = [...state.transactions, transaction];
    return { ...state, transactions: newTransactions };
  }),

  on(TransactionActions.deleteTransaction, (state, { id }) => {
    const newTransactions = state.transactions.filter((t) => t.id !== id);
    return { ...state, transactions: newTransactions };
  }),

  on(TransactionActions.setTransactionFilters, (state, { filters }) => ({
    ...state,
    filters,
  })),

  on(TransactionActions.loadTransactionsFromLocalStorage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TransactionActions.loadTransactionsFromLocalStorageSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false,
  })),
  on(TransactionActions.loadTransactionsFromLocalStorageFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TransactionActions.importTransactionsFromCsv, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TransactionActions.importTransactionsFromCsvSuccess, (state, { transactions }) => {
    const mergedTransactions = [...state.transactions, ...transactions];
    return { ...state, transactions: mergedTransactions, loading: false };
  }),
  on(TransactionActions.importTransactionsFromCsvFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TransactionActions.exportTransactions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TransactionActions.exportTransactionsSuccess, (state) => ({ ...state, loading: false })),
  on(TransactionActions.exportTransactionsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TransactionActions.refreshSummary, (state) => ({ ...state })),

  on(TransactionActions.clearAllTransactions, (state) => {
    localStorage.removeItem('transactions');
    return { ...state, transactions: [] };
  })
);
