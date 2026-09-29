import { test, expect } from "@playwright/test";
import { HeaderPage } from "../pages/header.page";
import { LoginPage } from "../pages/login.page";
import { CommsPage } from "../pages/communications.page";
import { randomUUID } from "crypto";
import { getDrivers } from "../helpers/xml-properties.helpers";

let commsPage: CommsPage;

test.describe("Instance Management", () => {
    const username = process.env.TEST_USERNAME!;
    const password = process.env.TEST_PASSWORD!;

    test.beforeEach("Open Metrix Hub", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(username, password);

        commsPage = new CommsPage(page);
    });

    test.afterEach("Logout from Metrix Hub", async ({ page }) => {
        const headerPage = new HeaderPage(page);

        await headerPage.logout();
    });

    test("create driver instance", async ({ page, request }) => {
        await commsPage.gotoComms();

        const testGuid = randomUUID().replace(/-/g, "").substring(0, 8);
        console.log(`Test GUID: ${testGuid}`);

        const token = await page.evaluate(() => {
            return localStorage.getItem("access_token");
        });

        if (!token) {
            throw new Error(
                "Bearer token was not returned by the authentication API",
            );
        }

        const drivers: string[] = await getDrivers(request, token);

        console.log("Drivers returned from API:", drivers);

        for (const driver of drivers) {
            console.log(`Creating instance for driver: ${driver}`);

            const instanceName = `${driver}TestInstance_${testGuid}`;
            const connectionName = `TestConnection${driver}_${testGuid}`;

            await commsPage.createInstance(
                driver,
                instanceName,
                connectionName,
            );
        }
    });
});
