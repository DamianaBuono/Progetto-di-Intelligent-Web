import React from 'react';
import '../style/Header.css';

const Header = () => {
  return (
    
    <div className="parallax-wrapper">
      <div className="hero parallax-content">
        <img
          src="./images/homepage/header.jpg"
          alt="Vista del Giappone"
        />
        <div className="hero__title">
          <h1>Esplora le Meraviglie del Giappone</h1>
          <p>
            Un viaggio tra storia, cultura, arte e tradizioni del Sol Levante. Scopri i luoghi iconici e immergiti nelle 
            meraviglie di una terra ricca di fascino e bellezza.
          </p>
        </div>
      </div>
      <div className="main-content">
        <div className="scroll-icon-container">
          <svg className="icon--down-arrow" viewBox="0 0 24 24">
            <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" />
          </svg>
        </div>
        <h2>Scopri il Giappone in ogni sua sfaccettatura</h2>
        <p>
          La Guida del Giappone ti accompagnerà attraverso le meraviglie di questa terra affascinante. 
          Dai templi antichi di Kyoto alle moderne città di Tokyo e Osaka, esplora la ricca storia, 
          le tradizioni culturali e i luoghi imperdibili. 
        </p>
        <p>
          Immergiti nelle arti, nella gastronomia e nei parchi naturali che rendono unico il Giappone. Scopri l'evoluzione 
          storica del paese, dalle sue origini alle influenze contemporanee. Ogni angolo di questa nazione racconta 
          una storia affascinante e indimenticabile.
        </p>
        <p>
          Con la nostra guida, potrai pianificare il tuo viaggio alla scoperta di posti unici, conoscere le tradizioni più 
          antiche e vivere un'esperienza culturale completa. Un'avventura straordinaria ti aspetta!
        </p>
      </div>
    </div>
  );
};

export default Header;
