import React from 'react'
import CosmosNavLink from '../CosmosNavLink'
import CosmosRoute from '../component/CosmosRoute'
import './App.css'

const App = () => {
  return (
    <div>
      <CosmosNavLink />
      <main className="main-content">
        <CosmosRoute />
      </main>
    </div>
  )
}

export default App