import React from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div className="App">
      <Layout>
        <Home />
      </Layout>
    </div>
  )
}

export default App
