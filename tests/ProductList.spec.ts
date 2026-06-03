import{test, expect} from '@playwright/test';

test('get all products API', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/productsList'); 
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
  expect(body).toHaveProperty('products');
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
});

test('To get all brand ', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/brandsList'); 
  expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    expect(body).toHaveProperty('brands');
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);
});

//to POST to Search product
test('Search product API', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/searchProduct?search_product &=top', {
    data: {
      search_product: 'top'
    }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
  expect(body).toHaveProperty('products');
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
});
