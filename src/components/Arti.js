// src/components/Arti.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../api';
import './Arti.css';

const Arti = () => {
  const [arti, setArti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArti = async () => {
      const query = `
        PREFIX giappone: <http://www.example.org/giappone#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?arti ?tu ?mu ?artisti ?ss ?VoP (GROUP_CONCAT(?citta; separator=", ") AS ?cittaOrigine)
        WHERE {
          {
            ?arti rdf:type giappone:ArtiPerformative .
            ?arti giappone:tecnicaUtilizzata ?tu .
            OPTIONAL { ?arti giappone:haOrigineA ?citta . }
            BIND("Arti Performative" AS ?VoP)
          }
          UNION
          {
            ?arti rdf:type giappone:ArtiVisive .
            ?arti giappone:tecnicaUtilizzata ?tu .
            ?arti giappone:materialiUtilizzati ?mu .
            ?arti giappone:AutoreArtista ?artisti .
            ?arti giappone:significatoSimbolico ?ss .
            OPTIONAL { ?arti giappone:haOrigineA ?citta . }
            BIND("Arti Visive" AS ?VoP)
          }
        }
        GROUP BY ?arti ?tu ?mu ?artisti ?ss ?VoP
      `;

      try {
        const data = await fetchQuery(query);
        if (data && data.results && data.results.bindings) {
          setArti(data.results.bindings);
        } else {
          setError("Nessun dato trovato.");
        }
      } catch (err) {
        setError("Si è verificato un errore durante il recupero dei dati.");
      } finally {
        setLoading(false);
      }
    };

    getArti();
  }, []);

  if (loading) {
    return <p>Caricamento delle arti...</p>;
  }

  return (
    <div className="art-page artboard">  {/* Aggiungi la classe art-page qui */}
      <h2>Cultura delle Arti Giapponesi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {arti.length > 0 ? (
        <div className="row">
          {arti.map((item) => (
            <div className="card" key={item.arti.value}>
              <div className="card__side card__side--front">
                <div className="card__theme">
                  <div className="card__theme-box">
                    <p className="card__title">{item.arti.value.split('#')[1]}</p>
                  </div>
                </div>
              </div>
              <div className="card__side card__side--back">
                <div className="card__cover">
                  <h4 className="card__heading">{item.arti.value.split('#')[1]}</h4>
                </div>
                <div className="card__details">
                  <ul>
                    <li>Tipologia di Arte: {item.VoP?.value || 'Nessuna informazione a riguardo'}</li>
                    <li>Tecnica utilizzata: {item.tu?.value || 'Nessuna informazione a riguardo'}</li>
                    <li>Materiali utilizzati: {item.mu?.value || 'Nessuna informazione a riguardo'}</li>
                    <li>Significato Simbolico: {item.ss?.value || 'Nessuna informazione a riguardo'}</li>
                    <li>Artisti: {item.artisti?.value || 'Nessuna informazione a riguardo'}</li>
                    <li>Ha origine a: {item.cittaOrigine?.value || 'Non ha una città specifica di origine, ma è praticata in tutto il Giappone'}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nessun dato disponibile.</p>
      )}
    </div>
  );
};

export default Arti;
