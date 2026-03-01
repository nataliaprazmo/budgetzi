import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Charts } from './charts';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, Charts],
  exports: [Charts],
})
export class ChartsModule {}
