import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(SEED);
  const [role, setRole] = useState("viewer"); // "viewer" | "admin"
  const [activeTab, setActiveTab] = useState("dashboard");
  const [filter, setFilter] = useState({
    type: "all",
    category: "all",
    search: "",
  });
  const [sort, setSort] = useState({ field: "date", dir: "desc" });

  /* derived */
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0),
    [transactions],
  );
  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0),
    [transactions],
  );
  const balance = totalIncome - totalExpense;

  const categories = useMemo(
    () => [...new Set(transactions.map((t) => t.category))].sort(),
    [transactions],
  );

  const filtered = useMemo(() => {
    let r = [...transactions];
    if (filter.type !== "all") r = r.filter((t) => t.type === filter.type);
    if (filter.category !== "all")
      r = r.filter((t) => t.category === filter.category);
    if (filter.search)
      r = r.filter((t) =>
        t.desc.toLowerCase().includes(filter.search.toLowerCase()),
      );
    r.sort((a, b) => {
      let av = sort.field === "amount" ? +a[sort.field] : a[sort.field];
      let bv = sort.field === "amount" ? +b[sort.field] : b[sort.field];
      return av < bv
        ? sort.dir === "asc"
          ? -1
          : 1
        : av > bv
          ? sort.dir === "asc"
            ? 1
            : -1
          : 0;
    });
    return r;
  }, [transactions, filter, sort]);

  const spendingByCategory = useMemo(() => {
    const m = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        m[t.category] = (m[t.category] || 0) + t.amount;
      });
    return Object.entries(m)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const m = {};
    transactions.forEach((t) => {
      const d = new Date(t.date + "T00:00:00");
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!m[k]) m[k] = { label: MONTHS[d.getMonth()], income: 0, expense: 0 };
      t.type === "income"
        ? (m[k].income += t.amount)
        : (m[k].expense += t.amount);
    });
    return Object.entries(m)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, v]) => ({ ...v, net: v.income - v.expense }));
  }, [transactions]);

  const balanceTrend = useMemo(() => {
    let running = 0;
    return [...transactions]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((t) => {
        running += t.type === "income" ? t.amount : -t.amount;
        return { date: t.date.slice(5), balance: running };
      });
  }, [transactions]);

  /* actions */
  const addTransaction = useCallback(
    (tx) =>
      setTransactions((p) => [
        ...p,
        { ...tx, id: Date.now(), amount: parseFloat(tx.amount) },
      ]),
    [],
  );
  const updateTransaction = useCallback(
    (tx) =>
      setTransactions((p) =>
        p.map((t) =>
          t.id === tx.id ? { ...tx, amount: parseFloat(tx.amount) } : t,
        ),
      ),
    [],
  );
  const deleteTransaction = useCallback(
    (id) => setTransactions((p) => p.filter((t) => t.id !== id)),
    [],
  );
  const toggleSort = useCallback(
    (field) =>
      setSort((s) =>
        s.field === field
          ? { field, dir: s.dir === "asc" ? "desc" : "asc" }
          : { field, dir: "desc" },
      ),
    [],
  );

  const value = {
    transactions,
    role,
    setRole,
    activeTab,
    setActiveTab,
    filter,
    setFilter,
    sort,
    toggleSort,
    filtered,
    categories,
    totalIncome,
    totalExpense,
    balance,
    spendingByCategory,
    monthlyData,
    balanceTrend,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
