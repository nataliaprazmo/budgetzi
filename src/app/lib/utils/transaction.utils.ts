import { Transaction } from '../../types/transaction.types';

export function calculateTotalByType(
  transactions: Transaction[],
  type: 'income' | 'expense',
): number {
  return transactions.filter((t) => t.type === type).reduce((sum, t) => sum + t.amount, 0);
}

export function filterByType(
  transactions: Transaction[],
  type: 'income' | 'expense' | 'all',
): Transaction[] {
  if (type === 'all') return transactions;
  return transactions.filter((t) => t.type === type);
}

export function groupTransactionsByMonth(
  transactions: Transaction[],
  type: 'income' | 'expense',
): Record<string, number> {
  const grouped: Record<string, number> = {};

  transactions
    .filter((t) => t.type === type)
    .forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthLabel = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });

      grouped[monthLabel] = (grouped[monthLabel] || 0) + transaction.amount;
    });

  return grouped;
}

export function groupExpensesByCategory(transactions: Transaction[]): Record<string, number> {
  const grouped: Record<string, number> = {};

  transactions
    .filter((t) => t.type === 'expense' && 'category' in t)
    .forEach((transaction) => {
      const category = (transaction as any).category || 'Uncategorized';
      grouped[category] = (grouped[category] || 0) + transaction.amount;
    });

  return grouped;
}

export function calculateSavingsRate(income: number, expenses: number): number {
  if (income === 0) return 0;
  return ((income - expenses) / income) * 100;
}

export function getExpenseCategories(transactions: Transaction[]): string[] {
  return transactions
    .filter((t) => t.type === 'expense' && 'category' in t)
    .map((t) => (t as any).category)
    .filter((v, i, a) => a.indexOf(v) === i);
}
