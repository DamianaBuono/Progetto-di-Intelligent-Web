// src/components/Posti.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../../api';

const Posti = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getPlaces = async () => {
      const query = `
        PREFIX ex: <http://example.org/>
        SELECT ?place ?category WHERE {
          ?place a ex:Place .
          ?place ex:category ?category .
        }
      `;
      const data = await fetchQuery(query);
      setPlaces(data.results.bindings);
    };
    getPlaces();
  }, []);

  return (
    <div>
      <h2>Posti da Visitare</h2>
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            {place.place.value} - {place.category.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posti;
