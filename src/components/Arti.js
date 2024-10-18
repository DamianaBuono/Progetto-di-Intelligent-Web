// src/components/Arti.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../api';

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
    return <p>Caricamento della storia...</p>;
  }

  const extractCityName = (cityUri) => {
    // Supponiamo che l'URI sia nel formato http://www.example.org/giappone#Città
    // Estrai il nome della città dall'URI
    if (!cityUri) return '';
    const parts = cityUri.split('#');
    return parts.length > 1 ? parts[1] : cityUri; // Restituisce solo la parte dopo il #
  };

  return (
    <div className="container mt-3">
      <h2>Cultura delle Arti Giapponesi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {arti.length > 0 ? (
        <div className="row">
          {arti.map((item) => (
            <div className="col-md-4 mb-4" key={item.arti?.value || item.arti.value}>
              <div className="card h-100">
                <img
                  src={`/images/arti/${item.arti?.value.split('#')[1]}.jpg`} 
                  className="card-img-top"
                  alt={item.arti?.value || 'Immagine non disponibile'}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.arti.value.split('#')[1]}</h5>
                  <p className="card-text">Tipologia di Arte: {item.VoP?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Tecnica utilizzata: {item.tu?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Materiali utilizzati: {item.mu?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Significato Simbolico: {item.ss?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Artisti: {item.artisti?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">
                    Ha origine a: {item.cittaOrigine ? item.cittaOrigine.value.split(', ').map(extractCityName).join(', ') : 'Non ha una città specifica di origine, ma è praticata in tutto il Giappone'}
                  </p>
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
