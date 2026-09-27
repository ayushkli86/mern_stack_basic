import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateSchool = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [students, setStudents] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/school/${id}`)
        if (!res.ok) throw new Error('School not found')
        const data = await res.json()
        setName(data.name || '')
        setLocation(data.location || '')
        setStudents(data.students || '')
      } catch (err) {
        setMessage({ type: 'error', text: err.message })
      } finally {
        setLoading(false)
      }
    }
    fetchSchool()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const data = {
      name,
      location,
      students: Number(students)
    }

    try {
      const res = await fetch(`http://localhost:5000/api/school/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!res.ok) throw new Error('Failed to update school')

      setMessage({ type: 'success', text: 'School updated successfully!' })
      setTimeout(() => navigate('/school'), 1500)
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="page-container"><p>Loading...</p></div>

  return (
    <div className="page-container">
      <h1>Update School #{id}</h1>
      {message && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Students</label>
          <input type="number" value={students} onChange={(e) => setStudents(e.target.value)} required />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Updating...' : 'Update'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/school')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateSchool
