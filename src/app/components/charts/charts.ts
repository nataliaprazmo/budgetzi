import { Component } from '@angular/core';
import { ExpensePieChart } from '../expense-pie-chart/expense-pie-chart';
import { ExpenseCategoryBarChart } from '../expense-category-bar-chart/expense-category-bar-chart';
import { CombinedLineChart } from '../combined-line-chart/combined-line-chart';
import { IncomeVsExpenseChart } from '../income-vs-expense-chart/income-vs-expense-chart';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CombinedLineChart, ExpensePieChart, ExpenseCategoryBarChart, IncomeVsExpenseChart],
  templateUrl: './charts.html',
  styleUrl: './charts.scss',
})
export class Charts {}
