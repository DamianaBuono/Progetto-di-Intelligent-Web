// src/components/HeaderCity.js
import React from 'react';
import '../style/HeaderAll.css';

const HeaderArti = ({ Arti }) => {
  // Costruisci il percorso dell'immagine dinamicamente
  const imagePath = `/images/all/Arti.jpg`;

  return (
    <div className="parallax-wrapper-City">
      <div className="hero-City">
        <img src={imagePath} alt={`Vista di Arti`} />
        <div className="hero__title-City">
          <h1>Cultura delle Arti</h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderArti;
