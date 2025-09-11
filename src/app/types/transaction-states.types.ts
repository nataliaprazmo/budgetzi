import { TransactionFilters } from './transaction-filters.types';
import { Transaction } from './transaction.types';

export interface TransactionState {
  transactions: Transaction[];
  filters?: TransactionFilters;
  loading?: boolean;
  error?: any;
}

export const initialState: TransactionState = {
  transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
  filters: undefined,
  loading: false,
  error: null,
};
