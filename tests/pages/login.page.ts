import { Page } from "@playwright/test";
import { loginLocators } from "../locators/login.locators";

export class LoginPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto("/");
    }

    async login(username: string, password: string) {
        await loginLocators.username(this.page).fill(username);
        await loginLocators.password(this.page).fill(password);
        await loginLocators.signInButton(this.page).click();
    }
}
