import { Locator } from "@playwright/test";
import { Page } from "playwright";

import { ORDER_NUMBER_TEST_ID } from "src/utils/constants";

export class ManualOrderPage {
    readonly page: Page;
    readonly selectOrderNumberField: Locator;
    readonly selectCompanyName: Locator;
    readonly selectFirstName: Locator;
    readonly selectLastName: Locator;
    readonly selectStreetName: Locator;
    readonly selectCityName: Locator;
    readonly selectPostalCode: Locator;
    readonly selectPhone: Locator;
    readonly selectEmailAddress: Locator;
    readonly selectOrderPreviewButton: Locator;
    readonly selectProductField: Locator;
    readonly selectProduct: Locator;
    readonly selectQuantity: Locator;
    readonly selectSubmitOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectOrderNumberField = this.page.getByTestId(ORDER_NUMBER_TEST_ID);
        this.selectProductField = this.page.getByTestId("product-selection").locator("svg");
        this.selectProduct = this.page.getByText("Emma Smile Work Nap Pillow 42x42cm Dark Blue", { exact: true });
        this.selectCompanyName = this.page.getByLabel("Company name");
        this.selectFirstName = this.page.getByLabel("First name");
        this.selectLastName = this.page.getByLabel("Last name");
        this.selectStreetName = this.page.getByLabel("Street");
        this.selectCityName = this.page.getByLabel("City", { exact: true });
        this.selectPostalCode = this.page.getByLabel("Postal code");
        this.selectPhone = this.page.getByLabel("Phone number");
        this.selectEmailAddress = this.page.getByLabel("Email");
        this.selectOrderPreviewButton = this.page.getByRole("button", { name: "Preview order" });
        this.selectQuantity = this.page.getByTestId("quantity-selector-input");
        this.selectSubmitOrder = this.page.getByTestId("submit-order-btn");
    }

    public async enterOrderNumber(orderNum: string) {
        await this.selectOrderNumberField.click();
        await this.selectOrderNumberField.fill(orderNum);
    }

    public async productSelection() {
        await this.selectProductField.click();
        await this.selectProduct.click();
    }
    public async enterProductQuantity() {
        await this.selectQuantity.fill("3");
    }

    public async enterCompanyName() {
        await this.selectCompanyName.click();
        await this.selectCompanyName.fill("OTTO");
    }
    public async enterFirstName() {
        await this.selectFirstName.fill("Henry");
    }
    public async enterLastName() {
        await this.selectLastName.fill("Paul");
    }
    public async enterStreetName() {
        await this.selectStreetName.fill("Nathan Road");
    }
    public async enterCityName() {
        await this.selectCityName.click();
        await this.selectCityName.fill("Sham Shui Po");
    }
    public async enterPostalCode() {
        await this.selectPostalCode.fill("405869");
    }
    public async enterPhoneNumber() {
        await this.selectPhone.fill("+852 3252 43455");
    }
    public async enterEmailAddress() {
        await this.selectEmailAddress.fill("test_user@ymail.com");
    }
    public async clickCreateOrderButton() {
        await this.selectOrderPreviewButton.click();
    }
    public async clickCreateSubmitButton() {
        await this.selectSubmitOrder.click();
    }
}
