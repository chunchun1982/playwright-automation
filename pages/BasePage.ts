import { Page,expect} from "@playwright/test";
export class BasePage
{
  readonly page:Page;
  constructor(page:Page)
  {
     this.page=page;
    
  }

  async waitForUrlContains(urlPart: string) {
    await expect(this.page).toHaveURL(new RegExp(urlPart));
  }

  async clickByRole(role: any, name: string) {
    await this.page.getByRole(role, { name }).click();
  }


}