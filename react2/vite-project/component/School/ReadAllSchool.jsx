import React from 'react'

const ReadAllSchool = () => {
  const schools = [
    { id: 1, name: 'Springfield Elementary', location: 'Springfield', students: 500 }
  ]

  return (
    <div className="page-container">
      <h1>All Schools</h1>
      {schools.length === 0 ? (
        <p>No schools found.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.id}>
                <td>{school.id}</td>
                <td>{school.name}</td>
                <td>{school.location}</td>
                <td>{school.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ReadAllSchool
