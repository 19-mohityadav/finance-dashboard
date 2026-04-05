# 💎 Velocity — Finance Dashboard

A clean, interactive, and responsive **finance dashboard** built as a frontend internship assignment. Demonstrates core frontend engineering skills including component architecture, state management, data visualization, and UX polish.

---

## 🚀 Live Demo

> Deploy Link : https://finance-dashboard-iota-mauve.vercel.app/

---

## 📸 Features

| Feature | Details |
|---|---|
| **Summary Cards** | Income, Expense, Balance with month-over-month % change |
| **Balance Trend Chart** | Line chart (Recharts) showing running balance over time |
| **Spending Breakdown** | Donut chart with per-category legend and totals |
| **Financial Ledger** | Full searchable, filterable, sortable transaction table |
| **Insights Engine** | Auto-generated spending observations from real data |
| **Role-Based Access** | Admin (add/edit/delete) vs Viewer (read-only) |
| **Local Persistence** | All data stored in `localStorage`, survives page refresh |
| **Dark / Light Mode** | Full theme toggle with smooth transitions |
| **Responsive Design** | Mobile → Tablet → Desktop breakpoints |
| **CSV Export** | Download filtered transactions as a `.csv` file |

---

## 🛠️ Tech Stack

- **React 19** — UI framework
- **Vite** — Build tool & dev server
- **Tailwind CSS v3** — Utility-first styling
- **Recharts** — Data visualization
- **Context API + useMemo/useCallback** — State management & optimization
- **localStorage** — Client-side persistence

---

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/          # HasPermission (RBAC wrapper)
│   ├── common/        # ExportButton
│   ├── layout/        # Navbar, Sidebar
│   └── ui/            # Card, Button (memoized atoms)
├── constants/         # App-wide enums, default data
├── context/           # AppContext (global state provider)
├── data/              # mockData seed transactions
├── features/
│   ├── dashboard/     # SummaryCard, BalanceChart, CategoryChart, ChartsSection
│   ├── insights/      # Insights engine
│   └── transactions/  # FilterBar, TransactionTable, TransactionRow, AddTransactionModal
├── hooks/
│   ├── useFinance.js  # Core domain logic hook
│   └── useLocalStorage.js  # Persistent + cross-tab sync
├── pages/
│   └── Dashboard.jsx  # Main page orchestrator
└── utils/
    ├── helpers.js     # calculateSummary, getFilteredTransactions, getBalanceTrend, etc.
    └── exportCSV.js   # CSV generation utility
```

---

## ⚡ Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔐 Role System

Switch roles using the **Admin / Viewer** toggle in the top navbar.

| Permission | Admin | Viewer |
|---|---|---|
| View dashboard | ✅ | ✅ |
| Add transactions | ✅ | ❌ |
| Edit transactions | ✅ | ❌ |
| Delete transactions | ✅ | ❌ |
| Export CSV | ✅ | ✅ |

---

## 🎯 Assignment Requirements Covered

- ✅ Summary cards with real computed values
- ✅ Charts (time-based line + category donut)
- ✅ Transactions table with search, filter, sort
- ✅ Role-based UI (Admin / Viewer)
- ✅ Insights section with data-driven observations
- ✅ Local data persistence
- ✅ Input validation and error handling
- ✅ Responsive design
- ✅ Clean component architecture

---

## 📝 Notes

- No backend or authentication required — mock data is seeded on first load
- All state is derived from `transactions` array using `useMemo` for performance
- `React.memo` applied to all leaf components to prevent unnecessary re-renders

---

*Built with ❤️ by Mohit Yadav  for a Finance Dashboard frontend assignment*
