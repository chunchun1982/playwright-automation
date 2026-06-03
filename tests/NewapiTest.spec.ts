import { test, expect } from '@playwright/test';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

test('Get users', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/productsList');

  expect(response.status()).toBe(200);

  const body = await response.json();
 // console.log(body);
  //expect(body.length).toBeGreaterThan(1);
  
  //const nameExists = body.some((user: User) => user.name === 'Leanne Graham');
  //const usernamenameExists = body.some((user: User) => user.username === 'Bret');

  // expect(nameExists).toBe(true);
  // expect(usernamenameExists).toBe(true);
  const products = Array.isArray(body) ? body : body.products;

  const babyhugDetails = products.filter((item: any) => item.brand === 'Babyhug');

  console.log('Babyhug details:', babyhugDetails);
  expect(babyhugDetails.length).toBeGreaterThan(0);

  
});