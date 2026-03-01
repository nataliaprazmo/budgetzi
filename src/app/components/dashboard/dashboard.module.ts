import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Dashboard } from './dashboard';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    Dashboard,
    RouterModule.forChild([{ path: '', component: Dashboard }]),
  ],
})
export class DashboardModule {}
