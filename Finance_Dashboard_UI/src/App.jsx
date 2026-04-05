import React from "react";
import Navbar from "./components/Navbar";
import { useAppContext } from "./context/AppContext";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";

const App = () => {
  const { activeTab } = useAppContext();

  const renderSection = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <Transactions />;
      case "insights":
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="min-h-screen bg-[#0c0e14] text-slate-100">
      <Navbar />

      <div>{renderSection()}</div>
    </div>
  );
};

export default App;
