// src/components/Festivita.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../../api';
import HeaderFestival from './HeaderFestival';

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
      <HeaderFestival />

      {error && <p style={{ color: 'red' }}>{error}</p>}



      {arti.length > 0 ? (
        <section className="light">
        {arti.map((item) => (
        <div className="container py-4" key={item.festa?.value || item.festa.value}>
          <article className="postcard light red">
            <a className="postcard__img_link">
              <img className="postcard__img" 
              src={`/images/festivita/${item.festa?.value.split('#')[1]}.jpg`} 
              alt={item.festa?.value || 'Immagine non disponibile'}
              />
            </a>
            <div className="postcard__text t-dark">
              <h1 className="postcard__title red">{item.festa.value.split('#')[1]}</h1>
              <div className="postcard__subtitle small">
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
              <div className="card-body">
                  <p className="card-text">Tecnica utilizzata: {item.tu?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Materiali utilizzati: {item.mu?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Significato Simbolico: {item.ss?.value || 'Nessuna informazione a riguardo'}</p>
                  <p className="card-text">Ha origine a: {item.cittaOrigine ? item.cittaOrigine.value.split(', ').map(extractCityName).join(', ') : 'Non ha una città specifica di origine, ma è praticata in tutto il Giappone'} </p>
                  <p className="card-text">{item.periodoS?.value.split('#')[1] || 'N|A'} </p>
                </div>
              </div>
            </div>
          </article>
        </div>
        ))}
      </section>
      ) : (
        <p>Nessun dato disponibile.</p>
      )}

    </div>
  );
};

export default Festivita;

