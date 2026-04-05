import React, { useEffect, useState } from "react";

const SummaryCard = ({ label, value, sub, accentColor, icon, delay }) => {
  const [show, setShow] = useState(false);
  const $$ = (n) =>
    "$" + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`relative bg-[#131720] border border-white/[0.07] rounded-2xl p-5 overflow-hidden transition-all duration-500
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div
        className="absolute right-4 top-4 text-3xl"
        style={{ color: accentColor }}
      >
        {icon}
      </div>
      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
        {label}
      </p>
      <p
        className="text-2xl font-bold tabular-nums"
        style={{ color: accentColor }}
      >
        {value < 0 ? "-" : ""}
        {$$(value)}
      </p>
      <p className="text-xs text-slate-600 mt-1.5">{sub}</p>
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-30 rounded-b-2xl"
        style={{ background: accentColor }}
      />
    </div>
  );
};

export default SummaryCard;
