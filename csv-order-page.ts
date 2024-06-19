import { format } from "date-fns";
import path from "path";
import { Page } from "playwright";
import * as fs from "fs";

import { CREATE_CSV_ORDER_TEST_ID, CREATE_ORDER_CSV_TEST_ID, DATE_FORMAT, FIXTURES_PATH, UNDERSCORE_SYMBOL } from "src/utils/constants";
import { generateRandomString, removeFile, updateAndCreateFile } from "src/utils/csv-utils";
import { Locator } from "@playwright/test";

export class CsvOrderPage {
    readonly page: Page;
    readonly csvOrderPage: Locator;
    readonly dropFileField: Locator;
    readonly csvOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.csvOrderPage = this.page.getByTestId(CREATE_ORDER_CSV_TEST_ID);
        this.dropFileField = this.page.getByText("Drop your order here");
        this.csvOrderButton = this.page.getByTestId(CREATE_CSV_ORDER_TEST_ID);
    }
    public async navigateToCSVOrderPage() {
        await this.csvOrderPage.click();
    }

    public async chooseFile(fileName: string) {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const updates = {
            external_order_id: generateRandomString(),
            order_group_id: generateRandomString(),
            delivery_date: format(date, DATE_FORMAT),
        };
        const newFileName = generateRandomString().concat(UNDERSCORE_SYMBOL).concat(fileName);
        await updateAndCreateFile(FIXTURES_PATH, fileName, newFileName, updates);
        const fileContentBuffer = fs.readFileSync(path.join(FIXTURES_PATH, newFileName));
        await this.dropFileField.setInputFiles({
            name: newFileName,
            mimeType: "text/csv",
            buffer: fileContentBuffer,
        });
        await removeFile(FIXTURES_PATH, newFileName);
    }
    public async clickCreateCSVOrder() {
        await this.csvOrderButton.click();
    }
}
