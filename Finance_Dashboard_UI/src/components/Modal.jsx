import React from "react";
import { ALL_CATEGORIES } from "../assets/assets";

const Modal = ({
  title,
  onClose,
  onSubmit,
  submitLabel = "Save",
  form,
  setForm,
}) => {
  return (
    <div className="fixed inset-0 z-50 min-h-screen flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#131720] border border-white/10 rounded-2xl w-full max-w-md p-7 shadow-2xl my-auto">
        <h3 className="text-base font-bold text-slate-100 mb-5">{title}</h3>
        <div className="flex flex-col gap-3">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <input
            placeholder="Description"
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
            className="w-full bg-[#1a2030] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {ALL_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className="w-full bg-[#1a2030] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:opacity-90 transition-opacity"
          >
            {submitLabel}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm text-slate-400 border border-white/10 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
