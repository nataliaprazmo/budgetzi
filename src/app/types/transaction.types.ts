export interface TransactionBase {
  id: string;
  title: string;
  description?: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
}

export interface ExpenseTransaction extends TransactionBase {
  type: 'expense';
  category: string;
}

export interface IncomeTransaction extends TransactionBase {
  type: 'income';
  category?: never;
}

export type Transaction = ExpenseTransaction | IncomeTransaction;
