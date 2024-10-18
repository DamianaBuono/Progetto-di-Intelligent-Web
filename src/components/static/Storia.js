import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../../api';
import '../style/CityList.css';

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

  // Ordinare le card in base all'anno di inizio
  const sortedStoria = storia.sort((a, b) => {
    return parseInt(a.valueI.value) - parseInt(b.valueI.value); // Converte le stringhe in numeri per il confronto
  });

  return (
    <div className="container mt-3">
      <h2>Storia del Giappone</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {sortedStoria.length > 0 ? (
        <div className="row">
          {sortedStoria.map((item) => {
            const periodoName = item.storia.value.split('#')[1]; // definizione di periodoName
            console.log(`/images/periodo/${periodoName}.jpg`);
            return (
              <div className="col s12 m6 l4 mb-4" key={item.storia.value}>
                <div className="card h-100">
                  <div className="photo">
                    <img
                      src={`/images/periodo/${periodoName}.jpg`} // Assicurati che l'immagine esista
                      className="card-img-top"
                      alt={periodoName}
                    />
                    <div className="photos">Foto</div>
                  </div>
                  <div className="card-body">
                    <h5 className="txt5">{periodoName}</h5>
                    <p className="txt2">{item.periodoS.value}</p>
                    <p className="txt2">Anno di inizio: {item.valueI.value}</p>
                    <p className="txt2">Anno di fine: {item.valueF.value}</p>
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

export default Storia;
