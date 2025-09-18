# Budgetzi - Simple Budget Tracker 💰

A simple and impressive **Angular + Angular Material** project that helps track expenses and income, while showcasing core Angular features.

## ✅ Implemented Features

### 1. Transactions Table

- Displays all transactions in a **Material Table**.
- Columns include:
  - **Type** (Income / Expense) with colored badges and icons.
  - **Title**
  - **Description** (optional)
  - **Category** (for expenses)
  - **Amount** (color-coded based on type)
  - **Date**
- Styled with **rounded badges**.

### 2. KPIs / Dashboard

- Shows **Total Income**, **Total Expenses**, and **Balance**.
- KPIs **update reactively** based on filtered transactions.
- Uses **grid layout**, spacing, and color-coded indicators.

### 3. Filters

- Filter transactions by **type, category, and date range**.
- Expense category filter appears only when type is set to `expense`.
- Uses **Angular Material components**:
  - `mat-select` for type and category.
  - `mat-date-range-picker` for date range.
- Filters update **in real-time** via **NgRx store**.

### 4. State Management (NgRx)

- Uses **NgRx store** actions, reducer, selectors & effects.

### 5. Styling & Theming

- SCSS-based with **shared color variables**.
- Angular Material theming for **buttons, chips, and tables**.
- Rounded icons and badges.
- Consistent color coding for income/expense/balance.

## Planned features

- **Expense Management**

  - Add expenses and income with description, category, amount, and date.
  - Add sorting and pagination to Material table.
  - Delete or mark items as reimbursed (maybe).
  - Add charts (using **ng2-charts**)

- **Categories**

  - Visual highlighting of large expenses with custom directives (maybe).

- **Forms**

  - Add new expense via Angular Material dialog form.
  - Validations included (required fields, positive numbers, etc.).
  - Two-way binding with `ngModel`.

- **UI Feedback**
  - Snackbar notifications on adding/deleting expenses.

## ▶️ Getting Started

```bash
git clone https://github.com/nataliaprazmo/budgetzi.git
cd budgetzi
npm install
ng serve -o
```

The app will run on [`http://localhost:4200/`](http://localhost:4200/)
