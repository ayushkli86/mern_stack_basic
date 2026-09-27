const BASE = "http://localhost:8000/api";

async function request(url, options = {}) {
  const res = await fetch(`${BASE}${url}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

export const api = {
  // Customers
  getCustomers: (search) => request(`/customers?search=${search || ""}`),
  createCustomer: (data) => request("/customers", { method: "POST", body: JSON.stringify(data) }),
  updateCustomer: (id, data) => request(`/customers/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteCustomer: (id) => request(`/customers/${id}`, { method: "DELETE" }),

  // Products
  getProducts: (search) => request(`/products?search=${search || ""}`),
  createProduct: (data) => request("/products", { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE" }),

  // Invoices
  getInvoices: (params) => request(`/invoices?${new URLSearchParams(params)}`),
  getInvoice: (id) => request(`/invoices/${id}`),
  createInvoice: (data) => request("/invoices", { method: "POST", body: JSON.stringify(data) }),
  deleteInvoice: (id) => request(`/invoices/${id}`, { method: "DELETE" }),
  getDashboard: () => request("/invoices/dashboard"),
};
