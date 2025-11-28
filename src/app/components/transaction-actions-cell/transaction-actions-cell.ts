import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-transaction-actions-cell',
  imports: [MaterialModule, RouterLink],
  templateUrl: './transaction-actions-cell.html',
  styleUrl: './transaction-actions-cell.scss',
})
export class TransactionActionsCell {
  @Input({ required: true }) transactionId!: string;
  @Output() delete = new EventEmitter<string>();

  handleDelete() {
    const confirmed = confirm('Delete this transaction?');
    if (confirmed) {
      this.delete.emit(this.transactionId);
    }
  }
}
