
// src/api.js
export const fetchQuery = async (query) => {
  const endpoint = 'http://localhost:3030/giappone/sparql';
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/sparql-query',
      'Accept': 'application/json',
    },
    body: query,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};
