import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HeaderPage } from "../pages/header.page";
import { AuditLogsPage } from "../pages/audit-logs.page";

test.describe("Driver / Audit Error Logs", () => {
    // const username = process.env.TEST_USERNAME!;
    // const password = process.env.TEST_PASSWORD!;

    test.beforeEach("Open Metrix Hub", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        // await loginPage.login(username, password);
    });

    test.afterEach("Logout from Metrix Hub", async ({ page }) => {
        const headerPage = new HeaderPage(page);

        await headerPage.logout();
    });

    test("monitoring", async ({ page }) => {
        await page.getByText("Monitoring").click();
    });

    test("driver error logs", async ({ page }) => {
        await page.getByText("Driver Error Logs").click();
        await page.getByRole("button", { name: "Select", exact: true }).click();
        await page
            .getByRole("button", { name: "August 2026. Month selection" })
            .click();
        await page.getByRole("button", { name: "Year selection" }).click();
        await page
            .getByRole("button", { name: "-2029. Decade selection" })
            .click();
        await page.getByText("- 2029").click();
        await page.getByText("2026", { exact: true }).click();
        await page.getByLabel("July 2026").getByText("Jul").click();
        await page
            .getByLabel("Saturday, July 18,")
            .getByText("18", { exact: true })
            .click();
        await page
            .getByRole("combobox", { name: "Filter cell" })
            .press("ControlOrMeta+a");
        await page.getByRole("combobox", { name: "Filter cell" }).fill("");
        await page
            .getByRole("combobox", { name: "Filter cell" })
            .press("ControlOrMeta+a");
        await page.getByRole("combobox", { name: "Filter cell" }).fill("");
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Connection Name",
            })
            .click();
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Connection Name",
            })
            .fill("Opc");
        // await page.getByRole("button", { name: "Page 33" }).click();
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Connection Name",
            })
            .click();
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Connection Name",
            })
            .press("ControlOrMeta+a");
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Connection Name",
            })
            .fill("");
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Error",
            })
            .click();
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Error",
            })
            .fill("sync");
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Error",
            })
            .press("ControlOrMeta+a");
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Error",
            })
            .fill("");
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Details",
            })
            .click();
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Details",
            })
            .fill("failed");
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Details",
            })
            .press("ControlOrMeta+a");
        await page
            .getByRole("textbox", {
                name: "Filter cell",
                description: "Column Details",
            })
            .fill("");
    });

    test("audit logs", async ({ page }) => {
        // await page.getByText("Audit Logs").click();
        // await page.getByRole("button", { name: "Select", exact: true }).click();
        // await page
        //     .getByRole("button", { name: "August 2026. Month selection" })
        //     .click();
        // await page.getByRole("button", { name: "Year selection" }).click();
        // await page
        //     .getByRole("button", { name: "-2029. Decade selection" })
        //     .click();
        // await page.getByText("- 2029").click();
        // await page.getByText("2026", { exact: true }).click();
        // await page.getByLabel("July 2026").getByText("Jul").click();
        // await page
        //     .getByLabel("Saturday, July 18,")
        //     .getByText("18", { exact: true })
        //     .click();
        // await page
        //     .getByRole("combobox", { name: "Filter cell" })
        //     .press("ControlOrMeta+a");
        // await page.getByRole("combobox", { name: "Filter cell" }).fill("");
        // await page
        //     .getByRole("textbox", {
        //         name: "Filter cell",
        //         description: "Column Action",
        //         exact: true,
        //     })
        //     .click();
        // await page
        //     .getByRole("textbox", {
        //         name: "Filter cell",
        //         description: "Column Action",
        //         exact: true,
        //     })
        //     .fill("created");
        // await page
        //     .getByRole("textbox", {
        //         name: "Filter cell",
        //         description: "Column Action",
        //         exact: true,
        //     })
        //     .press("ControlOrMeta+a");
        // await page
        //     .getByRole("textbox", {
        //         name: "Filter cell",
        //         description: "Column Action",
        //         exact: true,
        //     })
        //     .fill("");
        // await page
        //     .getByRole("textbox", {
        //         name: "Filter cell",
        //         description: "Column Details",
        //     })
        //     .click();
        // await page
        //     .getByRole("textbox", {
        //         name: "Filter cell",
        //         description: "Column Details",
        //     })
        //     .fill("updated");
        // await page
        //     .getByRole("textbox", {
        //         name: "Filter cell",
        //         description: "Column Details",
        //     })
        //     .press("ControlOrMeta+a");
        // await page
        //     .getByRole("textbox", {
        //         name: "Filter cell",
        //         description: "Column Details",
        //     })
        //     .fill("");
        // await page.getByRole('combobox', { name: 'Filter cell' }).click();
        // await page.getByRole('combobox', { name: 'Filter cell' }).press('ControlOrMeta+a');
        // await page.getByRole('combobox', { name: 'Filter cell' }).fill('');
        // await page.getByRole('textbox', { name: 'Filter cell', description: 'Column Action', exact: true }).click();
        // await page.getByRole('textbox', { name: 'Filter cell', description: 'Column Action', exact: true }).fill('created');
        // await page.getByRole('textbox', { name: 'Filter cell', description: 'Column Action', exact: true }).press('ControlOrMeta+a');
        // await page.getByRole('textbox', { name: 'Filter cell', description: 'Column Action', exact: true }).fill('');

        const auditLogsPage = new AuditLogsPage(page);

        await auditLogsPage.gotoAudit();
        await auditLogsPage.selectDate("2020 - 2029", "2026", "July", "13");
        await auditLogsPage.filterByTimestamp("");
        await auditLogsPage.filterByAction("created");
        await auditLogsPage.filterByAction("");
        await auditLogsPage.filterByDetails("updated");
        await auditLogsPage.filterByDetails("");
    });
});
