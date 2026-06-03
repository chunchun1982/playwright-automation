import { test, expect } from '@playwright/test';

test('POST API - Working Example', async ({ request }) => {
  const response = await request.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      data: {
        title: 'Playwright',
        body: 'API Testing',
        userId: 1
      }
    }
  );

  console.log(await response.json());

  expect(response.status()).toBe(201);
});
// to write the test cases for get user details API
test('verify user account API', async({request})=>{
    const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail?email=Gaurav.singhal@jindalx.com');
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    expect(body).toHaveProperty('user');
    expect(body.user).toHaveProperty('id');
    expect(body.user).toHaveProperty('name');
    expect(body.user).toHaveProperty('email');
});
//to wrrite the test to get all products
test('get all products API', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/productsList'); 
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
  expect(body).toHaveProperty('products');
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
});