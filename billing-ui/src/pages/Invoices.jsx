import { useState, useEffect, useRef } from "react";
import { api } from "../api";

function InvoiceView({ invoice, onClose }) {
  const printRef = useRef();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 700 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h3>🧾 Invoice</h3>
          <div className="btn-group">
            <button className="btn btn-sm btn-primary" onClick={() => window.print()}>🖨️ Print</button>
            <button className="btn btn-sm" onClick={onClose} style={{ background: "#eee" }}>✕</button>
          </div>
        </div>

        <div ref={printRef}>
          <div className="invoice-header">
            <div className="invoice-title">
              <h1>{invoice.invoiceNo}</h1>
              <h3>{new Date(invoice.date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</h3>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontWeight: 600 }}>{invoice.customerName}</p>
              <p style={{ fontSize: 12, color: "#666" }}>{invoice.customerPhone}</p>
              <p style={{ fontSize: 12, color: "#666" }}>{invoice.customerAddress}</p>
              {invoice.customerGstin && <p style={{ fontSize: 12 }}>GST: {invoice.customerGstin}</p>}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Tax</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.rate.toFixed(2)}</td>
                  <td>₹{item.amount.toFixed(2)}</td>
                  <td>{item.taxPct > 0 ? `${item.taxPct}% (₹${item.taxAmt.toFixed(2)})` : "—"}</td>
                  <td><strong>₹{item.netAmount.toFixed(2)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "right", marginTop: 16, padding: "12px 0", borderTop: "2px solid #1a73e8" }}>
            <p>Subtotal: ₹{invoice.subtotal?.toFixed(2)}</p>
            <p>Tax: ₹{invoice.taxTotal?.toFixed(2)}</p>
            {invoice.discount > 0 && <p>Discount: -₹{invoice.discount.toFixed(2)}</p>}
            <h2 style={{ color: "#1a73e8", marginTop: 4 }}>Grand Total: ₹{invoice.grandTotal?.toFixed(2)}</h2>
            <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Paid via {invoice.paymentMode?.toUpperCase()}</p>
          </div>
          {invoice.notes && <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>📝 {invoice.notes}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Invoices() {
  const [data, setData] = useState({ invoices: [], total: 0, page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [viewInvoice, setViewInvoice] = useState(null);

  const load = () => {
    const params = { page, limit: 15 };
    if (status) params.status = status;
    api.getInvoices(params).then(setData).catch(() => {});
  };

  useEffect(() => { load(); }, [page, status]);

  useEffect(() => { setPage(1); }, [status]);

  const del = async (id) => {
    if (!confirm("Delete this invoice?")) return;
    await api.deleteInvoice(id);
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2>🧾 Invoices</h2>
        <div className="btn-group">
          <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: 140 }}>
            <option value="">All Status</option>
            <option value="paid">✅ Paid</option>
            <option value="unpaid">⏳ Unpaid</option>
            <option value="cancelled">❌ Cancelled</option>
          </select>
        </div>
      </div>

      <div className="card">
        {data.invoices.length === 0 ? <p style={{ color: "#999" }}>No invoices found</p> : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.invoices.map((inv) => (
                    <tr key={inv._id} style={{ cursor: "pointer" }} onClick={() => setViewInvoice(inv)}>
                      <td><strong>{inv.invoiceNo}</strong></td>
                      <td>{new Date(inv.date).toLocaleDateString()}</td>
                      <td>{inv.customer?.name || inv.customerName}</td>
                      <td>{inv.items?.length || 0}</td>
                      <td>₹{inv.grandTotal?.toLocaleString()}</td>
                      <td>
                        <span style={{
                          padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600,
                          background: inv.status === "paid" ? "#d4edda" : inv.status === "unpaid" ? "#fff3cd" : "#f8d7da",
                          color: inv.status === "paid" ? "#155724" : inv.status === "unpaid" ? "#856404" : "#721c24",
                        }}>
                          {inv.status}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <button className="btn btn-sm btn-danger" onClick={() => del(inv._id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
              <span style={{ fontSize: 13, color: "#666" }}>Page {data.page} of {data.pages} ({data.total} total)</span>
              <div className="btn-group">
                <button className="btn btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)} style={{ background: "#eee" }}>← Prev</button>
                <button className="btn btn-sm" disabled={page >= data.pages} onClick={() => setPage(page + 1)} style={{ background: "#eee" }}>Next →</button>
              </div>
            </div>
          </>
        )}
      </div>

      {viewInvoice && <InvoiceView invoice={viewInvoice} onClose={() => setViewInvoice(null)} />}
    </div>
  );
}
