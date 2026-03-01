import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsTable } from './transactions-table';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, TransactionsTable],
  exports: [TransactionsTable],
})
export class TransactionsModule {}
