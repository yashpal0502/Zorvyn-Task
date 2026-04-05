import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  const $$ = (n) =>
    "$" + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a2030] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-semibold" style={{ color: p.color }}>
          {p.name}: {$$(p.value)}
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;
