// expense-category-bar-chart.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TransactionState } from '../../types/transaction-states.types';
import { selectExpensesByCategory } from '../../store/transaction.selectors';
import { categoryColors } from '../../data/charts-colors';

@Component({
  selector: 'app-expense-category-bar-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './expense-category-bar-chart.html',
  styleUrl: './expense-category-bar-chart.scss',
})
export class ExpenseCategoryBarChart {
  public chartData$: Observable<ChartConfiguration['data']>;

  public barChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
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
          callback: function (value) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
  };

  public chartType: ChartConfiguration['type'] = 'bar';

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.chartData$ = this.store
      .select(selectExpensesByCategory)
      .pipe(map((data) => this.transformToChartData(data)));
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

  public chartClicked(e: any): void {
    console.log('Chart clicked:', e);
  }

  public chartHovered(e: any): void {
    console.log('Chart hovered:', e);
  }
}
