import { test, expect } from '@playwright/test';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

test('Get users', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);
  expect(body.length).toBeGreaterThan(0);
  
  const nameExists = body.some((user: User) => user.name === 'Leanne Graham');
  const usernamenameExists = body.some((user: User) => user.username === 'Bret');

   expect(nameExists).toBe(true);
   expect(usernamenameExists).toBe(true);

  
});