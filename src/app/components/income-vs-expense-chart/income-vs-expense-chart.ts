import { Component, OnInit, ViewChild, effect } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TransactionState } from '../../types/transaction-states.types';
import { selectChartData } from '../../store/transaction.selectors';
import { ChartColorsService } from '../../services/chart-colors.service';

@Component({
  selector: 'app-income-vs-expense-chart',
  standalone: true,
  imports: [BaseChartDirective, AsyncPipe],
  templateUrl: './income-vs-expense-chart.html',
  styleUrl: './income-vs-expense-chart.scss',
})
export class IncomeVsExpenseChart implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData$: Observable<ChartConfiguration['data']>;
  public barChartOptions: ChartConfiguration['options'];
  public readonly chartType = 'bar' as const;

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
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
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
          label: 'Income',
          data: data.incomeData,
          backgroundColor: '#10b981',
          borderColor: '#10b981',
          borderWidth: 0,
        },
        {
          label: 'Expenses',
          data: data.expenseData,
          backgroundColor: '#ef4444',
          borderColor: '#ef4444',
          borderWidth: 0,
        },
      ],
    };
  }
}
