import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TransactionActions from './transaction.actions';
import { catchError, map, switchMap, of, withLatestFrom, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransactionState } from '../types/transaction-states.types';
import { Transaction } from '../types/transaction.types';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class TransactionEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<{ transaction: TransactionState }>);

  loadSample$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactionsFromSample),
      switchMap(({ file }) =>
        this.readCsvFile(file).pipe(
          map((transactions: Transaction[]) =>
            TransactionActions.loadTransactionsFromLocalStorageSuccess({ transactions })
          ),
          catchError((error) =>
            of(TransactionActions.loadTransactionsFromLocalStorageFailure({ error }))
          )
        )
      )
    )
  );

  importCsv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.importTransactionsFromCsv),
      switchMap(({ file }) =>
        this.readCsvFile(file).pipe(
          map((transactions: Transaction[]) =>
            TransactionActions.importTransactionsFromCsvSuccess({ transactions })
          ),
          catchError((error) => of(TransactionActions.importTransactionsFromCsvFailure({ error })))
        )
      )
    )
  );

  export$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.exportTransactions),
      withLatestFrom(this.store.select((state) => state.transaction.transactions)),
      switchMap(([_, transactions]) => {
        try {
          const csv = this.convertToCsv(transactions);
          return of(TransactionActions.exportTransactionsSuccess({ exportedData: csv }));
        } catch (error) {
          return of(TransactionActions.exportTransactionsFailure({ error }));
        }
      })
    )
  );

  persistTransactions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TransactionActions.addTransaction,
          TransactionActions.deleteTransaction,
          TransactionActions.importTransactionsFromCsvSuccess,
          TransactionActions.loadTransactionsFromLocalStorageSuccess
        ),
        withLatestFrom(this.store.select((state) => state.transaction.transactions)),
        tap(([_, transactions]) => {
          localStorage.setItem('transactions', JSON.stringify(transactions));
        })
      ),
    { dispatch: false }
  );

  private readCsvFile(file: File) {
    return new Observable<Transaction[]>((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        Papa.parse(text, {
          header: true,
          complete: (result: any) => {
            const transactions: Transaction[] = result.data.map((row: any) => ({
              id: row.id || crypto.randomUUID(),
              title: row.title,
              description: row.description,
              amount: Number(row.amount),
              date: new Date(row.date),
              type: row.type,
              category: row.type === 'expense' ? row.category : undefined,
            }));
            observer.next(transactions);
            observer.complete();
          },
          error: (error: any) => observer.error(error),
        });
      };
      reader.onerror = (error) => observer.error(error);
      reader.readAsText(file);
    });
  }

  private convertToCsv(transactions: Transaction[]): string {
    const header = Object.keys(transactions[0] || {}).join(',');
    const rows = transactions
      .map((t) =>
        [
          t.id,
          t.title,
          t.description || '',
          t.amount,
          t.date.toISOString(),
          t.type,
          t.type === 'expense' ? (t as any).category : '',
        ].join(',')
      )
      .join('\n');
    return `${header}\n${rows}`;
  }
}
