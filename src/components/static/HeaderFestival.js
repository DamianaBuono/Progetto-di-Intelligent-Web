// src/components/HeaderCity.js
import React from 'react';
import '../style/HeaderAll.css';

const HeaderFestival = ({ Festival }) => {
  // Costruisci il percorso dell'immagine dinamicamente
  const imagePath = `/images/all/Festival.jpg`;

  return (
    <div className="parallax-wrapper-City">
      <div className="hero-City">
        <img src={imagePath} alt={`Festival`} />
        <div className="hero__title-City">
          <h1>Celebrazioni e Festival</h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderFestival;
