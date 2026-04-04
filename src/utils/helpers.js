export const calculateSummary = (transactions) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      income += Number(transaction.amount);
    } else {
      expense += Number(transaction.amount);
    }
  });

  const comparison = getMonthlyComparison(transactions);

  return {
    income: Number(income.toFixed(2)),
    expense: Number(expense.toFixed(2)),
    balance: Number((income - expense).toFixed(2)),
    changes: comparison.changes,
  };
};




export const getCategoryData = (transactions) => {
  const map = {};

  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      const key = transaction.category;
      map[key] = (map[key] || 0) + Number(transaction.amount);
    }
  });

  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getBalanceTrend = (transactions) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let balance = 0;

  return sorted.map((transaction) => {
    balance += transaction.type === "income" ? Number(transaction.amount) : -Number(transaction.amount);

    return {
      date: transaction.date,
      balance,
    };
  });
};

export const getFilteredTransactions = (transactions, filters) => {
  const query = filters.search.trim().toLowerCase();

  const filtered = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.category.toLowerCase().includes(query) ||
      transaction.type.toLowerCase().includes(query) ||
      transaction.date.toLowerCase().includes(query) ||
      String(transaction.amount).includes(query);

    const matchesType = filters.type === "all" || transaction.type === filters.type;
    const matchesCategory =
      filters.category === "all" || transaction.category === filters.category;

    return matchesSearch && matchesType && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }
    if (filters.sort === "highest") {
      return Number(b.amount) - Number(a.amount);
    }
    if (filters.sort === "lowest") {
      return Number(a.amount) - Number(b.amount);
    }
    return new Date(b.date) - new Date(a.date);
  });

  return sorted;
};

export const getTopSpendingCategory = (transactions) => {
  const categories = {};

  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      categories[transaction.category] =
        (categories[transaction.category] || 0) + Number(transaction.amount);
    }
  });

  const entries = Object.entries(categories);

  if (!entries.length) {
    return { category: "None", amount: 0 };
  }

  const [category, amount] = entries.reduce((best, current) =>
    current[1] > best[1] ? current : best
  );

  return { category, amount };
};

export const getMonthlyComparison = (transactions) => {
  if (!transactions.length) {
    return {
      current: { income: 0, expense: 0, balance: 0 },
      previous: { income: 0, expense: 0, balance: 0 },
      changes: { income: 0, expense: 0, balance: 0 },
      label: "",
    };
  }

  const dates = transactions.map((transaction) => new Date(transaction.date));
  const latest = new Date(Math.max(...dates.map((date) => date.getTime())));

  const currentMonth = latest.getMonth();
  const currentYear = latest.getFullYear();

  const previousDate = new Date(currentYear, currentMonth - 1, 1);
  const previousMonth = previousDate.getMonth();
  const previousYear = previousDate.getFullYear();

  const getMonthStats = (month, year) => {
    let income = 0;
    let expense = 0;
    transactions.forEach((t) => {
      const d = new Date(t.date);
      if (d.getMonth() === month && d.getFullYear() === year) {
        if (t.type === "income") income += Number(t.amount);
        else expense += Number(t.amount);
      }
    });
    return { income, expense, balance: income - expense };
  };

  const current = getMonthStats(currentMonth, currentYear);
  const previous = getMonthStats(previousMonth, previousYear);

  const calculateChange = (curr, prev) => {
    if (Math.abs(prev) < 0.01) return curr > 0 ? 100 : 0;
    return Number((((curr - prev) / Math.abs(prev)) * 100).toFixed(2));
  };

  return {
    current,
    previous,
    changes: {
      income: calculateChange(current.income, previous.income),
      expense: calculateChange(current.expense, previous.expense),
      balance: calculateChange(current.balance, previous.balance),
    },
    label: latest.toLocaleString("en-US", { month: "long", year: "numeric" }),
  };
};


export const getCategoryInsights = (transactions) => {
  if (!transactions.length) return [];

  const dates = transactions.map((t) => new Date(t.date));
  const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
  const curMonth = latest.getMonth();
  const curYear = latest.getFullYear();

  const prevDate = new Date(curYear, curMonth - 1, 1);
  const prevMonth = prevDate.getMonth();
  const prevYear = prevDate.getFullYear();

  const categories = [...new Set(transactions.map((t) => t.category))];

  return categories.map((cat) => {
    let curTotal = 0;
    let prevTotal = 0;

    transactions.forEach((t) => {
      const d = new Date(t.date);
      if (t.category === cat && t.type === "expense") {
        if (d.getMonth() === curMonth && d.getFullYear() === curYear) {
          curTotal += Number(t.amount);
        } else if (d.getMonth() === prevMonth && d.getFullYear() === prevYear) {
          prevTotal += Number(t.amount);
        }
      }
    });

    const diff = curTotal - prevTotal;
    const percent = prevTotal === 0 ? (curTotal > 0 ? 100 : 0) : (diff / prevTotal) * 100;

    return { category: cat, current: curTotal, previous: prevTotal, percent, diff };
  }).filter(insight => insight.current > 0 || insight.previous > 0);
};