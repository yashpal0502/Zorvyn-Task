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

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default App;
