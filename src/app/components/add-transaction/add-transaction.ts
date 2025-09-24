import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../../types/transaction.types';
import { addTransaction } from '../../store/transaction.actions';
import { Store } from '@ngrx/store';
import { TransactionState } from '../../types/transaction-states.types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { selectExpenseCategories } from '../../store/transaction.selectors';

@Component({
  selector: 'app-add-transaction',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.scss',
})
export class AddTransaction {
  private formBuilder = inject(FormBuilder);
  categories$: Observable<string[]>;

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.categories$ = this.store.select(selectExpenseCategories);
  }

  type = signal<'income' | 'expense'>('income');

  form = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date(), Validators.required],
    category: [''],
  });

  changeType(newType: 'income' | 'expense') {
    this.type.set(newType);
    if (newType === 'income') {
      this.form.get('category')?.disable();
      this.form.get('category')?.setValue(null);
    } else {
      this.form.get('category')?.enable();
    }
  }
  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      title: raw.title!,
      description: raw.description || '',
      amount: raw.amount!,
      date: raw.date!,
      type: this.type(),
      ...(this.type() === 'expense' ? { category: raw.category! } : {}),
    } as Transaction;

    this.store.dispatch(addTransaction({ transaction }));
    this.form.reset({ date: new Date(), amount: 0 });
  }
}
