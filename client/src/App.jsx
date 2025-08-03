import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import SearchResults from './pages/SearchResults'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App
