import{test,expect} from '@playwright/test';
test('verify title and take screen shot', async({page})=>{

await page.goto("https://opensource-demo.orangehrmlive.com")
await expect(page).toHaveTitle('/Example/');
await page.screenshot({path:'homepage.png'});
//test cases creation  for login page
await page.locator('button : has-text("login"), button:has-text("Sign In")');
//Click a button whose text changes dynamically (e.g., “Login”, “Sign In”).
await page.getByRole('button',{name:/login|sign in/i}).click();
//Run same test with multiple user data.
const users=[

{username:'user1', password:'pass1'},
{username:'user2',password:'pass2'}

];

for(const user of users )

    {
       test('Login test for ${user.username}',async({page})=>{
           await page.goto("https://opensource-demo.orangehrmlive.com")
           await page.fill('#username', user.username)
           await page.fill('#password', user.password);
           await page.click('#login');

       })
    }
















});
