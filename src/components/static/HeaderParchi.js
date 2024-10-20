// src/components/HeaderCity.js
import React from 'react';
import '../style/HeaderAll.css';

const HeaderParchi = ({ Parchi }) => {
  // Costruisci il percorso dell'immagine dinamicamente
  const imagePath = `/images/all/Parchi.jpg`;

  return (
    <div className="parallax-wrapper-City">
      <div className="hero-City">
        <img src={imagePath} alt={`Parchi`} />
        <div className="hero__title-City">
          <h1>Parchi Naturali</h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderParchi;
