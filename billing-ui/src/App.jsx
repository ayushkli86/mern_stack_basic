import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import NewInvoice from "./pages/NewInvoice";
import Invoices from "./pages/Invoices";
import "./App.css";

function Layout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "📊 Dashboard", icon: "📊" },
    { path: "/invoices", label: "🧾 Invoices", icon: "🧾" },
    { path: "/new-invoice", label: "➕ New Invoice", icon: "➕" },
    { path: "/products", label: "📦 Products", icon: "📦" },
    { path: "/customers", label: "👥 Customers", icon: "👥" },
  ];

  return (
    <div className="app-layout">
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>💰 Billing</h2>
          <p className="sidebar-sub">Management System</p>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/new-invoice" element={<NewInvoice />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
