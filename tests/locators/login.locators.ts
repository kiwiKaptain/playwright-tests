import { Page } from "@playwright/test";

export const loginLocators = {
    username: (page: Page) =>
        page.getByRole("textbox", { name: "Enter your username" }),
    password: (page: Page) => page.getByRole("textbox", { name: "••••••••" }),
    signInButton: (page: Page) => page.getByRole("button", { name: "Sign In" }),
};
