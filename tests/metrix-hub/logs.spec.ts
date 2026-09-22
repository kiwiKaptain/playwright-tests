import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HeaderPage } from "../pages/header.page";
import { LogsPage } from "../pages/logs.page";

test.describe("Driver / Audit Error Logs", () => {
    const username = process.env.TEST_USERNAME!;
    const password = process.env.TEST_PASSWORD!;

    test.beforeEach("Open Metrix Hub", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(username, password);
    });

    test.afterEach("Logout from Metrix Hub", async ({ page }) => {
        const headerPage = new HeaderPage(page);

        await headerPage.logout();
    });
    
    test("monitoring", async ({ page }) => {
        const monitoringPage = new LogsPage(page);

        await monitoringPage.gotoMonitoring();
    });

    test("driver error logs", async ({ page }) => {
        const driverErrorLogsPage = new LogsPage(page);

        await driverErrorLogsPage.gotoDriverErrorLogs();
        await driverErrorLogsPage.selectDate(
            "2020 - 2029",
            "2026",
            "July",
            "13",
        );
        await driverErrorLogsPage.filterByTimestamp("");
        await driverErrorLogsPage.filterByConnectionName("Opc");
        await driverErrorLogsPage.filterByConnectionName("");
        await driverErrorLogsPage.filterByError("subscription");
        await driverErrorLogsPage.filterByError("");
        await driverErrorLogsPage.filterByDetails("failed");
        await driverErrorLogsPage.filterByDetails("");
    });

    test("audit logs", async ({ page }) => {
        const auditLogsPage = new LogsPage(page);

        await auditLogsPage.gotoAuditLogs();
        await auditLogsPage.selectDate("2020 - 2029", "2026", "July", "13");
        await auditLogsPage.filterByTimestamp("");
        await auditLogsPage.filterByAction("created");
        await auditLogsPage.filterByAction("");
        await auditLogsPage.filterByActionTaken("admin");
        await auditLogsPage.filterByActionTaken("");
        await auditLogsPage.filterByDetails("updated");
        await auditLogsPage.filterByDetails("");
    });
});
