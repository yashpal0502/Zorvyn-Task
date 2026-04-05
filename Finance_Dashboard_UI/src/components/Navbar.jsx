import React from "react";
import { useState } from "react";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "transactions", label: "Transactions" },
  { id: "insights", label: "Insights" },
];

const Navbar = () => {
  const [role, setRole] = useState("viewer");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid #1e2233",
      }}
    >
      <h3>Fintrak</h3>

      <div>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {role === "admin" && <button onClick={onAdd}>+ Add</button>}
      </div>
    </div>
  );
};

export default Navbar;
