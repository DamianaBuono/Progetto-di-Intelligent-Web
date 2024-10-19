// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/static/Navbar';
import Home from './components/static/Home';
import CityList from './components/static/CityList';
import CityActivitiesList from './components/static/CityActivitiesList';
import PiattiTipici from './components/static/PiattiTipici';
import Posti from './components/static/Posti';
import Storia from './components/static/Storia';
import Footer from './Footer';
import Arti from './components/static/Arti';
import Tradizioni from './components/static/Tradizioni';
import Festivita from './components/static/Festivita';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/citta" element={<CityList />} />
            <Route path="/attivita/:cityName" element={<CityActivitiesList />} />
            <Route path="/gastronomia" element={<PiattiTipici />} />
            <Route path="/posti-da-visitare" element={<Posti />} />
            <Route path="/storia" element={<Storia />} />
            <Route path="/cultura/arti" element={<Arti />} />
            <Route path="/cultura/tradizioni" element={<Tradizioni />} />
            <Route path="/cultura/festivita" element={<Festivita />} />
          </Routes>
        </div>   

        <Footer />
      </div>
    </Router>
  );
}

export default App;
