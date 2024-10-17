// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CityList from './components/CityList';
import CityActivitiesList from './components/CityActivitiesList';
import Cultura from './components/Cultura';
import Gastronomia from './components/Gastronomia';
import Posti from './components/Posti';
import Storia from './components/Storia';
import Footer from './Footer';
import Slider from './Slider';


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
            <Route path="/cultura" element={<Cultura />} />
            <Route path="/gastronomia" element={<Gastronomia />} />
            <Route path="/posti-da-visitare" element={<Posti />} />
            <Route path="/storia" element={<Storia />} />
          </Routes>
        </div>
        <Slider />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
