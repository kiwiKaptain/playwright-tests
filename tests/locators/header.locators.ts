import { Page } from "@playwright/test";

export const headerLocators = {
    userButton: (page: Page) => page.getByRole("button", { name: "user" }),
    logoutButton: (page: Page) => page.getByText("Logout"),
};
