import * as nodeFetch from 'node-fetch';

export const getLoginToken = async (page) => {
  const response = await nodeFetch.default('http://localhost:2221/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'Admin123',
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.token;
}