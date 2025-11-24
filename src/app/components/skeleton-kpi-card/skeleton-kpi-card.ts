import { Component } from '@angular/core';
import { SkeletonLoader } from '../skeleton-loader/skeleton-loader';

@Component({
  selector: 'app-skeleton-kpi-card',
  imports: [SkeletonLoader],
  templateUrl: './skeleton-kpi-card.html',
  styleUrl: './skeleton-kpi-card.scss',
})
export class SkeletonKpiCard {}
