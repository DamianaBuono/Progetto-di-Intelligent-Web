// src/components/HeaderCity.js
import React from 'react';
import '../style/HeaderAll.css';

const HeaderPiatti = ({ Piatti }) => {
  // Costruisci il percorso dell'immagine dinamicamente
  const imagePath = `/images/all/Piatti.jpg`;

  return (
    <div className="parallax-wrapper-City">
      <div className="hero-City">
        <img src={imagePath} alt={`Piatti`} />
        <div className="hero__title-City">
          <h1>Piatti Tipici</h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderPiatti;
