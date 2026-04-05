import React from "react";
import { useAppContext } from "../context/AppContext";
import SummaryCard from "../components/SummaryCard";
import CustomTooltip from "../components/CustomTooltip";
import Badge from "../components/Badge";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { CAT_COLORS } from "../assets/assets";

const Dashboard = () => {
  const {
    totalIncome,
    totalExpense,
    balance,
    transactions,
    balanceTrend,
    spendingByCategory,
    monthlyData,
  } = useAppContext();

  const summaryCards = [
    {
      label: "Net Balance",
      value: balance,
      sub: "Total position",
      accentColor: balance >= 0 ? "#22c55e" : "#f87171",
      icon: "◈",
    },
    {
      label: "Total Income",
      value: totalIncome,
      sub: `${transactions.filter((t) => t.type === "income").length} transactions`,
      accentColor: "#6366f1",
      icon: "↑",
    },
    {
      label: "Total Expenses",
      value: totalExpense,
      sub: `${transactions.filter((t) => t.type === "expense").length} transactions`,
      accentColor: "#f97316",
      icon: "↓",
    },
  ];
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((c, i) => (
          <SummaryCard
            key={c.label}
            label={c.label}
            value={c.value}
            sub={c.sub}
            accentColor={c.accentColor}
            icon={c.icon}
            delay={i * 100}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Balance Trend */}
        <div className="lg:col-span-3 bg-[#131720] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-3">Balance Trend</p>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={balanceTrend}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="label" stroke="#64748b" fontSize={10} />
              <YAxis
                tick={{ fontSize: 10, fill: "#475569" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => "$" + (v / 1000).toFixed(0) + "k"}
                stroke="#64748b"
                fontSize={10}
              />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="balance"
                name="balance"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={false}
                fill="url(#colorBalance)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="lg:col-span-2 bg-[#131720] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-3">Spending Breakdown</p>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={spendingByCategory || []}
                dataKey="value"
                innerRadius={50}
                outerRadius={80}
              >
                {spendingByCategory.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CAT_COLORS[entry.name] || "#888"}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-3">
            {spendingByCategory.slice(0, 6).map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-1.5 text-[11px] text-slate-500"
              >
                <span
                  className="w-2 h-2 rounded-sm"
                  style={{ background: CAT_COLORS[c.name] || "#888" }}
                />
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="bg-[#131720] border border-white/10 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-3">
          Monthly Income vs Expenses
        </p>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="label" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />

            <Bar dataKey="income" fill="#6366f1" />
            <Bar dataKey="expense" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex gap-5 mt-3">
          {[
            ["Income", "#6366f1"],
            ["Expenses", "#f97316"],
          ].map(([l, c]) => (
            <div
              key={l}
              className="flex items-center gap-1.5 text-xs text-slate-500"
            >
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ background: c }}
              />
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
