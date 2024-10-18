// src/components/HeaderCity.js
import React from 'react';
import '../style/HeaderCity.css';

const HeaderCity = ({ cityName }) => {
  // Costruisci il percorso dell'immagine dinamicamente
  const imagePath = `/images/citta/${cityName}.jpg`;

  return (
    <div className="parallax-wrapper">
      <div className="hero">
        <img src={imagePath} alt={`Vista di ${cityName}`} />
        <div className="hero__title">
          <h1>Attività a {cityName}</h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderCity;
