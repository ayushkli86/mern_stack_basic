import React from 'react'

const ReadAllProduct = () => {
  const products = [
    { id: 1, name: 'Sample Product', price: 99.99, quantity: 10 }
  ]

  return (
    <div className="page-container">
      <h1>All Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ReadAllProduct
