import { TransactionFilters } from './transaction-filters.types';
import { Transaction } from './transaction.types';

export interface TransactionState {
  transactions: Transaction[];
  filters?: TransactionFilters;
  error?: any;
}

export const initialState: TransactionState = {
  transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
  filters: undefined,
  error: null,
};
