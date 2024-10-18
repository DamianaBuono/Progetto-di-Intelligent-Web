/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import '../style/Card.css';

const Card = () => {
  return (
    <div className="artboard">
      {/* Card 1 - Storia */}
      <div className="card card--storia"> {/* Aggiungi la classe `card--storia` */}
        {/* Front Side */}
        <div className="card__side card__side--front">
          <div className="card__theme">
            <div className="card__theme-box">
              <p className="card__title">Storia</p>
            </div>
          </div>
        </div>
        
        {/* Back Side */}
        <div className="card__side card__side--back">
          <div className="card__cover">
            <h4 className="card__heading"></h4>
          </div>
          <div className="card__details">
            <ul>
              <li>Origini antiche e cultura classica</li>
              <li>Periodo Medievale</li>
              <li>Rinascita e modernizzazione</li>
              <li>Il Giappone contemporaneo</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Card 2 - Città */}
      <div className="card card--citta"> {/* Aggiungi la classe `card--citta` */}
        {/* Front Side */}
        <div className="card__side card__side--front">
          <div className="card__theme">
            <div className="card__theme-box">
              <p className="card__title">Città</p>
            </div>
          </div>
        </div>
        
        {/* Back Side */}
        <div className="card__side card__side--back">
          <div className="card__cover">
            <h4 className="card__heading"></h4>
          </div>
          <div className="card__details">
            <ul>
              <li>Tokyo: la capitale moderna</li>
              <li>Kyoto: templi e tradizioni</li>
              <li>Osaka: cibo e cultura pop</li>
              <li>Sapporo: neve e natura</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Card 3 - Parchi Nazionali */}
      <div className="card card--parchi"> {/* Aggiungi la classe `card--parchi` */}
        {/* Front Side */}
        <div className="card__side card__side--front">
          <div className="card__theme">
            <div className="card__theme-box">
              <p className="card__title">Parchi</p>
            </div>
          </div>
        </div>
        
        {/* Back Side */}
        <div className="card__side card__side--back">
          <div className="card__cover">
            <h4 className="card__heading"></h4>
          </div>
          <div className="card__details">
            <ul>
              <li>Fuji-Hakone-Izu: Montagna e laghi</li>
              <li>Nikko: santuari e foreste</li>
              <li>Shiretoko: natura selvaggia</li>
              <li>Aso-Kuju: paesaggi vulcanici</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
