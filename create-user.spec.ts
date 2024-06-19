import { BrowserContext, Page, expect, test } from "@playwright/test";
import { CreateUserPage } from "src/pages/create-user-page";
import { LoginPage } from "src/pages/login-page";
import { USER_NAME, USER_PASSWORD } from "src/utils/constants";

let page: Page;
let context: BrowserContext;

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const login = new LoginPage(page);
    await login.navigateTo();
    await login.enterUserName(USER_NAME);
    await login.enterUserPassword(USER_PASSWORD);
    await login.clickLoginButton();
    await page.waitForNavigation();
    await login.changeLanguage();
});

test("user_creation_positive", async () => {
    const createUser = new CreateUserPage(page);
    createUser.navigateToCreateUserPage();
    createUser.enterUserEmail("test-user@hotmail.com");
    createUser.enterBusinessUnitKey("BU-PLOKJ");
    // Mock the api call
    await page.route("*/**/api/v1/users", async (route) => {
        await route.fulfill({
            status: 204,
        });
    });
    createUser.clickCreateUserButton();
    await expect(page.getByText("User created successfully", { exact: true })).toBeVisible();
});

test("user_creation_negative", async () => {
    const createUser = new CreateUserPage(page);
    createUser.navigateToCreateUserPage();
    createUser.enterUserEmail("test-user@hotmail.com");
    createUser.enterBusinessUnitKey("BU-PLOKJ");
    // Mock the api call
    await page.route("*/**/api/v1/users", async (route) => {
        await route.fulfill({
            status: 409,
        });
    });
    createUser.clickCreateUserButton();
    await expect(page.getByText("Failed to create user", { exact: true })).toBeVisible();
});

test.afterEach(async () => {
    page.close();
});
