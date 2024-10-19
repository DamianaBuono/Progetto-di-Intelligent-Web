// src/components/Festivita.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../../api';

const Festivita = () => {
  const [arti, setArti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFestivita = async () => {
      const query = `
        PREFIX giappone: <http://www.example.org/giappone#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?festa ?tu ?mu ?ss ?periodoS (GROUP_CONCAT(DISTINCT ?citta; separator=", ") AS ?cittaOrigine)
        WHERE {
            ?festa rdf:type giappone:Festività .
            OPTIONAL { ?festa giappone:tecnicaUtilizzata ?tu . }
            OPTIONAL { ?festa giappone:materialiUtilizzati ?mu . }
            OPTIONAL { ?festa giappone:significatoSimbolico ?ss . }
            OPTIONAL { ?festa giappone:creatoNel ?periodoS . }
            OPTIONAL { ?festa giappone:haOrigineA ?citta . }
        }
        GROUP BY ?festa ?tu ?mu ?ss ?periodoS
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

    getFestivita();
  }, []);

  if (loading) {
    return <p>Caricamento della festività...</p>;
  }

  const extractCityName = (cityUri) => {
    if (!cityUri) return '';
    const parts = cityUri.split('#');
    return parts.length > 1 ? parts[1] : cityUri; // Restituisce solo la parte dopo il #
  };

  return (
    <div className="container mt-3">
      <h2>Festival del Giapponesi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {arti.length > 0 ? (
        <div className="row">
          {arti.map((item) => (
            <div className="col-md-4 mb-4" key={item.festa?.value || item.festa.value}>
              <div className="card h-100">
                <img
                  src={`/images/festivita/${item.festa?.value.split('#')[1]}.jpg`} 
                  className="card-img-top"
                  alt={item.festa?.value || 'Immagine non disponibile'}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.festa.value.split('#')[1]}</h5>
                  <p className="card-text">Tecnica utilizzata: {item.tu?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Materiali utilizzati: {item.mu?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Significato Simbolico: {item.ss?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Ha origine a: {item.cittaOrigine ? item.cittaOrigine.value.split(', ').map(extractCityName).join(', ') : 'Non ha una città specifica di origine, ma è praticata in tutto il Giappone'} </p>
                  <p className="card-text">Periodo Storico: {item.periodoS?.value.split('#')[1] || 'N|A'} </p>
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

export default Festivita;

