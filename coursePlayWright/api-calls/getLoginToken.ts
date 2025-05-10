import { Page } from '@playwright/test';
import { IUserAdminUserData } from '../data/userLoginData';


interface LoginResponse {
  token: string;
}

export const getLoginToken = async (page: Page, {username, password}: IUserAdminUserData): Promise<string> => {
  const response = await fetch('http://localhost:2221/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data = (await response.json()) as LoginResponse;
  return data.token;
};