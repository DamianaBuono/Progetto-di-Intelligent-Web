// src/components/Storia.js
import React, { useEffect, useState } from 'react';
import { fetchQuery } from '../api';

const Storia = () => {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    const getHistoryItems = async () => {
      const query = `
        PREFIX ex: <http://example.org/>
        SELECT ?item ?period WHERE {
          ?item a ex:HistoryItem .
          ?item ex:period ?period .
        }
      `;
      const data = await fetchQuery(query);
      setHistoryItems(data.results.bindings);
    };
    getHistoryItems();
  }, []);

  return (
    <div>
      <h2>Storia del Giappone</h2>
      <ul>
        {historyItems.map((item, index) => (
          <li key={index}>
            {item.item.value} - {item.period.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Storia;
