// src/components/Gastronomia.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../api';

const Gastronomia = () => {
  const [gastronomyItems, setGastronomyItems] = useState([]);

  useEffect(() => {
    const getGastronomyItems = async () => {
      const query = `
        PREFIX ex: <http://example.org/>
        SELECT ?item ?type WHERE {
          ?item a ex:GastronomyItem .
          ?item ex:type ?type .
        }
      `;
      const data = await fetchQuery(query);
      setGastronomyItems(data.results.bindings);
    };
    getGastronomyItems();
  }, []);

  return (
    <div>
      <h2>Gastronomia Giapponese</h2>
      <ul>
        {gastronomyItems.map((item, index) => (
          <li key={index}>
            {item.item.value} - {item.type.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gastronomia;
