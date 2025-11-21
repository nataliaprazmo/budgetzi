import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-kpi-card',
  imports: [MaterialModule, CommonModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss',
})
export class KpiCard {
  @Input() label!: string;
  @Input() value: number = 0;
  @Input() color: string = '#3f51b5';
  @Input() trend?: number;
  @Input() trendLabel?: string;
  @Input() format: 'currency' | 'percent' = 'currency';
}
