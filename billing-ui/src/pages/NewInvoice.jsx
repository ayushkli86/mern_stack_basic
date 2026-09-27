import { useState, useEffect } from "react";
import { api } from "../api";

export default function NewInvoice() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerInfo, setCustomerInfo] = useState(null);
  const [items, setItems] = useState([{ productId: "", name: "", qty: 1, rate: 0, taxPct: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [paymentMode, setPaymentMode] = useState("cash");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.getCustomers().then(setCustomers).catch(() => {});
    api.getProducts().then(setProducts).catch(() => {});
  }, []);

  const selectCustomer = (id) => {
    setCustomerId(id);
    const c = customers.find((x) => x._id === id);
    setCustomerInfo(c || null);
  };

  const selectProduct = (idx, productId) => {
    const p = products.find((x) => x._id === productId);
    const newItems = [...items];
    newItems[idx] = {
      productId,
      name: p ? `${p.name} (${p.unit || "pcs"})` : "",
      qty: 1,
      rate: p ? p.price : 0,
      taxPct: p ? p.tax : 0,
    };
    setItems(newItems);
  };

  const updateItem = (idx, field, value) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productId: "", name: "", qty: 1, rate: 0, taxPct: 0 }]);
  };

  const removeItem = (idx) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  const calcAmount = (item) => {
    const amount = item.qty * item.rate;
    const taxAmt = amount * (item.taxPct / 100);
    return { amount, taxAmt, netAmount: amount + taxAmt };
  };

  const getSubtotal = () => items.reduce((s, item) => s + item.qty * item.rate, 0);
  const getTaxTotal = () => items.reduce((s, item) => s + (item.qty * item.rate * item.taxPct / 100), 0);
  const getGrandTotal = () => getSubtotal() + getTaxTotal() - parseFloat(discount || 0);

  const save = async () => {
    if (!customerId) return alert("Please select a customer");
    if (!items[0].productId) return alert("Please add at least one item");
    setSaving(true);
    try {
      const payload = {
        customer: customerId,
        customerName: customerInfo?.name || "",
        customerPhone: customerInfo?.phone || "",
        customerAddress: customerInfo?.address || "",
        customerGstin: customerInfo?.gstin || "",
        items: items.map((item) => {
          const { amount, taxAmt, netAmount } = calcAmount(item);
          return {
            product: item.productId,
            name: item.name,
            qty: item.qty,
            rate: item.rate,
            amount,
            taxPct: item.taxPct,
            taxAmt,
            netAmount,
          };
        }),
        subtotal: getSubtotal(),
        taxTotal: getTaxTotal(),
        discount: parseFloat(discount || 0),
        grandTotal: getGrandTotal(),
        notes,
        paymentMode,
        status: "paid",
      };
      await api.createInvoice(payload);
      setMessage("✅ Invoice created successfully!");
      // Reset form
      setCustomerId("");
      setCustomerInfo(null);
      setItems([{ productId: "", name: "", qty: 1, rate: 0, taxPct: 0 }]);
      setDiscount(0);
      setNotes("");
      setPaymentMode("cash");
      setTimeout(() => setMessage(null), 4000);
    } catch (e) {
      alert(e.message);
    }
    setSaving(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>🧾 New Invoice</h2>

      {message && <div className="card" style={{ background: "#d4edda", border: "1px solid #c3e6cb" }}>{message}</div>}

      <div className="card">
        <h3 style={{ marginBottom: 12 }}>👤 Customer</h3>
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label>Select Customer</label>
            <select className="form-control" value={customerId} onChange={(e) => selectCustomer(e.target.value)}>
              <option value="">— Select Customer —</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>{c.name} {c.phone ? `(${c.phone})` : ""}</option>
              ))}
            </select>
          </div>
        </div>
        {customerInfo && (
          <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
            {customerInfo.phone && <span>📞 {customerInfo.phone}  </span>}
            {customerInfo.gstin && <span>🆔 {customerInfo.gstin}  </span>}
            {customerInfo.address && <span>📍 {customerInfo.address}</span>}
          </div>
        )}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 12 }}>📦 Items</h3>
        <div className="invoice-items">
          <div className="invoice-item-row" style={{ fontWeight: 600, fontSize: 12, color: "#555", marginBottom: 4 }}>
            <span>Product</span>
            <span>Qty</span>
            <span>Rate</span>
            <span>Tax</span>
            <span>Amount</span>
            <span></span>
          </div>
          {items.map((item, idx) => {
            const { amount, taxAmt, netAmount } = calcAmount(item);
            return (
              <div key={idx} className="invoice-item-row">
                <select className="form-control" value={item.productId} onChange={(e) => selectProduct(idx, e.target.value)}>
                  <option value="">— Select —</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>{p.name} (₹{p.price})</option>
                  ))}
                </select>
                <input className="form-control" type="number" min="1" value={item.qty}
                  onChange={(e) => updateItem(idx, "qty", parseFloat(e.target.value) || 0)} />
                <input className="form-control" type="number" step="0.01" value={item.rate}
                  onChange={(e) => updateItem(idx, "rate", parseFloat(e.target.value) || 0)} />
                <input className="form-control" type="number" step="0.1" value={item.taxPct}
                  onChange={(e) => updateItem(idx, "taxPct", parseFloat(e.target.value) || 0)} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>₹{netAmount.toFixed(2)}</span>
                <button className="remove-item" onClick={() => removeItem(idx)}>✕</button>
              </div>
            );
          })}
        </div>

        <button className="add-item-btn" onClick={addItem}>+ Add Item</button>

        <div className="invoice-totals">
          <p>Subtotal: ₹{getSubtotal().toFixed(2)}</p>
          <p>Tax: ₹{getTaxTotal().toFixed(2)}</p>
          <div className="form-group" style={{ maxWidth: 200, marginLeft: "auto" }}>
            <label>Discount (₹)</label>
            <input className="form-control" type="number" step="0.01" value={discount}
              onChange={(e) => setDiscount(e.target.value)} style={{ textAlign: "right" }} />
          </div>
          <p className="grand-total">Grand Total: ₹{getGrandTotal().toFixed(2)}</p>
        </div>
      </div>

      <div className="card">
        <div className="form-row">
          <div className="form-group">
            <label>Payment Mode</label>
            <select className="form-control" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
              <option value="cash">💵 Cash</option>
              <option value="card">💳 Card</option>
              <option value="upi">📱 UPI</option>
              <option value="credit">📋 Credit</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <input className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes..." />
          </div>
        </div>
      </div>

      <button className="btn btn-success" onClick={save} disabled={saving} style={{ fontSize: 16, padding: "12px 30px" }}>
        {saving ? "Saving..." : "💾 Save Invoice"}
      </button>
    </div>
  );
}
