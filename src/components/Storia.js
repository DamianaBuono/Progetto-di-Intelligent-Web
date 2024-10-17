// src/components/Storia.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../api';

const Storia = () => {
  const [storia, setStoria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStoria = async () => {
      const query = `
        PREFIX giappone: <http://www.example.org/giappone#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT ?storia ?valueI ?valueF ?periodoS
        WHERE {
          {
            ?storia rdf:type giappone:GiapponeClassico .
            ?storia giappone:annoInizio ?valueI .
            ?storia giappone:annoFine ?valueF .
            BIND("Giappone Classico" AS ?periodoS)
          }
          UNION
          {
            ?storia rdf:type giappone:GiapponeMedievale .
            ?storia giappone:annoInizio ?valueI .
            ?storia giappone:annoFine ?valueF .
            BIND("Giappone Medievale" AS ?periodoS)
          }
          UNION
          {
            ?storia rdf:type giappone:GiapponeModerno .
            ?storia giappone:annoInizio ?valueI .
            ?storia giappone:annoFine ?valueF .
            BIND("Giappone Moderno" AS ?periodoS)
          }
          UNION
          {
            ?storia rdf:type giappone:GiapponePremoderno .
            ?storia giappone:annoInizio ?valueI .
            ?storia giappone:annoFine ?valueF .
            BIND("Giappone Premoderno" AS ?periodoS)
          }
        }
      `;

      try {
        const data = await fetchQuery(query);
        if (data && data.results && data.results.bindings) {
          setStoria(data.results.bindings);
        } else {
          setError("Nessun dato trovato.");
        }
      } catch (err) {
        setError("Si è verificato un errore durante il recupero dei dati.");
      } finally {
        setLoading(false);
      }
    };

    getStoria();
  }, []);

  if (loading) {
    return <p>Caricamento della storia...</p>;
  }

  return (
    <div className="container mt-3">
      <h2>Storia del Giappone</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {storia.length > 0 ? (
        <div className="row">
          {storia.map((item) => (
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

export default Storia;
