import * as nodeFetch from 'node-fetch';

// Define the expected response structure
interface LoginResponse {
  token: string;
}

export const getLoginToken = async (page: any): Promise<string> => {
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
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data = (await response.json()) as LoginResponse;
  return data.token;
};