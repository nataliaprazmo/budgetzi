import { Component, OnInit, ViewChild, effect } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TransactionState } from '../../types/transaction-states.types';
import { selectChartData } from '../../store/transaction.selectors';
import { ChartColorsService } from '../../services/chart-colors.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-combined-line-chart',
  imports: [BaseChartDirective, AsyncPipe],
  templateUrl: './combined-line-chart.html',
  styleUrl: './combined-line-chart.scss',
})
export class CombinedLineChart implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData$: Observable<ChartConfiguration['data']>;
  public lineChartOptions: ChartConfiguration['options'];
  public readonly chartType = 'line' as const;

  constructor(
    private store: Store<{ transaction: TransactionState }>,
    private chartColorsService: ChartColorsService
  ) {
    this.chartData$ = this.store
      .select(selectChartData)
      .pipe(map((data) => this.transformToChartData(data)));

    effect(() => {
      this.chartColorsService.axisColor();
      this.chartColorsService.gridColor();
      this.chartColorsService.legendColor();

      this.updateChartOptions();
      this.chart?.update();
    });
  }

  ngOnInit(): void {
    this.updateChartOptions();
  }

  private updateChartOptions(): void {
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: this.chartColorsService.axisColor(),
            callback: function (value) {
              return '$' + value.toLocaleString();
            },
          },
          grid: {
            color: this.chartColorsService.gridColor(),
          },
        },
        x: {
          ticks: {
            color: this.chartColorsService.axisColor(),
          },
          grid: {
            color: this.chartColorsService.gridColor(),
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: this.chartColorsService.legendColor(),
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          callbacks: {
            label: function (context) {
              return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
            },
          },
        },
      },
    };
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
}
