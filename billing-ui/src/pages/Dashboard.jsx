import { useState, useEffect } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboard()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card"><p>Loading dashboard...</p></div>;
  if (!data) return <div className="card"><p>Could not load dashboard</p></div>;

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>📊 Dashboard</h2>

      <div className="card-grid">
        <div className="stat-card">
          <div className="stat-value">{data.totalInvoices}</div>
          <div className="stat-label">Total Invoices</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.todayInvoices}</div>
          <div className="stat-label">Today's Invoices</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹{data.todayRevenue?.toLocaleString() || 0}</div>
          <div className="stat-label">Today's Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.totalCustomers}</div>
          <div className="stat-label">Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.totalProducts}</div>
          <div className="stat-label">Products</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 12 }}>📈 Monthly Revenue</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {data.monthlyData?.length > 0 ? data.monthlyData.map((m) => (
            <div key={m._id} style={{
              flex: 1, minWidth: 80, background: "#e8f0fe", borderRadius: 8,
              padding: 12, textAlign: "center",
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1a73e8" }}>
                ₹{m.revenue?.toLocaleString()}
              </div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
                Month {m._id} · {m.count} inv
              </div>
            </div>
          )) : <p style={{ color: "#999", fontSize: 13 }}>No data yet</p>}
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 12 }}>🕐 Recent Invoices</h3>
        {data.recentInvoices?.length > 0 ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentInvoices.map((inv) => (
                  <tr key={inv._id}>
                    <td><strong>{inv.invoiceNo}</strong></td>
                    <td>{inv.customer?.name || inv.customerName}</td>
                    <td>₹{inv.grandTotal?.toLocaleString()}</td>
                    <td><span className={`badge badge-${inv.status}`}>{inv.status}</span></td>
                    <td>{new Date(inv.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p style={{ color: "#999", fontSize: 13 }}>No invoices yet. Create one!</p>}
      </div>
    </div>
  );
}
