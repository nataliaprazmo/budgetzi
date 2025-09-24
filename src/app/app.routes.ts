import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { AddTransaction } from './components/add-transaction/add-transaction';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'add', component: AddTransaction },
];
