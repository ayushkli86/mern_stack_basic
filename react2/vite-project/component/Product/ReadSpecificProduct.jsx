import React from 'react'
import { useParams } from 'react-router-dom'

const ReadSpecificProduct = () => {
  const { id } = useParams()

  return (
    <div className="page-container">
      <h1>Product Details</h1>
      <p>Viewing product with ID: <strong>{id}</strong></p>
      <div className="detail-card">
        <p><strong>Name:</strong> Sample Product</p>
        <p><strong>Price:</strong> $99.99</p>
        <p><strong>Quantity:</strong> 10</p>
        <p><strong>Description:</strong> Product description goes here.</p>
      </div>
    </div>
  )
}

export default ReadSpecificProduct
