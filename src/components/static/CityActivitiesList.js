// src/components/CityActivitiesList.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuery } from '../../api';
import HeaderCity from './HeaderCity';
import '../style/CityActivitiesList.css';

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
          SELECT ?restaurant ?piatto
          WHERE {
            ?restaurant rdf:type giappone:Ristoranti .
            ?restaurant giappone:nellaCittà giappone:${cityName} .
            OPTIONAL {
              ?restaurant giappone:haPiattoTipico ?piatto .
            }
          }
        `,
        attractions: `
          PREFIX giappone: <http://www.example.org/giappone#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?attrazioni ?tipoAtt
          WHERE {
            {
              ?attrazioni rdf:type giappone:AttrazioniModerne .
              ?attrazioni giappone:nellaCittà giappone:${cityName} .
              BIND("Attrazioni Moderne" AS ?tipoAtt)
            }
            UNION
            {
              ?attrazioni rdf:type giappone:AttrazioniStoriche .
              ?attrazioni giappone:nellaCittà giappone:${cityName} .
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
          SELECT ?temple ?value
          WHERE {
            ?temple rdf:type giappone:TempliESantuari .
            ?temple giappone:nellaCittà giappone:${cityName} .
            ?temple giappone:tipoLuogoDiCulto ?value .
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
      <HeaderCity cityName={cityName} /> {/* Passa cityName come props */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {restaurants.length > 0 && (
        <section className="light">
        <div className="container py-4">
          <article className="postcard light red">
            <a className="postcard__img_link">
              <img className="postcard__img" src="/images/activities/ristorante.jpg" alt="Image Title" />
            </a>
            <div className="postcard__text t-dark">
              <h1 className="postcard__title red">Ristoranti</h1>
              <div className="postcard__subtitle small">
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
              <ul className="list-group mb-3">
                {restaurants.map((restaurant) => (
                  <li className="list-group-item" key={restaurant?.restaurant?.value || 'unknown'}>
                    {restaurant?.restaurant?.value.split('#')[1] || 'N/A'}
                    <p className="card-text">Piatto tipico: {restaurant?.piatto?.value.split('#')[1] || 'Tale ristorante non ha nessun piatto tipico'}</p>
                  </li>
                ))}
          </ul>
              </div>
            </div>
          </article>
        </div>
      </section>
      )}

      {attractions.length > 0 && (
        <section className="light">
          <div className="container py-4">
            <article className="postcard light red">
              <a className="postcard__img_link">
                <img className="postcard__img" src="https://picsum.photos/501/500" alt="Image Title" />
              </a>
              <div className="postcard__text t-dark">
                <h1 className="postcard__title red">Attrazioni</h1>
                <div className="postcard__subtitle small">
                </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">
                  <ul className="list-group mb-3">
                    {attractions.map((attraction) => (
                      <li className="list-group-item" key={attraction?.attrazioni?.value || 'unknown'}>
                        {attraction?.attrazioni?.value.split('#')[1] || 'N/A'}
                        <p className="card-text">Tipo: {attraction?.tipoAtt?.value}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {bars.length > 0 && (
        <section className="light">
        <div className="container py-4">
          <article className="postcard light red">
            <a className="postcard__img_link">
              <img className="postcard__img" src="/images/activities/bar.jpg" alt="Image Title" />
            </a>
            <div className="postcard__text t-dark">
              <h1 className="postcard__title red">Bar</h1>
              <div className="postcard__subtitle small">
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
              <ul className="list-group mb-3">
                {bars.map((bar) => (
                  <li className="list-group-item" key={bar?.bar?.value || 'unknown'}>
                    {bar?.bar?.value.split('#')[1] || 'N/A'}
                    <p className="card-text">Tipo: {bar?.tipoBar?.value}</p>
                  </li>
                ))}
          </ul>
              </div>
            </div>
          </article>
        </div>
      </section>
      )}

      {museums.length > 0 && (
        <section className="light">
        <div className="container py-4">
          <article className="postcard light red">
            <a className="postcard__img_link">
              <img className="postcard__img" src="/images/activities/museo.jpg" alt="Image Title" />
            </a>
            <div className="postcard__text t-dark">
              <h1 className="postcard__title red">Musei</h1>
              <div className="postcard__subtitle small">
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
              <ul className="list-group mb-3">
                {museums.map((museo) => (
                  <li className="list-group-item" key={museo?.museo?.value || 'unknown'}>
                    {museo?.museo?.value.split('#')[1] || 'N/A'}
                    <p className="card-text">Tipo: {museo?.tipoMuseo?.value}</p>
                  </li>
                ))}
          </ul>
              </div>
            </div>
          </article>
        </div>
      </section>
      )}

      {temples.length > 0 && (
        <section className="light">
        <div className="container py-4">
          <article className="postcard light red">
            <a className="postcard__img_link">
              <img className="postcard__img" src="/images/activities/tempio.jpg" alt="Image Title" />
            </a>
            <div className="postcard__text t-dark">
              <h1 className="postcard__title red">Templi e Santuari</h1>
              <div className="postcard__subtitle small">
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
              <ul className="list-group mb-3">
                {temples.map((temple) => (
                  <li className="list-group-item" key={temple?.temple?.value || 'unknown'}>
                    {temple?.temple?.value.split('#')[1] || 'N/A'}
                    <p className="card-text">Tipo di luogo di culto: {temple?.value?.value}</p>
                  </li>
                ))}
          </ul>
              </div>
            </div>
          </article>
        </div>
      </section>
      )}

      {spas.length > 0 && (
        <section className="light">
        <div className="container py-4">
          <article className="postcard light red">
            <a className="postcard__img_link">
              <img className="postcard__img" src="/images/activities/terme.jpg" alt="Image Title" />
            </a>
            <div className="postcard__text t-dark">
              <h1 className="postcard__title red">Terme</h1>
              <div className="postcard__subtitle small">
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
              <ul className="list-group mb-3">
                {spas.map((spa) => (
                  <li className="list-group-item" key={spa?.spa?.value || 'unknown'}>
                    {spa?.spa?.value.split('#')[1] || 'N/A'}
                  </li>
                ))}
          </ul>
              </div>
            </div>
          </article>
        </div>
      </section>
      )}

    </div>
  );
};

export default CityActivitiesList;
