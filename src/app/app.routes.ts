import { Routes } from '@angular/router';
import { AddTransaction } from './components/add-transaction/add-transaction';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
  },
  { path: 'add', component: AddTransaction },
  {
    path: 'data-management',
    loadComponent: () =>
      import('./components/data-management/data-management').then((m) => m.DataManagement),
  },
  { path: 'edit/:id', component: AddTransaction },
];
