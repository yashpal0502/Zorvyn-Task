import React from "react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { role, setRole, activeTab, setActiveTab } = useAppContext();

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "⬡" },
    { id: "transactions", label: "Transactions", icon: "≡" },
    { id: "insights", label: "Insights", icon: "◎" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0c0e14]/95 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-black text-white">
            F
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-100">
            Fintrak
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white/[0.04] rounded-xl px-1 py-1 border border-white/[0.06]">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                ${activeTab === t.id ? "bg-indigo-500/20 text-indigo-300 shadow" : "text-slate-500 hover:text-slate-300"}`}
            >
              <span className="text-[10px]">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Role + Add */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden sm:block">
              Role
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-white/[0.05] border border-white/10 rounded-lg text-xs text-slate-300 px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {role === "admin" && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
            >
              <span className="text-base leading-none">+</span> Add
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
