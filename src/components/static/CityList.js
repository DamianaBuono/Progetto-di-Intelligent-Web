// src/components/CityList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuery } from '../../api';
import 'materialize-css/dist/css/materialize.min.css'; // Importa Materialize CSS
import '../style/CityList.css';

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCities = async () => {
      const query = `
        PREFIX giappone: <http://www.example.org/giappone#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?city ?region (GROUP_CONCAT(DISTINCT ?cultura; SEPARATOR=", ") AS ?cultureList)
        WHERE {
          ?city rdf:type giappone:Città .
          ?city giappone:nellaRegione ?region .
          OPTIONAL {
            ?city giappone:haOrigine ?cultura .
          }
        }
        GROUP BY ?city ?region
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
            const cultures = city.cultureList ? city.cultureList.value.split(', ').map(culture => culture.split('#')[1]) : [];
            return (
              <div className="col s12 m6 l4" key={city.city.value}>
                <div className="card">
                  <div className="photo">
                    <img
                      src={`/images/citta/${cityName}.jpg`} 
                      className="card-img-top"
                      alt={cityName}
                    />
                    <div className="photos">Foto</div>
                  </div>
                  <div className="content">
                    <p className="txt4">{cityName}</p>
                    <p className="txt5">Regione: {city.region.value.split('#')[1]}</p>
                  </div>
                  <div className="content">
                    <p className="txt6">
                      Ha origine la cultura: {cultures.length > 0 ? cultures.join(', ') : ' Nessuna cultura ha origine da questa città!'}
                    </p>
                  </div>
                  <div className="footerCity">
                    <Link to={`/attivita/${encodeURIComponent(cityName)}`} className="waves-effect waves-light btn">
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
