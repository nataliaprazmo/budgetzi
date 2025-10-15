import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TransactionState } from '../../types/transaction-states.types';
import { selectChartData } from '../../store/transaction.selectors';
import { ExpensePieChart } from '../expense-pie-chart/expense-pie-chart';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, ExpensePieChart],
  templateUrl: './charts.html',
  styleUrl: './charts.scss',
})
export class Charts {
  public chartData$: Observable<ChartConfiguration['data']>;

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
          },
        },
      },
    },
  };

  public chartType: ChartConfiguration['type'] = 'line';

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.chartData$ = this.store
      .select(selectChartData)
      .pipe(map((data) => this.transformToChartData(data)));
  }

  private transformToChartData(data: {
    labels: string[];
    expenseData: number[];
    incomeData: number[];
  }): ChartConfiguration['data'] {
    return {
      labels: data.labels,
      datasets: [
        {
          data: data.incomeData,
          label: 'Income',
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#10b981',
          pointHoverBackgroundColor: '#059669',
          pointHoverBorderColor: '#059669',
          tension: 0.4,
          fill: false,
        },
        {
          data: data.expenseData,
          label: 'Expenses',
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          pointBackgroundColor: '#ef4444',
          pointBorderColor: '#ef4444',
          pointHoverBackgroundColor: '#dc2626',
          pointHoverBorderColor: '#dc2626',
          tension: 0.4,
          fill: false,
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
