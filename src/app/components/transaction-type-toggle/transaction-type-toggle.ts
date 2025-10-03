import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-transaction-type-toggle',
  imports: [MatButtonToggleModule],
  templateUrl: './transaction-type-toggle.html',
  styleUrl: './transaction-type-toggle.scss',
})
export class TransactionTypeToggle {
  @Input() selectedType: 'income' | 'expense' = 'income';
  @Output() typeChanged = new EventEmitter<'income' | 'expense'>();

  onTypeChange(newType: 'income' | 'expense') {
    this.typeChanged.emit(newType);
  }
}
