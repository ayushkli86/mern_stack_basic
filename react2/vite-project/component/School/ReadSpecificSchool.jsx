import React from 'react'
import { useParams } from 'react-router-dom'

const ReadSpecificSchool = () => {
  const { id } = useParams()

  return (
    <div className="page-container">
      <h1>School Details</h1>
      <p>Viewing school with ID: <strong>{id}</strong></p>
      <div className="detail-card">
        <p><strong>Name:</strong> Springfield Elementary</p>
        <p><strong>Location:</strong> Springfield</p>
        <p><strong>Students:</strong> 500</p>
      </div>
    </div>
  )
}

export default ReadSpecificSchool
