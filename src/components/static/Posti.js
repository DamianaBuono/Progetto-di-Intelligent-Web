import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../../api';
import '../style/CityList.css';
import HeaderParchi from './HeaderParchi';

const Posti = () => {
  const [parchi, setParchi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getParchi = async () => {
      const query = `
      PREFIX giappone: <http://www.example.org/giappone#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT ?parchi (GROUP_CONCAT(DISTINCT ?region; SEPARATOR=", ") AS ?regionList)
      WHERE {
        ?parchi rdf:type giappone:ParchiNazionali .
        ?parchi giappone:nellaRegione ?region .
      }
      GROUP BY ?parchi
      `;

      try {
        const data = await fetchQuery(query);
        if (data && data.results && data.results.bindings) {
          setParchi(data.results.bindings);
        } else {
          setError("Nessun dato trovato.");
        }
      } catch (err) {
        setError("Si è verificato un errore durante il recupero dei dati.");
      } finally {
        setLoading(false);
      }
    };

    getParchi();
  }, []);

  if (loading) {
    return <p>Caricamento della Parchi...</p>;
  }

  return (
    <div className="container mt-3">
      <HeaderParchi />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {parchi.length > 0 ? (
        <div className="row">
          {parchi.map((item) => {
            const parchiNome = item.parchi.value.split('#')[1]; // definizione di periodoName
            const regions = item.regionList ? item.regionList.value.split(', ').map(region => region.split('#')[1]) : [];
            console.log(`/images/parchi/${parchiNome}.jpg`);
            return (
              <div className="col s12 m6 l4 mb-4" key={item.parchi.value}>
                <div className="card h-100">
                  <div className="photo">
                    <img
                      src={`/images/parchi/${parchiNome}.jpg`} // Assicurati che l'immagine esista
                      className="card-img-top"
                      alt={parchiNome}
                    />
                    <div className="photos">Foto</div>
                  </div>
                  <div className="card-body">
                    <h5 className="txt5">{parchiNome}</h5>
                    <p className="txt2">Si estende nella regione di {regions.length > 0 ? regions.join(' e di ') : ' Nessuna regione è associata a questo parco!'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Nessun dato disponibile.</p>
      )}
    </div>
  );
};

export default Posti;

