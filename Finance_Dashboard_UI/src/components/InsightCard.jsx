import React from "react";

const InsightCard = ({ label, value, sub, color, borderColor }) => {
  return (
    <div
      className="bg-[#131720] border border-white/[0.07] rounded-2xl p-5 relative overflow-hidden"
      style={{ borderLeftColor: borderColor, borderLeftWidth: 3 }}
    >
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="text-2xl font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-xs text-slate-600 mt-1">{sub}</p>
    </div>
  );
};

export default InsightCard;
