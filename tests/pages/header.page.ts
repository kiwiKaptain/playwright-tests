import { Page } from "@playwright/test";
import { headerLocators } from "../locators/header.locators";

export class HeaderPage {
    constructor(private page: Page) {}

    async logout() {
        await headerLocators.userButton(this.page).click();
        await headerLocators.logoutButton(this.page).click();
    }
}