import { Locator } from "@playwright/test";
import { Page } from "playwright";

import { BUTTON_ROLE, EMAIL_TEST_ID, ENTER, PASSWORD_TEST_ID, STAGE_LOGIN_URL, STORE_TEST_ID } from "src/utils/constants";

export class LoginPage {
    readonly page: Page;
    readonly selectLanguageDropDown: Locator;
    readonly selectEnglishLanguage: Locator;
    readonly selectEmailTextField: Locator;
    readonly selectPasswordTextField: Locator;
    readonly selectStore: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectLanguageDropDown = this.page.locator(BUTTON_ROLE).filter({ hasText: "Français" });
        this.selectEnglishLanguage = this.page.getByText("English");
        this.selectEmailTextField = this.page.getByTestId(EMAIL_TEST_ID);
        this.selectPasswordTextField = this.page.getByTestId(PASSWORD_TEST_ID);
        this.selectStore = this.page.getByTestId(STORE_TEST_ID);
    }

    public async navigateTo() {
        await this.page.goto(STAGE_LOGIN_URL);
    }

    public async changeLanguage() {
        await this.selectLanguageDropDown.click();
        await this.selectEnglishLanguage.click();
    }

    public async enterUserName(name: string) {
        await this.selectEmailTextField.click();
        await this.selectEmailTextField.fill(name);
    }

    public async enterUserPassword(password: string) {
        await this.selectPasswordTextField.click();
        await this.selectPasswordTextField.fill(password);
    }

    public async clickLoginButton() {
        await this.selectPasswordTextField.press(ENTER);
    }

    public async clickVisitEmmaStoreURL() {
        await this.selectStore.click();
    }
}
