import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../types/transaction.types';
import { addTransaction, updateTransaction } from '../../store/transaction.actions';
import { Store } from '@ngrx/store';
import { TransactionState } from '../../types/transaction-states.types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Observable, take } from 'rxjs';
import { selectTransactionById } from '../../store/transaction.selectors';
import { selectExpenseCategories } from '../../store/transaction.selectors';
import { MatIconModule } from '@angular/material/icon';
import { TransactionTypeToggle } from '../transaction-type-toggle/transaction-type-toggle';
import { MessageDisplay } from '../message-display/message-display';
import { SubmitButton } from '../submit-button/submit-button';

@Component({
  selector: 'app-add-transaction',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TransactionTypeToggle,
    MatAutocompleteModule,
    AsyncPipe,
    MatIconModule,
    MessageDisplay,
    SubmitButton,
  ],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.scss',
})
export class AddTransaction {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categories$: Observable<string[]>;

  showSuccessMessage = signal(false);
  showErrorMessage = signal(false);
  errorMessage = signal('');
  isSubmitting = signal(false);

  private editingId: string | null = null;
  isEditMode = signal(false);

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.categories$ = this.store.select(selectExpenseCategories);

    // detect edit route param and prefill form
    this.route.paramMap.subscribe((pm) => {
      const id = pm.get('id');
      if (id) {
        this.editingId = id;
        this.isEditMode.set(true);
        this.store
          .select(selectTransactionById(id))
          .pipe(take(1))
          .subscribe((t) => {
            if (t) {
              this.type.set(t.type);
              this.changeType(t.type);
              this.form.patchValue({
                title: t.title,
                description: (t as any).description || '',
                amount: (t as any).amount,
                date: new Date((t as any).date),
                category: (t as any).type === 'expense' ? (t as any).category : '',
              });
            }
          });
      }
    });
  }

  type = signal<'income' | 'expense'>('income');

  form = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date(), Validators.required],
    category: [''],
  });

  onTypeChanged(newType: 'income' | 'expense') {
    this.changeType(newType);
  }

  changeType(newType: 'income' | 'expense') {
    this.type.set(newType);
    if (newType === 'income') {
      this.form.get('category')?.disable();
      this.form.get('category')?.setValue(null);
      this.form.get('category')?.clearValidators();
    } else {
      this.form.get('category')?.enable();
      this.form.get('category')?.setValidators([Validators.required]);
    }
    this.form.get('category')?.updateValueAndValidity();
    this.hideMessages();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.showError('Please fill in all required fields correctly.');
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.hideMessages();

    try {
      const raw = this.form.getRawValue();

      const transaction: Transaction = {
        id: this.editingId ?? crypto.randomUUID(),
        title: raw.title!,
        description: raw.description || '',
        amount: raw.amount!,
        date: raw.date!,
        type: this.type(),
        ...(this.type() === 'expense' ? { category: raw.category! } : {}),
      } as Transaction;

      if (this.editingId) {
        const { id, ...rest } = transaction as any;
        const changes: Partial<Transaction> = { ...rest };
        this.store.dispatch(updateTransaction({ id: this.editingId, changes }));
        this.showSuccess();
        setTimeout(() => this.router.navigate(['']), 500);
      } else {
        this.store.dispatch(addTransaction({ transaction }));
        this.resetForm();
        this.showSuccess();
      }
    } catch (error) {
      this.showError('An error occurred while adding the transaction. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  onCancel() {
    this.router.navigate(['']);
  }

  private showSuccess() {
    this.showSuccessMessage.set(true);
    this.showErrorMessage.set(false);

    setTimeout(() => {
      this.showSuccessMessage.set(false);
    }, 3000);
  }

  private showError(message: string) {
    this.errorMessage.set(message);
    this.showErrorMessage.set(true);
    this.showSuccessMessage.set(false);

    setTimeout(() => {
      this.showErrorMessage.set(false);
    }, 5000);
  }

  private hideMessages() {
    this.showSuccessMessage.set(false);
    this.showErrorMessage.set(false);
  }

  private resetForm() {
    this.form.reset({
      title: '',
      description: '',
      amount: 0,
      date: new Date(),
      category: undefined,
    });
  }
}
