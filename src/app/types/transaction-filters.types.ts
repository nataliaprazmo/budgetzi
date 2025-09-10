export interface BaseFilters {
  fromDate?: Date;
  toDate?: Date;
}

export interface IncomeFilters extends BaseFilters {
  type: 'income';
  category?: never;
}

export interface ExpenseFilters extends BaseFilters {
  type: 'expense';
  category?: string;
}

export type TransactionFilters = IncomeFilters | ExpenseFilters;
