import fetch from 'isomorphic-fetch';

export const graphql = async (query, jwt = '') => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (jwt.length > 0) {
    headers.Authorization = `bearer ${jwt}`;
  }

  const response = await fetch('https://graphql-york.now.sh/', {
    method: 'POST',
    headers,
    body: JSON.stringify(query),
  });

  return JSON.parse(await response.text());
};

export const changeInput = (setInput, value) => setInput(value);
