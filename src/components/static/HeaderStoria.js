// src/components/HeaderCity.js
import React from 'react';
import '../style/HeaderAll.css';

const HeaderStoria = ({ Storia }) => {
  // Costruisci il percorso dell'immagine dinamicamente
  const imagePath = `/images/all/Storia.jpg`;

  return (
    <div className="parallax-wrapper-City">
      <div className="hero-City">
        <img src={imagePath} alt={`Storia`} />
        <div className="hero__title-City">
          <h1>Storia Nipponica</h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderStoria;
