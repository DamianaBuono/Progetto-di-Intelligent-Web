// src/components/Cultura.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../api';

const Cultura = () => {
  const [cultureItems, setCultureItems] = useState([]);

  useEffect(() => {
    const getCultureItems = async () => {
      const query = `
        PREFIX ex: <http://example.org/>
        SELECT ?item ?category WHERE {
          ?item a ex:CulturalItem .
          ?item ex:category ?category .
        }
      `;
      const data = await fetchQuery(query);
      setCultureItems(data.results.bindings);
    };
    getCultureItems();
  }, []);

  return (
    <div>
      <h2>Cultura Giapponese</h2>
      <ul>
        {cultureItems.map((item, index) => (
          <li key={index}>
            {item.item.value} - {item.category.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cultura;
