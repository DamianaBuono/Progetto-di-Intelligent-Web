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
        SELECT ?arti ?tu ?mu ?artisti ?ss ?VoP
        WHERE {
          {
            ?arti rdf:type giappone:ArtiPerformative .
            ?arti giappone:tecnicaUtilizzata ?tu .
            BIND("Arti Performative" AS ?VoP)
          }
          UNION
          {
            ?arti rdf:type giappone:ArtiVisive .
            ?arti giappone:tecnicaUtilizzata ?tu .
    		?arti giappone:materialiUtilizzati ?mu .
   			?arti giappone:AutoreArtista ?artisti .
    		?arti giappone:significatoSimbolico ?ss .
            BIND("Arti Visive" AS ?VoP)
  		  }
        }
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

  return (
    <div className="container mt-3">
      <h2>Cultura delle Arti Giapponesi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {arti.length > 0 ? (
        <div className="row">
          {arti.map((item) => (
            <div className="col-md-4 mb-4" key={item.storia.value}>
              <div className="card h-100">
                <img
                  src={`/images/periodo/${item.storia.value.split('#')[1]}.jpg`} // Assicurati che l'immagine esista
                  className="card-img-top"
                  alt={item.periodoS.value}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.storia.value.split('#')[1] }</h5>
                  <p className="card-text">Periodo Storico: {item.periodoS.value }</p>
                  <p className="card-text">Anno di inizio: {item.valueI.value }</p>
                  <p className="card-text">Anno di fine: {item.valueF.value }</p>
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
