import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { transactionReducer } from './store/transaction.reducer';
import { TransactionEffects } from './store/transaction.effects';
import { provideCharts } from 'ng2-charts';

import {
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  ArcElement,
  PieController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ transaction: transactionReducer }),
    provideEffects([TransactionEffects]),
    provideCharts({
      registerables: [
        BarController,
        LineController,
        PieController,

        BarElement,
        LineElement,
        PointElement,
        ArcElement,

        CategoryScale,
        LinearScale,

        Tooltip,
        Legend,
        Filler,
      ],
    }),
  ],
};
