import React from "react";
import { useAppContext } from "../context/AppContext";
import InsightCard from "../components/InsightCard";
import CustomTooltip from "../components/CustomTooltip";
import { CAT_COLORS } from "../assets/assets";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";

const Insights = () => {
  const {
    spendingByCategory,
    monthlyData,
    totalIncome,
    totalExpense,
    transactions,
  } = useAppContext();
  const top = spendingByCategory[0];
  const savingsRate =
    totalIncome > 0
      ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
      : 0;
  const avgExpense = Math.round(
    totalExpense /
      Math.max(1, transactions.filter((t) => t.type === "expense").length),
  );
  const $$ = (n) =>
    "$" + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard
          label="Top Spending Category"
          value={top?.name || "—"}
          sub={`${$$(top?.value || 0)} total`}
          color={CAT_COLORS[top?.name] || "#e2e8f0"}
          borderColor="#eab308"
        />
        <InsightCard
          label="Savings Rate"
          value={savingsRate + "%"}
          sub="of total income"
          color="#6366f1"
          borderColor="#6366f1"
        />
        <InsightCard
          label="Avg Expense"
          value={$$(avgExpense)}
          sub="per transaction"
          color="#22c55e"
          borderColor="#22c55e"
        />
      </div>

      {/* Net MoM */}
      <div className="bg-[#131720] border border-white/[0.07] rounded-2xl p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
          Month-over-Month Net
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff08"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#475569" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#475569" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => "$" + (v / 1000).toFixed(1) + "k"}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey="net" name="Net" radius={[4, 4, 0, 0]}>
              {monthlyData.map((e, i) => (
                <Cell key={i} fill={e.net >= 0 ? "#22c55e" : "#f87171"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Bars */}
      <div className="bg-[#131720] border border-white/[0.07] rounded-2xl p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">
          Spending Breakdown
        </p>
        <div className="space-y-4">
          {spendingByCategory.map((c) => {
            const pct = Math.round((c.value / totalExpense) * 100);
            return (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ background: CAT_COLORS[c.name] || "#888" }}
                    />
                    <span className="text-slate-300">{c.name}</span>
                  </div>
                  <div className="flex gap-4 text-slate-500 text-xs font-mono">
                    <span>{$$(c.value)}</span>
                    <span className="w-8 text-right">{pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: pct + "%",
                      background: CAT_COLORS[c.name] || "#888",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Observations */}
      <div className="bg-[#131720] border border-white/[0.07] rounded-2xl p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
          Key Observations
        </p>
        <div className="space-y-3">
          {[
            {
              dot: "#eab308",
              text: `Your biggest expense is ${top?.name || "—"} at ${$$(top?.value || 0)}, accounting for ${Math.round(((top?.value || 0) / totalExpense) * 100)}% of total spending.`,
            },
            {
              dot: "#6366f1",
              text: `You saved ${savingsRate}% of your income. ${savingsRate >= 20 ? "Excellent! You're above the 20% benchmark." : "Consider trimming discretionary spending to hit 20%."}`,
            },
            {
              dot: "#22c55e",
              text: `Across ${transactions.length} transactions, your average expense is ${$$(avgExpense)} — with ${transactions.filter((t) => t.type === "income").length} income sources tracked.`,
            },
          ].map((o, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ background: o.dot }}
              />
              <p className="text-sm text-slate-400 leading-relaxed">{o.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
