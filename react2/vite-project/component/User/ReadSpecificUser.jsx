import React from 'react'
import { useParams } from 'react-router-dom'

const ReadSpecificUser = () => {
  const { id } = useParams()

  return (
    <div className="page-container">
      <h1>User Details</h1>
      <p>Viewing user with ID: <strong>{id}</strong></p>
      <div className="detail-card">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Age:</strong> 25</p>
      </div>
    </div>
  )
}

export default ReadSpecificUser
