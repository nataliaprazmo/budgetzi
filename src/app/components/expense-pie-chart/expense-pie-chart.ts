import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TransactionState } from '../../types/transaction-states.types';
import { selectPieChartData } from '../../store/transaction.selectors';
import { categoryColors } from '../../data/charts-colors';

@Component({
  selector: 'app-expense-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './expense-pie-chart.html',
  styleUrl: './expense-pie-chart.scss',
})
export class ExpensePieChart {
  public chartData$: Observable<ChartConfiguration['data']>;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (acc: number, val) => acc + (val as number),
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  public chartType: ChartConfiguration['type'] = 'pie';

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.chartData$ = this.store
      .select(selectPieChartData)
      .pipe(map((data) => this.transformToChartData(data)));
  }

  private transformToChartData(data: {
    labels: string[];
    data: number[];
  }): ChartConfiguration['data'] {
    return {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          backgroundColor: categoryColors.slice(0, data.labels.length),
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 10,
        },
      ],
    };
  }

  public chartClicked(e: any): void {
    console.log('Chart clicked:', e);
  }

  public chartHovered(e: any): void {
    console.log('Chart hovered:', e);
  }
}
