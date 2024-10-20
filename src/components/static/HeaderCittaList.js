// src/components/HeaderCity.js
import React from 'react';
import '../style/HeaderAll.css';

const HeaderCitta = ({ Citta }) => {
  // Costruisci il percorso dell'immagine dinamicamente
  const imagePath = `/images/all/Citta.jpg`;

  return (
    <div className="parallax-wrapper-City">
      <div className="hero-City">
        <img src={imagePath} alt={`Citta`} />
        <div className="hero__title-City">
          <h1>Città</h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderCitta;
