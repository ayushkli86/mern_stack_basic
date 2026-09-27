import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './CosmosNavLink.css'

const CosmosNavLink = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__brand">Cosmos</div>

      <button
        className="navbar__toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <nav className={`navbar__links ${menuOpen ? 'open' : ''}`}>
        <NavLink className="navbar__link" to="/product" onClick={() => setMenuOpen(false)}>
          Product
        </NavLink>
        <NavLink className="navbar__link" to="/product/create" onClick={() => setMenuOpen(false)}>
          Create Product
        </NavLink>
        <NavLink className="navbar__link" to="/user" onClick={() => setMenuOpen(false)}>
          User
        </NavLink>
        <NavLink className="navbar__link" to="/user/create" onClick={() => setMenuOpen(false)}>
          Create User
        </NavLink>
        <NavLink className="navbar__link" to="/school" onClick={() => setMenuOpen(false)}>
          School
        </NavLink>
        <NavLink className="navbar__link" to="/school/create" onClick={() => setMenuOpen(false)}>
          Create School
        </NavLink>
      </nav>

      <div className="navbar__actions">
        <button className="navbar__button">Login</button>
        <button className="navbar__button">Signup</button>
      </div>
    </header>
  )
}

export default CosmosNavLink