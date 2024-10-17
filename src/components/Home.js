// src/components/Home.js
import React from 'react';
import Slider from './Slider';
import Card from './Card';


const Home = () => {
  return (
    <div className="home">
      <h2>Benvenuto nella Guida del Giappone!</h2>
      <p>Scopri le meraviglie del Giappone attraverso le nostre sezioni.</p>
    
      <Slider />
      <Card />
    </div>
    
  );
};

export default Home;
