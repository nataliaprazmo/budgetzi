import { createAction, props } from '@ngrx/store';
import { Transaction } from '../types/transaction.types';
import { TransactionFilters } from '../types/transaction-filters.types';

export const refreshSummary = createAction('[Transaction] Refresh Summary');

export const loadTransactionsFromSample = createAction(
  '[Transaction] Load Transactions From Sample'
);

export const loadTransactionsFromLocalStorage = createAction(
  '[Transaction] Load Transactions From LocalStorage'
);

export const loadTransactionsFromLocalStorageSuccess = createAction(
  '[Transaction] Load Transactions From LocalStorage Success',
  props<{ transactions: Transaction[] }>()
);

export const loadTransactionsFromLocalStorageFailure = createAction(
  '[Transaction] Load Transactions From LocalStorage Failure',
  props<{ error: any }>()
);

export const addTransaction = createAction(
  '[Transaction] Add Transaction',
  props<{ transaction: Transaction }>()
);

export const deleteTransaction = createAction(
  '[Transaction] Delete Transaction',
  props<{ id: string }>()
);

export const setTransactionFilters = createAction(
  '[Transaction] Set Filters',
  props<{ filters: TransactionFilters }>()
);

export const importTransactionsFromCsv = createAction(
  '[Transaction] Import Transactions From CSV',
  props<{ file: File }>()
);

export const importTransactionsFromCsvSuccess = createAction(
  '[Transaction] Import Transactions From CSV Success',
  props<{ transactions: Transaction[] }>()
);

export const importTransactionsFromCsvFailure = createAction(
  '[Transaction] Import Transactions From CSV Failure',
  props<{ error: any }>()
);

export const exportTransactions = createAction('[Transaction] Export Transactions');

export const exportTransactionsSuccess = createAction(
  '[Transaction] Export Transactions Success',
  props<{ exportedData: string }>()
);

export const exportTransactionsFailure = createAction(
  '[Transaction] Export Transactions Failure',
  props<{ error: any }>()
);
