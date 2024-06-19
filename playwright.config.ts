import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
const testRailOptions = {
    embedAnnotationsAsProperties: true,
    outputFile: "./test-results/junit-report.xml",
};
export default defineConfig({
    testDir: "src/tests",
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 3 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ["html", { outputFolder: "./.wholesale-order-intake-e2e-tests/playwright-report" }],
        ["junit", testRailOptions],
    ],
    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"], headless: true },
        },

        /*{
            name: "firefox",
            use: { ...devices["Desktop Firefox"], headless: true },
        },*/

        /*{
            name: "webkit",
            use: { ...devices["Desktop Safari"], headless: true },
        },*/
    ],
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: "https://wholesale-storefront-fr.ecom.snoozestage.com/login/",

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },
});
