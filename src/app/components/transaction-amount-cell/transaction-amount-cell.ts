import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-amount-cell',
  imports: [CurrencyPipe],
  templateUrl: './transaction-amount-cell.html',
  styleUrl: './transaction-amount-cell.scss',
})
export class TransactionAmountCell {
  @Input({ required: true }) amount!: number;
  @Input({ required: true }) type!: 'income' | 'expense';
}
