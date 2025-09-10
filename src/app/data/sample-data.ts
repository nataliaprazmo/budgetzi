import { Transaction } from '../types/transaction.types';

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Coffee',
    category: 'Food & Drinks',
    amount: 12.5,
    date: new Date('2025-01-02'),
    type: 'expense',
  },
  {
    id: '2',
    title: 'Bus Ticket',
    category: 'Transport',
    amount: 4.8,
    date: new Date('2025-01-05'),
    type: 'expense',
  },
  {
    id: '3',
    title: 'Groceries',
    category: 'Food & Drinks',
    amount: 120.0,
    date: new Date('2025-01-10'),
    type: 'expense',
  },
  {
    id: '4',
    title: 'Internet Bill',
    category: 'Utilities',
    amount: 65.0,
    date: new Date('2025-01-15'),
    type: 'expense',
  },
  {
    id: '5',
    title: 'Salary',
    amount: 3000.0,
    date: new Date('2025-01-01'),
    type: 'income',
  },
  {
    id: '6',
    title: 'Freelance Project',
    amount: 800.0,
    date: new Date('2025-01-12'),
    type: 'income',
  },
  {
    id: '7',
    title: 'Gift from Family',
    amount: 200.0,
    date: new Date('2025-01-20'),
    type: 'income',
  },
];
