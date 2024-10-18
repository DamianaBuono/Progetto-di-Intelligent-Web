// src/components/Home.js
import React from 'react';
import Slider from './Slider';
import Card from './Card';
import Header from './Header'; 


const Home = () => {
  return (
    <div className="home">
      <Header />
      <Slider />
      <Card />
    </div>
    
  );
};

export default Home;
