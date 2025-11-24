import { Component, OnInit, ViewChild, effect } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TransactionState } from '../../types/transaction-states.types';
import { selectExpensesByCategory } from '../../store/transaction.selectors';
import { categoryColors } from '../../data/charts-colors';
import { ChartColorsService } from '../../services/chart-colors.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-expense-category-bar-chart',
  standalone: true,
  imports: [BaseChartDirective, AsyncPipe],
  templateUrl: './expense-category-bar-chart.html',
  styleUrl: './expense-category-bar-chart.scss',
})
export class ExpenseCategoryBarChart implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData$: Observable<ChartConfiguration['data']>;
  public barChartOptions: ChartConfiguration['options'];
  public readonly chartType = 'bar' as const;

  constructor(
    private store: Store<{ transaction: TransactionState }>,
    private chartColorsService: ChartColorsService
  ) {
    this.chartData$ = this.store
      .select(selectExpensesByCategory)
      .pipe(map((data) => this.transformToChartData(data)));

    effect(() => {
      this.chartColorsService.axisColor();
      this.chartColorsService.gridColor();

      this.updateChartOptions();
      this.chart?.update();
    });
  }

  ngOnInit(): void {
    this.updateChartOptions();
  }

  private updateChartOptions(): void {
    this.barChartOptions = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          callbacks: {
            label: function (context) {
              return '$' + context.parsed.x.toLocaleString();
            },
          },
        },
      },
      scales: {
        x: {
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
        y: {
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

  private transformToChartData(
    expensesByCategory: Record<string, number>
  ): ChartConfiguration['data'] {
    const categories = Object.keys(expensesByCategory);
    const amounts = Object.values(expensesByCategory);

    const sorted = categories
      .map((category, index) => ({ category, amount: amounts[index] }))
      .sort((a, b) => b.amount - a.amount);

    return {
      labels: sorted.map((item) => item.category),
      datasets: [
        {
          label: 'Spending',
          data: sorted.map((item) => item.amount),
          backgroundColor: categoryColors.slice(0, sorted.length),
          borderColor: categoryColors.slice(0, sorted.length),
          borderWidth: 0,
        },
      ],
    };
  }
}
