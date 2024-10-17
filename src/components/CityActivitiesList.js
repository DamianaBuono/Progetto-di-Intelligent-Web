// src/components/CityActivitiesList.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuery } from '../api';

const CityActivitiesList = () => {
  const { cityName } = useParams(); // Ottieni il nome della città dall'URL
  const [restaurants, setRestaurants] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [bars, setBars] = useState([]);
  const [museums, setMuseums] = useState([]);
  const [temples, setTemples] = useState([]);
  const [spas, setSpas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getActivities = async () => {
      const queries = {
        restaurants: `
          PREFIX giappone: <http://www.example.org/giappone#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?restaurant
          WHERE {
            ?restaurant rdf:type giappone:Ristoranti .
            ?restaurant giappone:nellaCittà giappone:${cityName} .
          }
        `,
        attractions: `
          PREFIX giappone: <http://www.example.org/giappone#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?attazioni ?tipoAtt
          WHERE {
            {
              ?attazioni rdf:type giappone:AttrazioniModerne .
              ?attazioni giappone:nellaCittà giappone:${cityName} .
              BIND("Attrazioni Moderne" AS ?tipoAtt)
            }
            UNION
            {
              ?attazioni rdf:type giappone:AttrazioniStoriche .
              ?attazioni giappone:nellaCittà giappone:${cityName} .
              BIND("Attrazioni Storiche" AS ?tipoAtt)
            }
          }
        `,
        bars: `
          PREFIX giappone: <http://www.example.org/giappone#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?bar ?tipoBar
          WHERE {
            {
              ?bar rdf:type giappone:CocktailBar .
              ?bar giappone:nellaCittà giappone:${cityName} .
              BIND("Cocktail Bar" AS ?tipoBar)
            }
            UNION
            {
              ?bar rdf:type giappone:Izakaya .
              ?bar giappone:nellaCittà giappone:${cityName} .
              BIND("Izakaya Bar" AS ?tipoBar)
            }
            UNION
            {
              ?bar rdf:type giappone:KaraokeBar .
              ?bar giappone:nellaCittà giappone:${cityName} .
              BIND("Karaoke Bar" AS ?tipoBar)
            }
          }
        `,
        museums: `
          PREFIX giappone: <http://www.example.org/giappone#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?museo ?tipoMuseo
          WHERE {
            {
              ?museo rdf:type giappone:MuseiArte .
              ?museo giappone:nellaCittà giappone:${cityName} .
              BIND("Museo di Arte" AS ?tipoMuseo)
            }
            UNION
            {
              ?museo rdf:type giappone:MuseiScienza .
              ?museo giappone:nellaCittà giappone:${cityName} .
              BIND("Museo di Scienza" AS ?tipoMuseo)
            }
            UNION
            {
              ?museo rdf:type giappone:MuseiStoria .
              ?museo giappone:nellaCittà giappone:${cityName} .
              BIND("Museo di Storia" AS ?tipoMuseo)
            }
          }
        `,
        temples: `
          PREFIX giappone: <http://www.example.org/giappone#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?temple
          WHERE {
            ?temple rdf:type giappone:TempliESantuari .
            ?temple giappone:nellaCittà giappone:${cityName} .
          }
        `,
        spas: `
          PREFIX giappone: <http://www.example.org/giappone#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?spa
          WHERE {
            ?spa rdf:type giappone:Terme .
            ?spa giappone:nellaCittà giappone:${cityName} .
          }
        `
      };

      try {
        const [restaurantsData, attractionsData, barsData, museumsData, templesData, spasData] = await Promise.all([
          fetchQuery(queries.restaurants),
          fetchQuery(queries.attractions),
          fetchQuery(queries.bars),
          fetchQuery(queries.museums),
          fetchQuery(queries.temples),
          fetchQuery(queries.spas)
        ]);

        // Verifica se i dati sono definiti e imposta gli stati
        setRestaurants(restaurantsData.results.bindings || []);
        setAttractions(attractionsData.results.bindings || []);
        setBars(barsData.results.bindings || []);
        setMuseums(museumsData.results.bindings || []);
        setTemples(templesData.results.bindings || []);
        setSpas(spasData.results.bindings || []);
      } catch (err) {
        setError("Si è verificato un errore durante il recupero dei dati.");
      } finally {
        setLoading(false);
      }
    };

    getActivities();
  }, [cityName]);

  if (loading) {
    return <p>Caricamento delle attività...</p>;
  }

  return (
    <div className="container mt-3">
      <h2>Attività a {cityName}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {restaurants.length > 0 && (
        <div>
          <h3>Ristoranti</h3>
          <ul className="list-group mb-3">
            {restaurants.map((restaurant) => (
              <li className="list-group-item" key={restaurant?.restaurant?.value || 'unknown'}>
                {restaurant?.restaurant?.value.split('#')[1] || 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {attractions.length > 0 && (
        <div>
          <h3>Attrazioni</h3>
          <ul className="list-group mb-3">
            {attractions.map((attraction) => (
              <li className="list-group-item" key={attraction?.attazioni?.value || 'unknown'}>
                {attraction?.attazioni?.value.split('#')[1] || 'N/A'}
                <p className="card-text">Tipologia di Attrazione: {attraction?.tipoAtt?.value || 'N/A'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {bars.length > 0 && (
        <div>
          <h3>Bar</h3>
          <ul className="list-group mb-3">
            {bars.map((bar) => (
              <li className="list-group-item" key={bar?.bar?.value || 'unknown'}>
                {bar?.bar?.value.split('#')[1] || 'N/A'}
                <p className="card-text">Tipologia di Bar: {bar?.tipoBar?.value || 'N/A'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {museums.length > 0 && (
        <div>
          <h3>Musei</h3>
          <ul className="list-group mb-3">
            {museums.map((museum) => (
              <li className="list-group-item" key={museum?.museo?.value || 'unknown'}>
                {museum?.museo?.value.split('#')[1] || 'N/A'}
                <p className="card-text">Tipologia di Museo: {museum?.tipoMuseo?.value || 'N/A'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {temples.length > 0 && (
        <div>
          <h3>Templi</h3>
          <ul className="list-group mb-3">
            {temples.map((temple) => (
              <li className="list-group-item" key={temple?.temple?.value || 'unknown'}>
                {temple?.temple?.value.split('#')[1] || 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {spas.length > 0 && (
        <div>
          <h3>Termali</h3>
          <ul className="list-group mb-3">
            {spas.map((spa) => (
              <li className="list-group-item" key={spa?.spa?.value || 'unknown'}>
                {spa?.spa?.value.split('#')[1] || 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CityActivitiesList;
