// src/components/Arti.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../../api';
import '../style/CityActivitiesList.css';
import HeaderArti from './HeaderArti';

const Arti = () => {
  const [arti, setArti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArti = async () => {
      const query = `
        PREFIX giappone: <http://www.example.org/giappone#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?arti ?tu ?mu ?artisti ?ss ?VoP ?periodoS (GROUP_CONCAT(?citta; separator=", ") AS ?cittaOrigine)
        WHERE {
          {
            ?arti rdf:type giappone:ArtiPerformative .
            ?arti giappone:tecnicaUtilizzata ?tu .
    		    ?arti giappone:creatoNel ?periodoS .
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
  			    ?arti giappone:creatoNel ?periodoS .
            OPTIONAL { ?arti giappone:haOrigineA ?citta . }
            BIND("Arti Visive" AS ?VoP)
          }
        }
        GROUP BY ?arti ?tu ?mu ?artisti ?ss ?VoP ?periodoS
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
    return <p>Caricamento della arti...</p>;
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
      <HeaderArti />

      {error && <p style={{ color: 'red' }}>{error}</p>}





      {arti.length > 0 ? (
        <div className="row">
          {arti.map((item) => (
            <section className="light">
            <div className="container py-4">
              <article className="postcard light red">
                <a className="postcard__img_link">
                  <img className="postcard__img" src={`/images/arti/${item.arti?.value.split('#')[1]}.jpg`} alt={item.arti?.value || 'Immagine non disponibile'} />
                </a>
                <div className="postcard__text t-dark">
                  <h1 className="postcard__title red">{item.arti.value.split('#')[1]}</h1>
                  <div className="postcard__subtitle small">
                  </div>
                  <div className="postcard__bar"></div>
                  <div className="postcard__preview-txt">
                  <ul className="list-group mb-3">
                    <p className="card-text">Tipologia di Arte: {item.VoP?.value || 'Nessuna informazione a riguardo'}</p>
                    <p className="card-text">Tecnica utilizzata: {item.tu?.value || 'Nessuna informazione a riguardo'}</p>
                    <p className="card-text">Materiali utilizzati: {item.mu?.value || 'Nessuna informazione a riguardo'}</p>
                    <p className="card-text">Significato Simbolico: {item.ss?.value || 'Nessuna informazione a riguardo'}</p>
                    <p className="card-text">Artisti: {item.artisti?.value || 'Nessuna informazione a riguardo'}</p>
                    <p className="card-text">Ha origine a: {item.cittaOrigine ? item.cittaOrigine.value.split(', ').map(extractCityName).join(', ') : 'Non ha una città specifica di origine, ma è praticata in tutto il Giappone'} </p>
                    <p className="card-text">Periodo Storico: {item.periodoS?.value.split('#')[1] || 'N|A'} </p>
              </ul>
                  </div>
                </div>
              </article>
            </div>
          </section>
          ))}
        </div>
      ) : (
        <p>Nessun dato disponibile.</p>
      )}

    </div>
  );
};

export default Arti;

