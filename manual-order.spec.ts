import { BrowserContext, Page, expect, test } from "@playwright/test";
import { LoginPage } from "src/pages/login-page";
import { ManualOrderPage } from "src/pages/manual-order-page";
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
});
interface Order {
    externalOrderId: string;
}

test("language_selection", async () => {
    await expect(page.getByText("Créer une commande manuelle", { exact: true })).toBeVisible();
});

test("order_submission", async () => {
    const login = new LoginPage(page);
    await login.changeLanguage();
    const createManualOrderPage = new ManualOrderPage(page);
    await createManualOrderPage.enterOrderNumber("TEST_ORDER_AUTOMATIONS");
    await createManualOrderPage.productSelection();
    await createManualOrderPage.enterProductQuantity();
    await createManualOrderPage.enterCompanyName();
    await createManualOrderPage.enterFirstName();
    await createManualOrderPage.enterLastName();
    await createManualOrderPage.enterStreetName();
    await createManualOrderPage.enterCityName();
    await createManualOrderPage.enterPostalCode();
    await createManualOrderPage.enterPhoneNumber();
    await createManualOrderPage.enterEmailAddress();
    await createManualOrderPage.clickCreateOrderButton();
    await createManualOrderPage.clickCreateSubmitButton();
    const responsePromise = page.waitForResponse("**/api/v2/customers/BU-GFHCX/orders");
    const response = await responsePromise;
    const responseBody = await response.json();
    response.ok();
    const responseBodyString = JSON.stringify(responseBody);
    const order: Order = JSON.parse(responseBodyString);
    const externalOrderId = order.externalOrderId;
    expect(externalOrderId).toContain("TEST_ORDER_AUTOMATIONS");
});

test.afterEach(async () => {
    page.close();
});
