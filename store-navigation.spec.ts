import { BrowserContext, Page, expect, test } from "@playwright/test";
import { LoginPage } from "src/pages/login-page";

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
});
test("navigation_emma_store", async () => {
    const login = new LoginPage(page);
    await login.navigateTo();
    await login.changeLanguage();
    login.clickVisitEmmaStoreURL();
    const page1 = await page.waitForEvent("popup");
    await expect(page1).toHaveURL("https://www.emma.fr/");
    page1.close();
    page.close();
});
