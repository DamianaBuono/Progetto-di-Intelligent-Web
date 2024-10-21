import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../../api';
import '../style/CityList.css';
import HeaderPiatti from './HeaderPiatti';

const PiattiTipici = () => {
  const [PiattiTipici, setPiattiTipici] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPiattiTipici = async () => {
      const query = `
        PREFIX giappone: <http://www.example.org/giappone#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT ?piatto ?desc
        WHERE {
  			  ?piatto rdf:type giappone:PiattiTipici .
              ?piatto giappone:descrizionePiatto ?desc .
		    }
      `;

      try {
        const data = await fetchQuery(query);
        if (data && data.results && data.results.bindings) {
          setPiattiTipici(data.results.bindings);
        } else {
          setError("Nessun dato trovato.");
        }
      } catch (err) {
        setError("Si è verificato un errore durante il recupero dei dati.");
      } finally {
        setLoading(false);
      }
    };

    getPiattiTipici();
  }, []);

  if (loading) {
    return <p>Caricamento della storia...</p>;
  }


  return (
    <div className="container mt-3">
      <HeaderPiatti />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {PiattiTipici.length > 0 ? (
        <div className="row">
          {PiattiTipici.map((item) => {
            const piattoTipico = item.piatto.value.split('#')[1]; // definizione di periodoName
            console.log(`/images/piatto/${piattoTipico}.jpg`);
            return (
              <div className="col s12 m6 l4 mb-4" key={item.piatto.value}>
                <div className="card h-100">
                  <div className="photo">
                    <img
                      src={`/images/piatto/${piattoTipico}.jpg`} // Assicurati che l'immagine esista
                      className="card-img-top"
                      alt={piattoTipico}
                    />
                    <div className="photos">Foto</div>
                  </div>
                  <div className="card-body">
                    <h5 className="txt5">{piattoTipico}</h5>
                    <p className="txt2">{item.desc.value}</p>
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

export default PiattiTipici;
