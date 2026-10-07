// =====================================================================
// DASHBOARD SETUP HELPERS
// =====================================================================
import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../testData";
import process from "process";

/** Logs the given user into the app. */
export async function login(
  page: Page,
  username: string = process.env.TEST_USERNAME!,
  password: string = process.env.TEST_PASSWORD!,
): Promise<void> {
  try {
    await page.goto(process.env.BASE_URL!, {
      timeout: 60000,
      waitUntil: "domcontentloaded",
    });
  } catch (error) {
    throw new Error(
      "Metrix VU website took too long to load. The website did not respond within the expected time",
    );
  }
  //  await page.goto(process.env.BASE_URL!);
  await page
    .getByRole("textbox", { name: "Enter your username" })
    .fill(username);
  await page.getByRole("textbox", { name: "••••••••" }).fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();

  try {
    await page
      .locator(".widget-loader-overlay")
      .waitFor({ state: "hidden", timeout: 10000 });
    await page
      .locator(".widget-loader")
      .waitFor({ state: "hidden", timeout: 10000 });
    await page
      .locator("div.group")
      .first()
      .waitFor({ state: "visible", timeout: 10000 });
  } catch (error) {
    console.error("Dashboard did not finish loading after login.");
    console.error(error);
    throw error;
  }
}

/**
 * Ensures a dashboard with the given name exists, creating it if necessary.
 */
export async function ensureDashboardExists(
  page: Page,
  name: string,
): Promise<Locator> {
  const setupDashboard = page.locator("div.group").filter({
    has: page.locator(`text="${name}"`),
  });

  if (await setupDashboard.count()) {
    console.log(`Dashboard "${name}" already exists.`);
    return setupDashboard;
  }

  console.log(`Creating dashboard "${name}"...`);
  await page.getByRole("button", { name: "Create Dashboard" }).click();
  await page.getByRole("textbox", { name: "Dashboard Name" }).fill(name);
  await page.locator(".dx-texteditor-input-container.dx-tag-container").click();
  await page.getByText("Administrator").click();
  await page.getByRole("button", { name: "Create Dashboard" }).click();

  try {
    await setupDashboard.waitFor({ state: "visible", timeout: 10000 });
  } catch (error) {
    console.error(`Dashboard "${name}" was not created.`);
    console.error(error);
    throw error;
  }

  return setupDashboard;
}

/**
 * Opens the given dashboard card in the editor and deletes any pre-existing widgets.
 */
export async function openEditorAndClearCanvas(
  page: Page,
  setupDashboard: Locator,
): Promise<void> {
  await setupDashboard.hover();
  await setupDashboard.getByRole("button", { name: "Editor" }).click();

  const closeFavouritePopup = page
    .locator("mi-favourite-data-points-modal")
    .getByRole("button")
    .filter({ hasText: /^$/ });
  try {
    await closeFavouritePopup.waitFor({ state: "visible", timeout: 5000 });
    await closeFavouritePopup.click();
  } catch {
    // Popup not displayed — fine.
  }
  await deleteAllWidgets(page);

  console.log("Continuing with next steps...");
  // const existingWidgetsCount = await page
  //   .locator(".grid-stack .grid-stack-item")
  //   .count();

  // if (existingWidgetsCount > 0) {
  //   await deleteAllWidgets(page);
  //   await page.waitForTimeout(500);

  //   const loaderOverlay = page.locator(".widget-loader-overlay");
  //   const loaderIndicator = page.locator(".widget-loader");
  //   try {
  //     await loaderOverlay.waitFor({ state: "hidden", timeout: 10000 });
  //     await loaderIndicator.waitFor({ state: "hidden", timeout: 10000 });
  //   } catch (error) {
  //     console.error(
  //       "Page is still loading. The loader did not disappear within the expected time.",
  //     );
  //     throw error;
  //   }
  // }
  // Click arrow
  // const arrowButton = page
  //   .locator("button.fixed.z-50")
  //   .filter({
  //     has: page.locator('svg path[d="M15 6l-6 6 6 6"]'),
  //   });

  // await arrowButton.click();

  // // Then pin property panel
  // await page
  //   .getByRole("button", { name: "Pin Property Panel" })
  //   .click();
}

// export async function deleteAllWidgets(page: Page): Promise<void> {
//   console.log("Deleting all existing widgets with Ctrl+A...");
//   try {
//     const gridStack = page.locator(".grid-stack");
//     await gridStack.waitFor({ state: "visible", timeout: 5000 });
//     await gridStack.click();
//     await page.keyboard.press("ControlOrMeta+A");
//     await page.waitForTimeout(300);

//     const deleteButton = page.getByRole("button").filter({ hasText: /^Delete$/ });
//     await deleteButton.click();
//     await page.waitForTimeout(500);

//     const confirmDelete = page.getByRole("button", { name: "Delete" });
//     await confirmDelete.click();
//     await page.waitForTimeout(1000);

//     const remainingWidgets = await page
//       .locator(".grid-stack .grid-stack-item")
//       .count();
//     if (remainingWidgets === 0) {
//       console.log("All widgets deleted successfully");
//     } else {
//       console.warn(`${remainingWidgets} widgets still remain after deletion`);
//     }
//   } catch (error) {
//     console.error("Error during deletion:", error);
//   }
// }
export async function deleteAllWidgets(page: Page): Promise<void> {
  console.log("Checking for widgets to delete...");

  const gridStack = page.locator(".grid-stack");

  await gridStack.waitFor({
    state: "visible",
    timeout: 5000,
  });

  // Select all widgets
  await gridStack.click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.waitForTimeout(5000);

  const deleteButton = page
    .getByRole("button", {
      name: "Delete",
      exact: true,
    })
    .first();

  // If there are no widgets, Delete should be disabled.
  if (await deleteButton.isDisabled().catch(() => true)) {
    console.log("No widgets selected. Delete button is disabled.");
    return;
  }

  console.log("Widgets found. Deleting...");

  await deleteButton.click();
  await page.waitForTimeout(5000);

  // Confirmation dialog
  const confirmDelete = page
    .getByRole("button", {
      name: "Delete",
      exact: true,
    })
    .last();

  await confirmDelete.click();
  await page.waitForTimeout(5000);

  console.log("All widgets deleted.");
}

//** Navigates back Home and confirms the dashboard card is visible after performing test case */
export async function goToHomeAndVerify(
  page: Page,
  name: string,
): Promise<void> {
  const editorLabel = page.locator("label").filter({ hasText: "Editor" });
  if (await editorLabel.isVisible()) {
    await editorLabel.click();
  }

  const loaderOverlay = page.locator(".widget-loader-overlay");
  const loaderIndicator = page.locator(".widget-loader");
  const homeBtn = page.locator(
    "//button[.//span[normalize-space()='Go to Home']]",
  );

  await homeBtn.click();
  try {
    await loaderOverlay.waitFor({ state: "hidden", timeout: 10000 });
    await loaderIndicator.waitFor({ state: "hidden", timeout: 10000 });
  } catch (error) {
    console.error(
      "Failed waiting for dashboard loaders to disappear while navigating to Home.",
    );
    console.error(error);
    throw error;
  }

  //await page.waitForURL("**/#/home");
  try {
    await page.waitForURL("**/#/home", { timeout: 10000 });
    await page
      .getByText(name, { exact: true })
      .waitFor({ state: "visible", timeout: 10000 });
  } catch (error) {
    console.error(
      `Failed to navigate back to Home or dashboard is not visible due to excess loading time.`,
    );
    console.error(error);
    throw error;
  }
}
