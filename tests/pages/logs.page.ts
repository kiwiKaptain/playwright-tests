import { Page } from "@playwright/test";
import { logsLocators } from "../locators/logs.locators";

export class LogsPage {
    constructor(private page: Page) {}

    async waitForTableReload() {
        const loading = logsLocators.loadingAlert(this.page);
        await loading.waitFor({ state: "hidden" });
    }

    async gotoMonitoring() {
        await logsLocators.monitoringTab(this.page).click();
    }

    async gotoAuditLogs() {
        await logsLocators.auditLogsTab(this.page).click();
    }

    async gotoDriverErrorLogs() {
        await logsLocators.driverErrorLogsTab(this.page).click();
    }

    async filterByTimestamp(filter: string) {
        await logsLocators.dateColumn(this.page).fill(filter);
        await this.page.waitForTimeout(1500);
    }

    async selectDate(decade: string, year: string, month: string, day: string) {
        await logsLocators.dateSelectButton(this.page).click();
        await logsLocators.monthSelectButton(this.page).click();
        await logsLocators.yearSelectButton(this.page).click();
        await logsLocators.decadeSelectButton(this.page).click();

        await logsLocators.setDecade(this.page, decade).click();
        await logsLocators.setYear(this.page, year).click();
        await logsLocators.setMonth(this.page, month, year).click();
        await logsLocators.setDay(this.page, month, day).click();
    }

    async filterByAction(action: string) {
        await logsLocators.actionColumn(this.page).fill(action);
        await this.page.waitForTimeout(1500);
    }

    async filterByActionTaken(action: string) {
        await logsLocators.actionTakenByColumn(this.page).fill(action);
        await this.page.waitForTimeout(1500);
    }

    async filterByConnectionName(action: string) {
        await logsLocators.connectionNameColumn(this.page).fill(action);
        await this.page.waitForTimeout(1500);
    }

    async filterByError(action: string) {
        await logsLocators.errorColumn(this.page).fill(action);
        await this.page.waitForTimeout(1500);
    }

    async filterByDetails(details: string) {
        await logsLocators.detailsColumn(this.page).fill(details);
        await this.page.waitForTimeout(1500);
    }
}
