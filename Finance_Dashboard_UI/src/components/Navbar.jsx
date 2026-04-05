import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { LayoutDashboard, List, BarChart3, Menu, X } from "lucide-react";
import Modal from "./Modal";
import { assets } from "../assets/assets";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={14} /> },
  { id: "transactions", label: "Transactions", icon: <List size={14} /> },
  { id: "insights", label: "Insights", icon: <BarChart3 size={14} /> },
];
const Navbar = ({ onAdd }) => {
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    showAdd,
    setShowAdd,
    addForm,
    setAddForm,
    addTransaction,
  } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAdd = () => {
    if (!addForm.date || !addForm.desc || !addForm.amount) return;

    addTransaction(addForm);
    setShowAdd(false);
    setAddForm({
      date: "",
      desc: "",
      amount: "",
      category: "Food",
      type: "expense",
    });
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0c0e14]/95 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <img src={assets.zorvyn} alt="" className="w-30" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-colors"
        >
          {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Tabs - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.04] rounded-xl px-1 py-1 border border-white/[0.06]">
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

        {/* Role + Add - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
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
              onClick={() => {
                setShowAdd(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
            >
              <span className="text-base leading-none">+</span> Add
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0c0e14]/98 backdrop-blur-lg border-t border-white/[0.06]">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Tabs */}
            <div className="space-y-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                    ${activeTab === t.id ? "bg-indigo-500/20 text-indigo-300" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"}`}
                >
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
            {/* Mobile Role and Add */}
            <div className="border-t border-white/[0.06] pt-3 mt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Role</span>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-white/[0.05] border border-white/10 rounded-lg text-xs text-slate-300 px-2 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {role === "admin" && (
                  <button
                    onClick={() => {
                      setShowAdd(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <span className="text-sm leading-none">+</span> Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showAdd && (
        <Modal
          title="Add Transaction"
          onClose={() => setShowAdd(false)}
          onSubmit={handleAdd}
          submitLabel="Add Transaction"
          form={addForm}
          setForm={setAddForm}
        />
      )}
    </nav>
  );
};

export default Navbar;
