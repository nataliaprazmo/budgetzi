import { Component, OnInit, ViewChild, effect } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TransactionState } from '../../types/transaction-states.types';
import { selectPieChartData } from '../../store/transaction.selectors';
import { categoryColors } from '../../data/charts-colors';
import { ChartColorsService } from '../../services/chart-colors.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-expense-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, AsyncPipe],
  templateUrl: './expense-pie-chart.html',
  styleUrl: './expense-pie-chart.scss',
})
export class ExpensePieChart implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData$: Observable<ChartConfiguration['data']>;
  public pieChartOptions: ChartConfiguration['options'];
  public readonly chartType = 'pie' as const;

  constructor(
    private store: Store<{ transaction: TransactionState }>,
    private chartColorsService: ChartColorsService
  ) {
    this.chartData$ = this.store
      .select(selectPieChartData)
      .pipe(map((data) => this.transformToChartData(data)));

    effect(() => {
      this.chartColorsService.legendColor();
      this.chartColorsService.borderColor();

      this.updateChartOptions();
      this.chart?.update();
    });
  }

  ngOnInit(): void {
    this.updateChartOptions();
  }

  private updateChartOptions(): void {
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      datasets: {
        pie: {
          borderColor: this.chartColorsService.borderColor(),
          borderWidth: 1.5,
          hoverOffset: 10,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'right',
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
        },
      ],
    };
  }
}
