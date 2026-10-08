import { expect, Page } from "@playwright/test";
import { commLocators } from "../locators/commmunications.locators";

export class CommsPage {
    constructor(private page: Page) {}

    async gotoComms() {
        await commLocators.commsTab(this.page).click();
    }

    async discardUnsavedChangesIfPresent() {
        const discardButton = commLocators.discardChangesButton(this.page);

        if (await discardButton.isVisible()) {
            await discardButton.click();
        }
    }

    async createInstance(
        driverName: string,
        instanceName: string,
        connectionName: string,
        isDuplicate = false,
    ) {
        await commLocators.getDriverInstance(this.page, driverName).click();
        await commLocators.addInstanceButton(this.page).click();
        // await commLocators.instanceName(this.page).fill('ModbusTestInstance');
        await commLocators.instanceName(this.page).fill(instanceName);
        await commLocators.saveInstanceButton(this.page).click();
        // await commLocators.instanceConnectionName(this.page).fill('TestConnectionModbus');

        if (!isDuplicate) {
            await commLocators
                .instanceConnectionName(this.page)
                .fill(connectionName);
            await commLocators.saveConnectionButton(this.page).click();
            await commLocators.gotoInstanceTab(this.page).click();
            await this.discardUnsavedChangesIfPresent();
            await commLocators.gotoDriversTab(this.page).click();
            await this.discardUnsavedChangesIfPresent();
        }
    }

    async waitForDuplicateInstanceNameAlert() {
        await expect(
            commLocators.duplicateInstanceAlert(this.page),
        ).toBeVisible();
    }
}
