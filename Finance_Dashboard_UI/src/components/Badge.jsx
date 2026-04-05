import React from "react";
const CAT_COLORS = {
  Housing: "#6366f1",
  Food: "#f97316",
  Subscriptions: "#a855f7",
  Utilities: "#10b981",
  Shopping: "#eab308",
  Health: "#ec4899",
  Transport: "#3b82f6",
  Education: "#8b5cf6",
  Income: "#22c55e",
};

const Badge = ({ cat }) => {
  const color = CAT_COLORS[cat] || "#888";

  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: color + "22", color }}
    >
      {cat}
    </span>
  );
};

export default Badge;
