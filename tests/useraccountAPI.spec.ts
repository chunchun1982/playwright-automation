import{test,expect} from '@playwright/test';
// to write the test cases for user account API
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
//To write the test cases for PUT Method to update user details
test('update user details API', async ({ request }) => {
  const response = await request.put('https://automationexercise.com/api/updateAccount', {
    form: {
      name: 'Anuj Singhal',
      email: 'Anuj.singhal@jindalx.com',
      password: 'newpassword123',
      title: 'Mr',
      birth_date: '15',
      birth_month: '05',
      birth_year: '1990',
      firstname: 'Anuj',
      lastname: 'Singhal',
      company: 'JindalX',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      country: 'USA',
      zipcode: '12345',
      state: 'CA',
      city: 'Los Angeles',
      mobile_number: '5551234567'
    }
  });
  

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(200);
  expect(body.message).toContain('User updated');
});
//post to create a new user account
test('create new user account API', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: 'gaurav Singhal',
      email: 'gaurav@example.com',
      password: 'password123',
      title: 'Mr',
      birth_date: '15',
      birth_month: '05',
      birth_year: '1990',
      firstname: 'gaurav',
      lastname: 'Singhal',
      company: 'JindalX',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      country: 'USA',
      zipcode: '12345',
      state: 'CA',
      city: 'Los Angeles',
      mobile_number: '5551234567'
    }
  });
  

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(200);
  expect(body.message).toContain('User created');
}); 