import { useCallback, useContext, useMemo } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { transactionData } from "../assets/assets";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(transactionData);
  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("");

  const value = {
    transactions,
    setTransactions,
    role,
    setRole,
    filter,
    setFilter,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
