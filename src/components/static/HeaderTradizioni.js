// src/components/HeaderCity.js
import React from 'react';
import '../style/HeaderAll.css';

const HeaderTradizioni = ({ Tradizioni }) => {
  // Costruisci il percorso dell'immagine dinamicamente
  const imagePath = `/images/all/Tradizioni.jpg`;

  return (
    <div className="parallax-wrapper-City">
      <div className="hero-City">
        <img src={imagePath} alt={`Tradizioni`} />
        <div className="hero__title-City">
          <h1>Essenza delle Tradizioni</h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderTradizioni;
