import { test, expect } from "@playwright/test";
import { HeaderPage } from "../pages/header.page";
import { LoginPage } from "../pages/login.page";
import { CommsPage } from "../pages/communications.page";
import { randomUUID } from "crypto";
import { getDrivers } from "../helpers/xml-properties.helpers";

// const API_URL = `${process.env.BASE_URL}/api`;
const username = process.env.TEST_USERNAME!;
const password = process.env.TEST_PASSWORD!;
// const drivers = [
//     {
//         driverName: "IEC61850",
//         instanceName: "IEC61850TestInstance",
//         connectionName: "TestConnectionIEC61850",
//     },
//     {
//         driverName: "MODBUS",
//         instanceName: "ModbusTestInstance",
//         connectionName: "TestConnectionModbus",
//     },
//     {
//         driverName: "MSSQL",
//         instanceName: "MssqlTestInstance",
//         connectionName: "TestConnectionMssql",
//         host: "192.168.1.174",
//         port: 1433,
//         authentication: "SQL Server Authentication",
//         username: "sa",
//         password: "Admin@123",
//         dbInstanceName: "ZENON_2019",
//         databaseName: "TestData_V1",
//     },
//     {
//         driverName: "MYSQL",
//         instanceName: "MysqlTestInstance",
//         connectionName: "TestConnectionMysql",
//     },
//     {
//         driverName: "OPC_UA",
//         instanceName: "OpcuaTestInstance",
//         connectionName: "TestConnectionOpcua",
//     },
//     {
//         driverName: "POSTGRES",
//         instanceName: "PostgresTestInstance",
//         connectionName: "TestConnectionPostgres",
//     },
// ];

let commsPage: CommsPage;

test.describe("Instance Management", () => {
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

        // const tokenResponse = await request.post(
        //     // "http://192.168.1.99:8080/api/token/generate",
        //     `${API_URL}/token/generate`,
        //     {
        //         data: {
        //             username: username,
        //             password: password,
        //             provider: "local",
        //         },
        //     },
        // );

        // if (!tokenResponse.ok()) {
        //     const responseBody = await tokenResponse.text();

        //     throw new Error(
        //         `Token API failed: ${tokenResponse.status()} ${responseBody}`,
        //     );
        // }

        // const tokenData = await tokenResponse.json();
        // const token = tokenData.access_Token;
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

        // await commsPage.createInstance(
        //     drivers[1].driverName,
        //     drivers[1].instanceName,
        //     drivers[1].connectionName,
        //     true
        // );

        // await commsPage.waitForDuplicateInstanceNameAlert();
    });

    // await page.getByRole("button", { name: "+ Add Instance" }).click();
    // await page
    //     .getByRole("textbox", { name: "Column Instance Name" })
    //     .fill("Test_Instance");
    // await page.getByRole("link", { name: "Save" }).click();
    // // await page.getByRole("gridcell", { name: "Test_Instance" }).click();
    // // await page.getByRole('link', { name: 'Save' }).click();
    // await page
    //     .getByRole("row", { name: "Connection Name *" })
    //     .getByRole("textbox")
    //     .click();
    // await page
    //     .getByRole("row", { name: "Connection Name *" })
    //     .getByRole("textbox")
    //     .fill("TestConnection");
    // await page.getByRole("button", { name: "Save" }).click();
    // await page.getByText("Instance", { exact: true }).click();
    // await page
    //     .getByRole("row", { name: "Select row Test_Instance" })
    //     .getByLabel("Select row")
    //     .click();
    // await page
    //     .getByTitle("Edit selected instance")
    //     .getByRole("button")
    //     .click();
    // await page
    //     .getByRole("textbox", { name: "Column Instance Name" })
    //     .fill("Test_InstanceToBeDeleted");
    // await page.getByRole("link", { name: "Save" }).click();
    // await page
    //     .getByRole("row", { name: "Select row Test_InstanceToBeDeleted" })
    //     .getByLabel("Select row")
    //     .click();
    // await page
    //     .getByTitle("Delete selected instance")
    //     .getByRole("button")
    //     .click();
    // await page.getByRole("heading", { name: "Delete Instance" }).click();
    // await page
    //     .getByRole("dialog")
    //     .getByText("Test_InstanceToBeDeleted")
    //     .click();
    // await page.getByRole("button", { name: "Delete" }).click();

    // test("check duplicate instance", async () => {
    //     await commsPage.waitForDuplicateInstanceNameAlert();
    // });

    // test("deleting instance", async ({ page }) => {
    //   // await page.getByRole("gridcell", { name: "MODBUS" }).click();
    //   await page.getByRole("gridcell", { name: "Test_Instance" }).dblclick();
    //   await page.getByRole("link", { name: "Cancel" }).click();
    //   await page.getByText("Instance", { exact: true }).click();
    //   await page.getByRole("gridcell", { name: "Test_Instance" }).dblclick();
    //   await page
    //     .getByRole("link", { description: "Delete", exact: true })
    //     .click();
    //   await page.getByRole("button", { name: "Delete" }).click();
    //   await page.getByRole("button", { name: "user" }).click();
    //   await page.getByText("Logout").click();
    // });
});
