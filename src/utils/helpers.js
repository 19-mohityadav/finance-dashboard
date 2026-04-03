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

  return {
    income,
    expense,
    balance: income - expense,
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
      currentMonthTotal: 0,
      previousMonthTotal: 0,
      change: 0,
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

  const currentMonthTotal = transactions.reduce((total, transaction) => {
    const date = new Date(transaction.date);
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear && transaction.type === "expense") {
      return total + Number(transaction.amount);
    }
    return total;
  }, 0);

  const previousMonthTotal = transactions.reduce((total, transaction) => {
    const date = new Date(transaction.date);
    if (
      date.getMonth() === previousMonth &&
      date.getFullYear() === previousYear &&
      transaction.type === "expense"
    ) {
      return total + Number(transaction.amount);
    }
    return total;
  }, 0);

  const change =
    previousMonthTotal === 0
      ? currentMonthTotal > 0
        ? 100
        : 0
      : ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;

  return {
    currentMonthTotal,
    previousMonthTotal,
    change,
    label: latest.toLocaleString("en-US", { month: "long", year: "numeric" }),
  };
};