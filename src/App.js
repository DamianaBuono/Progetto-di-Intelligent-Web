// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CityList from './components/CityList';
import CityActivitiesList from './components/CityActivitiesList';
import Gastronomia from './components/Gastronomia';
import Posti from './components/Posti';
import Storia from './components/Storia';
import Footer from './Footer';
import Arti from './components/Arti';
import Tradizioni from './components/Tradizioni';
import Festivita from './components/Festivita';

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
            <Route path="/gastronomia" element={<Gastronomia />} />
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
