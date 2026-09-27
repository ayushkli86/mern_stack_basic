import { useState, useEffect } from "react";
import { api } from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", tax: "0", hsnCode: "", unit: "pcs", stock: "0" });

  const load = () => api.getProducts(search).then(setProducts).catch(() => {});

  useEffect(() => { load(); }, [search]);

  const openNew = () => {
    setEdit(null);
    setForm({ name: "", price: "", tax: "0", hsnCode: "", unit: "pcs", stock: "0" });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEdit(p);
    setForm({ name: p.name, price: String(p.price), tax: String(p.tax), hsnCode: p.hsnCode, unit: p.unit, stock: String(p.stock) });
    setShowModal(true);
  };

  const save = async () => {
    const data = { ...form, price: parseFloat(form.price) || 0, tax: parseFloat(form.tax) || 0, stock: parseInt(form.stock) || 0 };
    if (!data.name || !data.price) return alert("Name and price required");
    try {
      if (edit) await api.updateProduct(edit._id, data);
      else await api.createProduct(data);
      setShowModal(false);
      load();
    } catch (e) { alert(e.message); }
  };

  const del = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.deleteProduct(id);
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2>📦 Products</h2>
        <button className="btn btn-primary" onClick={openNew}>+ Add Product</button>
      </div>

      <div className="search-bar">
        <input className="form-control" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="card">
        {products.length === 0 ? <p style={{ color: "#999" }}>No products yet</p> : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Tax</th>
                  <th>HSN</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td><strong>{p.name}</strong> <span style={{ color: "#999", fontSize: 11 }}>({p.unit})</span></td>
                    <td>₹{p.price.toLocaleString()}</td>
                    <td>{p.tax}%</td>
                    <td>{p.hsnCode || "—"}</td>
                    <td>{p.stock}</td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-sm btn-primary" onClick={() => openEdit(p)}>✏️ Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => del(p._id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{edit ? "✏️ Edit Product" : "➕ Add Product"}</h3>
            <div className="form-group">
              <label>Product Name *</label>
              <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price (₹) *</label>
                <input className="form-control" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Tax (%)</label>
                <input className="form-control" type="number" step="0.1" value={form.tax} onChange={(e) => setForm({ ...form, tax: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>HSN Code</label>
                <input className="form-control" value={form.hsnCode} onChange={(e) => setForm({ ...form, hsnCode: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select className="form-control" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                  <option value="pcs">Pieces</option>
                  <option value="kg">Kilogram</option>
                  <option value="g">Gram</option>
                  <option value="l">Liter</option>
                  <option value="ml">Milliliter</option>
                  <option value="m">Meter</option>
                  <option value="box">Box</option>
                  <option value="pack">Pack</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input className="form-control" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="form-actions">
              <button className="btn btn-success" onClick={save}>{edit ? "Update" : "Save"}</button>
              <button className="btn" onClick={() => setShowModal(false)} style={{ background: "#eee" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
