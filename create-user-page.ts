import { Locator } from "@playwright/test";
import { Page } from "playwright";

import { BUTTON_ROLE, EMAIL_TEST_ID, ENTER, LINK_ROLE } from "src/utils/constants";

const CREATE_USER: string = "Create user";
const INPUT_SELECTOR: string = "#react-select-2-input";

export class CreateUserPage {
    readonly page: Page;
    readonly createUserPage: Locator;
    readonly selectEmailTextField: Locator;
    readonly selectBusinessUnitKeyField: Locator;
    readonly createUserButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createUserPage = this.page.getByRole(LINK_ROLE, { name: CREATE_USER });
        this.selectEmailTextField = this.page.getByTestId(EMAIL_TEST_ID);
        this.selectBusinessUnitKeyField = this.page.locator(INPUT_SELECTOR);
        this.createUserButton = this.page.getByRole(BUTTON_ROLE, { name: CREATE_USER });
    }

    public async navigateToCreateUserPage() {
        await this.createUserPage.click();
    }

    public async enterUserEmail(email: string) {
        await this.selectEmailTextField.click();
        await this.selectEmailTextField.fill(email);
        await this.selectEmailTextField.press(ENTER);
    }

    public async enterBusinessUnitKey(businessUnitKey: string) {
        await this.selectBusinessUnitKeyField.fill(businessUnitKey);
        await this.selectBusinessUnitKeyField.press(ENTER);
    }
    public async clickCreateUserButton() {
        await this.createUserButton.click();
    }
}
