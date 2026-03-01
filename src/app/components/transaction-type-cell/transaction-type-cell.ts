import { Component, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-transaction-type-cell',
  imports: [MaterialModule, TitleCasePipe],
  templateUrl: './transaction-type-cell.html',
  styleUrl: './transaction-type-cell.scss',
})
export class TransactionTypeCell {
  @Input({ required: true }) type!: 'income' | 'expense';
}
