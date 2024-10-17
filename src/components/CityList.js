// src/components/CityList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuery } from '../api';

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCities = async () => {
      const query = `
        PREFIX giappone: <http://www.example.org/giappone#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?city ?region
        WHERE {
          ?city rdf:type giappone:Città .
          ?city giappone:nellaRegione ?region .
        }
      `;
      
      try {
        const data = await fetchQuery(query);
        if (data && data.results && data.results.bindings) {
          setCities(data.results.bindings);
        } else {
          setError("Nessun dato trovato.");
        }
      } catch (err) {
        setError("Si è verificato un errore durante il recupero dei dati.");
      } finally {
        setLoading(false);
      }
    };
    
    getCities();
  }, []);
  
  if (loading) {
    return <p>Caricamento delle città...</p>;
  }

  return (
    <div className="container mt-3">
      <h2>Città del Giappone</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="row">
        {cities.length > 0 ? (
          cities.map((city) => {
            const cityName = city.city.value.split('#')[1]; // definizione di cityName
            console.log(`/images/${cityName}.jpg`);
            return (
              <div className="col-md-4 mb-4" key={city.city.value}>
                <div className="card h-100">
                  <img
                    src={`/images/citta/${cityName}.jpg`} 
                    className="card-img-top"
                    alt={cityName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{cityName}</h5> {/* Mostra solo il nome della città */}
                    <p className="card-text">Regione: {city.region.value.split('#')[1]}</p> {/* Mostra solo il nome della regione */}
                    <Link to={`/attivita/${encodeURIComponent(cityName)}`} className="btn btn-primary">
                      Vedi Attività
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Nessuna città trovata.</p>
        )}
      </div>
    </div>
  );
};

export default CityList;
