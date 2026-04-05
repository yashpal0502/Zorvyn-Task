import { useCallback, useContext, useMemo } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MONTHS, transactionsData } from "../assets/assets";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(transactionsData);
  const [role, setRole] = useState("viewer");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [filter, setFilter] = useState({
    type: "all",
    category: "all",
    search: "",
  });
  const [sort, setSort] = useState({
    field: "date",
    dir: "desc",
  });

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions],
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions],
  );

  const balance = totalIncome - totalExpense;

  const spendingByCategory = useMemo(() => {
    const map = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const map = {};

    transactions.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;

      if (!map[key]) {
        map[key] = {
          label: MONTHS[d.getMonth()],
          income: 0,
          expense: 0,
        };
      }

      if (t.type === "income") map[key].income += t.amount;
      else map[key].expense += t.amount;
    });

    return Object.values(map);
  }, [transactions]);

  const balanceTrend = useMemo(() => {
    let cumulativeIncome = 0;
    let cumulativeExpense = 0;

    return monthlyData.map((item) => {
      cumulativeIncome += item.income;
      cumulativeExpense += item.expense;
      return {
        ...item,
        balance: cumulativeIncome - cumulativeExpense,
      };
    });
  }, [monthlyData]);

  const value = {
    transactions,
    setTransactions,
    role,
    setRole,
    filter,
    setFilter,
    activeTab,
    setActiveTab,
    sort,
    totalIncome,
    totalExpense,
    balance,
    spendingByCategory,
    monthlyData,
    balanceTrend,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
