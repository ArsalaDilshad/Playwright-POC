import { BrowserContext, Page, expect, test } from "@playwright/test";
import { DeleteUserPage } from "src/pages/delete-user-page";
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
test("user_deletion_positive", async () => {
    const deleteUser = new DeleteUserPage(page);
    deleteUser.navigateToDeleteUserPage();
    deleteUser.enterUserEmail("test-user@hotmail.com");
    // Mock the api call
    await page.route("*/**/api/v1/users", async (route) => {
        await route.fulfill({
            status: 204,
        });
    });
    deleteUser.clickDeleteUserButton();
    await expect(page.getByText("User deleted", { exact: true })).toBeVisible();
});

test("user_deletion_negative", async () => {
    const deleteUser = new DeleteUserPage(page);
    deleteUser.navigateToDeleteUserPage();
    deleteUser.enterUserEmail("test-user@hotmail.com");
    // Mock the api call
    await page.route("*/**/api/v1/users", async (route) => {
        await route.fulfill({
            status: 404,
        });
    });
    deleteUser.clickDeleteUserButton();
    await expect(page.getByText("Failed to delete user", { exact: true })).toBeVisible();
});
test.afterEach(async () => {
    page.close();
});
