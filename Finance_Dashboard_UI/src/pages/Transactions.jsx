import React from "react";
import { useAppContext } from "../context/AppContext";
import TransactionRow from "../components/TransactionRow";

const Transactions = () => {
  const {
    filtered,
    filter,
    setFilter,
    sort,
    toggleSort,
    categories,
    transactions,
    role,
    deleteTransaction,
  } = useAppContext();
  const isAdmin = role === "admin";
  const cols = isAdmin
    ? "130px 1fr 130px 100px 80px 100px"
    : "130px 1fr 130px 100px 80px";

  const SortHdr = ({ field, label }) => (
    <button
      onClick={() => toggleSort(field)}
      className="text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors flex items-center gap-1"
    >
      {label}
      <span className="text-[10px]">
        {sort.field === field ? (sort.dir === "asc" ? "↑" : "↓") : "↕"}
      </span>
    </button>
  );
  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Search…"
          value={filter.search}
          onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
          className="flex-1 min-w-[180px] bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <select
          value={filter.type}
          onChange={(e) => setFilter((f) => ({ ...f, type: e.target.value }))}
          className="bg-[#131720] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filter.category}
          onChange={(e) =>
            setFilter((f) => ({ ...f, category: e.target.value }))
          }
          className="bg-[#131720] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#131720] border border-white/[0.07] rounded-2xl overflow-hidden">
        {/* Header */}
        <div
          className="hidden md:grid items-center px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]"
          style={{ gridTemplateColumns: cols }}
        >
          <SortHdr field="date" label="Date" />
          <SortHdr field="desc" label="Description" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Category
          </span>
          <SortHdr field="amount" label="Amount" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
            Type
          </span>
          {isAdmin && (
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
              Actions
            </span>
          )}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-600">
            <div className="text-4xl mb-3 opacity-40">◉</div>
            <p className="text-sm">No transactions match your filters</p>
          </div>
        ) : (
          filtered.map((tx) => (
            <TransactionRow
              key={tx.id}
              tx={tx}
              cols={cols}
              isAdmin={isAdmin}
              onDelete={deleteTransaction}
            />
          ))
        )}
      </div>

      <p className="text-xs text-slate-600">
        {filtered.length} of {transactions.length} transactions
      </p>
    </div>
  );
};

export default Transactions;
