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

  on(TransactionActions.loadTransactionsFromLocalStorageSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
  })),

  on(TransactionActions.loadTransactionsFromLocalStorageFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(TransactionActions.importTransactionsFromCsvSuccess, (state, { transactions }) => {
    const mergedTransactions = [...state.transactions, ...transactions];
    return { ...state, transactions: mergedTransactions };
  }),

  on(TransactionActions.importTransactionsFromCsvFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(TransactionActions.exportTransactionsSuccess, (state) => state),
  on(TransactionActions.exportTransactionsFailure, (state, { error }) => ({ ...state, error })),

  on(TransactionActions.refreshSummary, (state) => ({ ...state }))
);
