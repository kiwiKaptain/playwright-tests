import { Page } from "@playwright/test";
import { auditLogsLocators } from "../locators/audit-logs.locators";

export class AuditLogsPage {
    constructor(private page: Page) {}

    async waitForTableReload() {
        const loading = auditLogsLocators.loadingAlert(this.page);
        await loading.waitFor({ state: "hidden" });
    }

    async gotoAudit() {
        await auditLogsLocators.auditLogsTab(this.page).click();
    }

    async filterByTimestamp(filter: string) {
        await auditLogsLocators.dateColumn(this.page).fill(filter);
        await this.page.waitForTimeout(1500);
    }

    async selectDate(decade: string, year: string, month: string, day: string) {
        await auditLogsLocators.dateSelectButton(this.page).click();
        await auditLogsLocators.monthSelectButton(this.page).click();
        await auditLogsLocators.yearSelectButton(this.page).click();
        await auditLogsLocators.decadeSelectButton(this.page).click();

        await auditLogsLocators.setDecade(this.page, decade).click();
        await auditLogsLocators.setYear(this.page, year).click();
        await auditLogsLocators.setMonth(this.page, month, year).click();
        await auditLogsLocators.setDay(this.page, month, day).click();
    }

    async filterByAction(action: string) {
        await auditLogsLocators.actionColumn(this.page).fill(action);
        await this.page.waitForTimeout(1500);
    }

    async filterByDetails(details: string) {
        await auditLogsLocators.detailsColumn(this.page).fill(details);
        await this.page.waitForTimeout(500);
    }
}
