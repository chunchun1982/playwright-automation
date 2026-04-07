import { test, expect, request as playwrightRequest } from '@playwright/test';

test('API test', async () => {
  const apiContext = await playwrightRequest.newContext({
    //ignoreHTTPSErrors: true,
  });

  const response = await apiContext.get('https://hxnetuat.jindalx.com/HXNEWTHEME/Home/GetActionCodeDueDateList');

  console.log(await response.text());

  await apiContext.dispose();
});


