import { Locator } from "@playwright/test";
import { Page } from "playwright";

import { BUTTON_ROLE, EMAIL_TEST_ID, LINK_ROLE } from "src/utils/constants";

const DELETE_USER: string = "Delete user";

export class DeleteUserPage {
    readonly page: Page;
    readonly deleteUserPage: Locator;
    readonly selectEmailTextField: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deleteUserPage = this.page.getByRole(LINK_ROLE, { name: DELETE_USER });
        this.selectEmailTextField = this.page.getByTestId(EMAIL_TEST_ID);
        this.deleteButton = this.page.getByRole(BUTTON_ROLE, { name: DELETE_USER });
    }
    public async navigateToDeleteUserPage() {
        await this.deleteUserPage.click();
    }
    public async enterUserEmail(email: string) {
        await this.selectEmailTextField.click();
        await this.selectEmailTextField.fill(email);
    }

    public async clickDeleteUserButton() {
        await this.deleteButton.click();
    }
}
