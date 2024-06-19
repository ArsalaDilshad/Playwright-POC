import { BrowserContext, Page, expect, test } from "@playwright/test";
import { LoginPage } from "src/pages/login-page";
import { STAGE_LOGIN_URL, USER_NAME, USER_PASSWORD } from "src/utils/constants";

let page: Page;
let context: BrowserContext;

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
});
test("valid_login", async () => {
    const login = new LoginPage(page);
    await login.navigateTo();
    await login.enterUserName(USER_NAME);
    await login.enterUserPassword(USER_PASSWORD);
    await login.clickLoginButton();
    await expect(page).not.toHaveURL(STAGE_LOGIN_URL);
    page.close();
});

test("invalid_login", async () => {
    const login = new LoginPage(page);
    await login.navigateTo();
    await login.changeLanguage();
    await login.enterUserName("random.email@hotmail.com");
    await login.enterUserPassword("wrong_password");
    await login.clickLoginButton();
    await expect(page.getByText("Please validate your credentials", { exact: true })).toBeVisible();
    page.close();
});

test.afterEach(async () => {
    page.close();
});
