import React from "react";
import Badge from "./Badge";
import { useAppContext } from "../context/AppContext";
import Modal from "./Modal";

const TransactionRow = ({ tx, onDelete, isAdmin, cols }) => {
  const { editTx, setEditTx, editForm, setEditForm, updateTransaction } =
    useAppContext();

  const openEdit = (tx) => {
    setEditTx(tx);
    setEditForm({ ...tx });
  };

  const handleSaveEdit = () => {
    if (!editForm.date || !editForm.desc || !editForm.amount) return;
    updateTransaction(editForm);
    setEditTx(null);
  };

  const fmtDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const $$ = (n) =>
    "$" + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div
      className={`grid items-center px-4 py-3.5 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors text-sm`}
      style={{ gridTemplateColumns: cols }}
    >
      <span className="text-slate-500 text-xs font-mono">
        {fmtDate(tx.date)}
      </span>
      <span className="font-medium text-slate-200 truncate pr-2">
        {tx.desc}
      </span>
      <span>
        <Badge cat={tx.category} />
      </span>
      <span
        className={`font-mono font-semibold flex px-2.5 ${tx.type === "income" ? "text-emerald-400" : "text-rose-400"}`}
      >
        {tx.type === "income" ? "+" : "−"}
        {$$(tx.amount)}
      </span>
      <span
        className={`text-center text-[11px] px-2.5 py-0.5 rounded-full font-semibold w-fit mx-auto
        ${tx.type === "income" ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"}`}
      >
        {tx.type}
      </span>
      {isAdmin && (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => openEdit(tx)}
            className="text-[11px] px-2.5 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(tx.id)}
            className="text-[11px] px-2.5 py-1 rounded-lg border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            Del
          </button>
        </div>
      )}

      {editTx?.id === tx.id && (
        <Modal
          title="Edit Transaction"
          onClose={() => setEditTx(null)}
          onSubmit={handleSaveEdit}
          submitLabel="Save Changes"
          form={editForm}
          setForm={setEditForm}
        />
      )}
    </div>
  );
};

export default TransactionRow;
