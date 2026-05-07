import { test, expect } from '@playwright/test';

test('Get users', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.length).toBeGreaterThan(0);
});