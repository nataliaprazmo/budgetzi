import { Routes } from '@angular/router';
import { AddTransaction } from './features/transactions';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/dashboard').then((m) => m.DashboardModule),
  },
  { path: 'add', component: AddTransaction },
  {
    path: 'data-management',
    loadComponent: () =>
      import('./features/data-management').then((m) => m.DataManagement),
  },
  { path: 'edit/:id', component: AddTransaction },
];
