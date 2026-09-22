import { test, expect } from "@playwright/test";

test.describe("Node CRUD", () => {
    // Clean Lifecycle Management
    test.beforeEach("Open Metrix Hub", async ({ page }) => {
        // Navigate and check for basic page availability
        // const loginUrl = "http://192.168.1.99:4200/#/login";
        const loginUrl = "http://optvian.local/metrixhub/#/login";
        await page.goto(loginUrl);
        await expect(
            page,
            `Failed to reach the login endpoint page: ${loginUrl}`,
        ).toHaveURL(/.*login/);

        // Form inputs interaction with explicit safety visibility checks
        const usernameInput = page.getByRole("textbox", {
            name: "Enter your username",
        });
        await expect(
            usernameInput,
            "The username input field is missing from the login form template.",
        ).toBeVisible();
        await usernameInput.fill("admin");

        const passwordInput = page.getByRole("textbox", { name: "••••••••" });
        await expect(
            passwordInput,
            "The password input field is missing from the login form template.",
        ).toBeVisible();
        await passwordInput.fill("adm!n$25");

        await page.getByRole("button", { name: "Sign In" }).click();

        // Verify authentication was successful and navigation occurred before proceeding to individual tests
        const assetNavButton = page
            .locator("div")
            .filter({ hasText: "Assets" })
            .nth(3);
        await expect(
            assetNavButton,
            "Login failed: The dashboard 'Assets' navigation option is not visible.",
        ).toBeVisible();
        await assetNavButton.click();
    });

    //   test.afterEach("Logout from Metrix Hub", async ({ page }) => {
    //     // Graceful teardown to prevent hanging user authentication sessions
    //     try {
    //       const userMenu = page.getByRole("button", { name: "user" });
    //       if (await userMenu.isVisible({ timeout: 5000 })) {
    //         await userMenu.click();
    //         await page.getByText("Logout").click();
    //       }
    //     } catch (e) {
    //       if (e instanceof Error) {
    //         console.warn(
    //           "Teardown clean warning: User was already logged out or context shifted.",
    //           e.message,
    //         );
    //       } else {
    //         console.warn(
    //           "Teardown clean warning: An unknown error object type occurred.",
    //           String(e),
    //         );
    //       }
    //     }
    //   });

    test("add node", async ({ page }) => {
        // Node name extraction and selecting gear icon based on that
        const nodeName = "Test";

        await page
            .locator(
                `xpath=//span[normalize-space()='${nodeName}']/ancestor::div[contains(@class, 'dx-treeview-item-content')]//dx-button[contains(@class, 'gear-btn')]`,
            )
            .click();

        await page.getByRole("button", { name: " Add" }).click();
        await page
            .getByRole("textbox", { name: "Enter node name..." })
            .fill("TestNode");
        await page.getByRole("button", { name: "Add Node" }).click();
    });

    test("edit node", async ({ page }) => {
        const editNodeName = "TestNode";

        await page
            .locator(
                `xpath=//span[normalize-space()='${editNodeName}']/ancestor::div[contains(@class, 'dx-treeview-item-content')]//dx-button[contains(@class, 'gear-btn')]`,
            )
            .click();

        await page.getByRole("button", { name: " Edit" }).click();
        await page
            .getByRole("textbox", { name: "Enter node name..." })
            .fill("TestNodeName");
        await page.getByRole("button", { name: "Save Changes" }).click();
    });

    test("delete node", async ({ page }) => {
        const deleteNodeName = "TestNodeName";

        await page
            .locator(
                `xpath=//span[normalize-space()='${deleteNodeName}']/ancestor::div[contains(@class, 'dx-treeview-item-content')]//dx-button[contains(@class, 'gear-btn')]`,
            )
            .click();

        await page.getByRole("button", { name: " Delete" }).click();
        await page.getByRole("paragraph").getByText("TestNodeName").click();
        await page.getByRole("button", { name: "Delete" }).click();
        // await page.getByRole("button", { name: "Cancel" }).click();
    });
});
