import { useState, useEffect } from "react";
import { api } from "../api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", gstin: "" });

  const load = () => api.getCustomers(search).then(setCustomers).catch(() => {});

  useEffect(() => { load(); }, [search]);

  const openNew = () => {
    setEdit(null);
    setForm({ name: "", phone: "", email: "", address: "", gstin: "" });
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEdit(c);
    setForm({ name: c.name, phone: c.phone, email: c.email, address: c.address, gstin: c.gstin });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.name.trim()) return alert("Name required");
    try {
      if (edit) await api.updateCustomer(edit._id, form);
      else await api.createCustomer(form);
      setShowModal(false);
      load();
    } catch (e) { alert(e.message); }
  };

  const del = async (id) => {
    if (!confirm("Delete this customer?")) return;
    await api.deleteCustomer(id);
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2>👥 Customers</h2>
        <button className="btn btn-primary" onClick={openNew}>+ Add Customer</button>
      </div>

      <div className="search-bar">
        <input className="form-control" placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="card">
        {customers.length === 0 ? <p style={{ color: "#999" }}>No customers yet</p> : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>GSTIN</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id}>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.phone || "—"}</td>
                    <td>{c.email || "—"}</td>
                    <td>{c.gstin || "—"}</td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-sm btn-primary" onClick={() => openEdit(c)}>✏️ Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => del(c._id)}>🗑️</button>
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
            <h3>{edit ? "✏️ Edit Customer" : "➕ Add Customer"}</h3>
            <div className="form-group">
              <label>Name *</label>
              <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input className="form-control" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea className="form-control" rows="2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="form-group">
              <label>GSTIN</label>
              <input className="form-control" value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value })} />
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
