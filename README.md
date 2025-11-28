# Budgetzi - Simple Budget Tracker 💰

A simple **Angular + Angular Material** project that helps track expenses and income, while showcasing core Angular features.

## Tools & technologies

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-E53935?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NgRx Store](https://img.shields.io/badge/NgRx%20Store-E23237?style=for-the-badge&logo=ngrx&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Demo - Overview

![Demo GIF](/demo/demo.gif)

## Features

- **Managing transactions** (income & expenses): reading, adding, editing, and deleting via a **reactive form** and **Angular Material table**
- **Dashboard** with total income, total expenses, and balance KPIs, updated automatically based on filters and state changes
- **Filtering** by transaction type, category, and date range, fully **integrated with NgRx** for consistent state management
- Data visualizations (line, pie, bar, and comparison charts) powered by **ng2-charts / Chart.js** for trends and category insights
- **CSV import/export** and a dedicated data management screen for loading sample data, handling backups, and managing stored transactions
- **Light/dark theme** support
- **NgRx setup** with **actions**, **reducers**, **selectors**, and **effects**, backed by a modular, standalone component architecture

## Next Steps

I'm currently planning to:

- Improve **SEO** and overall **bundle size** for better performance
- Refine and reorganize the **project structure** to make it cleaner and more scalable

## Future Improvements

- Categories management
- Data management insights
- Monthly rollups, forecasting
- Deployment

## Getting Started

```bash
git clone https://github.com/nataliaprazmo/budgetzi.git
cd budgetzi
npm install
ng serve -o
```

The app will run on [`http://localhost:4200/`](http://localhost:4200/)

## CSV Import Format Example

Sample data can be found in:
`budget-tracker/src/app/data/sample-data.ts`

### CSV structure

```csv
id,title,amount,date,type
```

### Example row

```csv
1,Monthly Salary,5000,2025-01-01T00:00:00.000Z,income
```

## What I learned

This is my private project created to learn and understand Angular better, especially its modern features and patterns - with a strong focus on NgRx Store.

Throughout the development of Budgetzi, I gained practical experience with:

- Working with **NgRx actions, reducers, selectors, and effects** to manage state in a predictable way
- Using **Angular Material** components to build polished UI layouts
- Handling **reactive forms**
- Implementing **CSV import/export**, parsing, and transforming data

---

![Dashboard light vs dark mode screenshot](demo/lightVSdark.png)
