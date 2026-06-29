const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://auctionit-new-testing.intellicomcenters.com/Account/Login', { waitUntil: 'domcontentloaded' });
  try { await page.getByText('Close').click({ timeout: 10000 }); } catch {}
  await page.getByRole('link', { name: 'Bidder Login' }).click();
  await page.locator('#UserName').fill('Vijayadmin');
  await page.locator('#Password').fill('Welcome@123');
  await page.locator('input[type=submit]').click();
  await page.waitForURL(/Auction/, { timeout: 60000 });
  await page.getByRole('link', { name: 'Auction Management' }).hover();
  await page.getByRole('link', { name: 'Auction Creation' }).hover();
  await page.getByRole('link', { name: 'New' }).click();
  await page.waitForTimeout(4000);

  console.log('Page URL:', page.url());
  const inputs = await page.locator('input').evaluateAll((els) => els.map((el) => ({
    id: el.id,
    name: el.name,
    type: el.type,
    placeholder: el.placeholder,
    ariaLabel: el.getAttribute('aria-label'),
    className: el.className,
    value: el.value,
    readonly: el.readOnly,
    disabled: el.disabled,
  })));
  console.log(JSON.stringify(inputs.filter((x) => x.id || x.name || x.placeholder || x.ariaLabel || x.className), null, 2));

  await browser.close();
})();
