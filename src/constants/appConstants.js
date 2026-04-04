export const TRANSACTION_TYPES = {
    INCOME: "income",
    EXPENSE: "expense",
    ALL: "all",
};

export const DEFAULT_FILTERS = {
  search: "",
  type: TRANSACTION_TYPES.ALL,
  category: "all",
  sort: "newest",
};

export const ROLES = {
  ADMIN: "admin",
  VIEWER: "viewer",
};

export const STORAGE_KEYS = {
  TRANSACTIONS: "transactions",
  DARK_MODE: "darkMode",
  ROLE: "appRole",
};
