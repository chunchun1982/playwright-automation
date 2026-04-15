"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('API test', async () => {
    const apiContext = await test_1.request.newContext({
    //ignoreHTTPSErrors: true,
    });
    const response = await apiContext.get('https://hxnetuat.jindalx.com/HXNEWTHEME/Home/GetActionCodeDueDateList');
    console.log(await response.text());
    await apiContext.dispose();
});
//# sourceMappingURL=ApiTest.spec.js.map