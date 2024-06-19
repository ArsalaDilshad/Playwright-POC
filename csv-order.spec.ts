import { BrowserContext, Page, expect, test } from "@playwright/test";
import { CsvOrderPage } from "src/pages/csv-order-page";
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
test("order_csv_negative", async () => {
    const createCSVOrder = new CsvOrderPage(page);
    await createCSVOrder.navigateToCSVOrderPage();
    await createCSVOrder.chooseFile("invalid-csv-order-fixtures.csv");
    await createCSVOrder.clickCreateCSVOrder();
    await expect(page.getByText("Order failed", { exact: true })).toBeVisible();
});
test("order_csv_positive", async () => {
    const createCSVOrder = new CsvOrderPage(page);
    await createCSVOrder.navigateToCSVOrderPage();
    await createCSVOrder.chooseFile("valid-csv-order-fixtures.csv");
    await createCSVOrder.clickCreateCSVOrder();
    await expect(page.getByTestId("toaster-id")).toContainText("Order received");
});

test.afterEach(async () => {
    page.close();
});
