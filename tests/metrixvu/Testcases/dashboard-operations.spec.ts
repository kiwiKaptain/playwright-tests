import { test, expect } from "@playwright/test";

import process from "process";
import { TEST_DATA } from "../testData";
// ============================================================================
// Test Setup - Launch Application and Login before each test case
// ============================================================================

test.beforeEach("Open Metrix VU", async ({ page }) => {
  console.log("BASE_URL in DASHBOARD FILE:", process.env.BASE_URL);
  await page.goto(process.env.BASE_URL!);

  await page
    .getByRole("textbox", { name: "Enter your username" })
    .fill(process.env.TEST_USERNAME!);
  await page
    .getByRole("textbox", { name: "••••••••" })
    .fill(process.env.TEST_PASSWORD!);
  await page.getByRole("button", { name: "Sign In" }).click();

  // Verify login was successful
  await expect(
    page.getByRole("button", { name: "Create Dashboard" }),
  ).toBeVisible();
});
// ============================================================================
// Test Setup - Logout from Application after each test case
// ============================================================================
test.afterEach("Logout from Metrix VU", async ({ page }) => {
  try {
    const userMenu = page.getByRole("button", { name: "Profile" });
    if (await userMenu.isVisible({ timeout: 5000 })) {
      await userMenu.click();
      await page.getByRole("button", { name: "Sign Out" }).click();
    }
  } catch (e) {
    if (e instanceof Error) {
      console.warn(
        "Teardown clean warning: User was already logged out or context shifted.",
        e.message,
      );
    } else {
      console.warn(
        "Teardown clean warning: An unknown error object type occurred.",
        String(e),
      );
    }
  }
});
// ============================================================================
// DASHBOARD
// ============================================================================
test.describe("DASHBOARD OPERATIONS", () => {
  test("1. User can create a new dashboard successfully", async ({ page }) => {
    const dashboardName = TEST_DATA.dashboards.newDashboardName;

    await page.getByRole("button", { name: "Create Dashboard" }).click();

    // Verify Create Dashboard popup is open
    await expect(
      page.getByRole("textbox", { name: "Dashboard Name" }),
    ).toBeVisible();

    await page
      .getByRole("textbox", { name: "Dashboard Name" })
      .fill(dashboardName);

    await page
      .locator(".dx-texteditor-input-container.dx-tag-container")
      .click();

    await page.getByText("Administrator").click();

    await page
      .getByRole("textbox", { name: "Enter short description..." })
      .fill("Sample Dashboard Testing");

    await page.getByRole("button", { name: "Create Dashboard" }).click();

    // Check whether a duplicate dashboard validation message is displayed
    const duplicateDashboardError = page.locator(".dx-toast-message").filter({
      hasText: "already exists",
    });

  // Wait briefly for the toast to appear
    const isDuplicate = await duplicateDashboardError
      .waitFor({ state: "visible", timeout: 3000 })
      .then(() => true)
      .catch(() => false);

    if (isDuplicate) {
      throw new Error(
        `Dashboard creation failed: Dashboard "${dashboardName}" already exists.`,
      );
    }


    // Verify dashboard was created
    await expect(page.getByText(dashboardName, { exact: true })).toBeVisible();
  });

  test("2. Existing dashboard can be updated successfully", async ({
    page,
  }) => {
    const existingDashboard = TEST_DATA.dashboards.newDashboardName;
    const updatedDashboard = TEST_DATA.dashboards.updatedDashboardName;

    const dashboardToEdit = page.getByText(existingDashboard, {
      exact: true,
    });

    // Verify dashboard exists
    await expect(dashboardToEdit).toBeVisible();
    if (!(await dashboardToEdit.isVisible())) {
       throw new Error(`Dashboard "TestingDashboard" was not found to update.Please create a dashboard named "TestingDashboard" or run Test Case 1 first to create it, then run this test. `);
    }

    await dashboardToEdit.click();

    await dashboardToEdit
      .locator("xpath=ancestor::div[contains(@class,'flex-col')][1]")
      .locator("button")
      .click();

    await page
      .getByRole("textbox", { name: "Dashboard Name" })
      .fill(updatedDashboard);

    await page
      .getByRole("textbox", { name: "Enter short description..." })
      .fill("Sample Description Updated");

    await page.getByRole("button", { name: "Update" }).click();

    await expect(page.locator(".dx-toast-message")).toContainText(
      "Dashboard updated",
      //   { timeout: 15000 }
    );
  });





  test("3. Existing dashboard can be deleted successfully", async ({ page, }) => 
    {
       const dashboardName = TEST_DATA.dashboards.newDashboardName; 
       const dashboardCard = page.locator("div.group", { has: page.getByText(dashboardName, { exact: true }), }); 
       await expect(dashboardCard).toBeVisible(); 
        if (!(await dashboardCard.isVisible())) {
         throw new Error(`Dashboard "TestingDashboard" was not found to delete.Please create a dashboard named "TestingDashboard" or run Test Case 1 first to create it, then run this test. `);
    }
       await dashboardCard .locator("div.absolute.top-3.right-3 button") .click(); 
       await page .getByRole("button", { name: "Delete", exact: true }) .click(); 
       
  await page.locator('.dx-overlay-content.dx-popup-normal.dx-resizable.dx-popup-flex-height.dx-state-focused > .dx-popup-content').click();
     // await page.getByRole('button', { name: 'Delete' }).click();
 await page.getByTestId(  "button-confirm-delete-dashboard").click();

       await expect(page.locator(".dx-toast-message")).toContainText(
      "Dashboard deleted",

    );

});

});
