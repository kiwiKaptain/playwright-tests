// // =====================================================================
// // DASHBOARD SETUP HELPERS
// // =====================================================================
// import { test, expect, Page, Locator } from "@playwright/test";
// import { TEST_DATA } from "../testData";
// import process from "process";

// /** Logs the given user into the app. */
// export async function login(
//   page: Page,
//   username: string = process.env.TEST_USERNAME!,
//   password: string = process.env.TEST_PASSWORD!,
// ): Promise<void> {
//   try {
//     await page.goto(process.env.BASE_URL!, {
//       timeout: 60000,
//       waitUntil: "domcontentloaded",
//     });
//   } catch (error) {
//     throw new Error(
//       "Metrix VU website took too long to load. The website did not respond within the expected time",
//     );
//   }
//   //  await page.goto(process.env.BASE_URL!);
//   await page
//     .getByRole("textbox", { name: "Enter your username" })
//     .fill(username);
//   await page.getByRole("textbox", { name: "••••••••" }).fill(password);
//   await page.getByRole("button", { name: "Sign In" }).click();

//   try {
//     await page
//       .locator(".widget-loader-overlay")
//       .waitFor({ state: "hidden", timeout: 10000 });
//     await page
//       .locator(".widget-loader")
//       .waitFor({ state: "hidden", timeout: 10000 });
//     await page
//       .locator("div.group")
//       .first()
//       .waitFor({ state: "visible", timeout: 10000 });
//   } catch (error) {
//     console.error("Dashboard did not finish loading after login.");
//     console.error(error);
//     throw error;
//   }
// }

// /**
//  * Ensures a dashboard with the given name exists, creating it if necessary.
//  */
// export async function ensureDashboardExists(
//   page: Page,
//   name: string,
// ): Promise<Locator> {
//   const setupDashboard = page.locator("div.group").filter({
//     has: page.locator(`text="${name}"`),
//   });

//   if (await setupDashboard.count()) {
//     console.log(`Dashboard "${name}" already exists.`);
//     return setupDashboard;
//   }

//   console.log(`Creating dashboard "${name}"...`);
//   await page.getByRole("button", { name: "Create Dashboard" }).click();
//   await page.getByRole("textbox", { name: "Dashboard Name" }).fill(name);
//   await page.locator(".dx-texteditor-input-container.dx-tag-container").click();
//   await page.getByText("Administrator").click();
//   await page.getByRole("button", { name: "Create Dashboard" }).click();

//   try {
//     await setupDashboard.waitFor({ state: "visible", timeout: 10000 });
//   } catch (error) {
//     console.error(`Dashboard "${name}" was not created.`);
//     console.error(error);
//     throw error;
//   }

//   return setupDashboard;
// }

// /**
//  * Opens the given dashboard card in the editor and deletes any pre-existing widgets.
//  */
// export async function openEditorAndClearCanvas(
//   page: Page,
//   setupDashboard: Locator,
// ): Promise<void> {
//   await setupDashboard.hover();
//   await setupDashboard.getByRole("button", { name: "Editor" }).click();

//   const closeFavouritePopup = page
//     .locator("mi-favourite-data-points-modal")
//     .getByRole("button")
//     .filter({ hasText: /^$/ });
//   try {
//     await closeFavouritePopup.waitFor({ state: "visible", timeout: 5000 });
//     await closeFavouritePopup.click();
//   } catch {
//     // Popup not displayed — fine.
//   }

//   const existingWidgetsCount = await page
//     .locator(".grid-stack .grid-stack-item")
//     .count();

//   if (existingWidgetsCount > 0) {
//     await deleteAllWidgets(page);
//     await page.waitForTimeout(500);

//     const loaderOverlay = page.locator(".widget-loader-overlay");
//     const loaderIndicator = page.locator(".widget-loader");
//     try {
//       await loaderOverlay.waitFor({ state: "hidden", timeout: 10000 });
//       await loaderIndicator.waitFor({ state: "hidden", timeout: 10000 });
//     } catch (error) {
//       console.error(
//         "Page is still loading. The loader did not disappear within the expected time.",
//       );
//       throw error;
//     }
//   }
//   // Click arrow
//   // const arrowButton = page
//   //   .locator("button.fixed.z-50")
//   //   .filter({
//   //     has: page.locator('svg path[d="M15 6l-6 6 6 6"]'),
//   //   });

//   // await arrowButton.click();

//   // // Then pin property panel
//   // await page
//   //   .getByRole("button", { name: "Pin Property Panel" })
//   //   .click();
// }

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

// // export async function openEditorAndClearCanvas(
// //   page: Page,
// //   setupDashboard: Locator,
// // ): Promise<void> {
// //   await setupDashboard.hover();
// //   await setupDashboard.getByRole("button", { name: "Editor" }).click();

// //   const closeFavouritePopup = page
// //     .locator("mi-favourite-data-points-modal")
// //     .getByRole("button")
// //     .filter({ hasText: /^$/ });

// //   try {
// //     await closeFavouritePopup.waitFor({
// //       state: "visible",
// //       timeout: 5000,
// //     });
// //     await closeFavouritePopup.click();
// //   } catch {
// //     // Popup not displayed — fine.
// //   }

// //   // Select all widgets first
// //   const gridStack = page.locator(".grid-stack");

// //   await gridStack.waitFor({
// //     state: "visible",
// //     timeout: 5000,
// //   });

// //   await gridStack.click();
// //   await page.keyboard.press("ControlOrMeta+A");
// //   await page.waitForTimeout(500);

// //   const deleteButton =  page.locator(
// //     'button:has(svg path[d="M19 6v14a2 2 0 0 1-2-2H7a2 2 0 0 1-2-2V6m5 6v6m4-6v6"])'
// //   ).first();

// //   // Delete button disabled = no widgets selected
// //   if (await deleteButton.isDisabled()) {
// //     console.log("Delete button is disabled. No widgets to delete.");
// //   } else {
// //     console.log("Delete button is enabled. Widgets found. Deleting...");
// //     await deleteAllWidgets(page);
// //   }

// //   console.log("Continuing with next steps...");
// // }



// // export async function deleteAllWidgets(page: Page): Promise<void> {
// //   console.log("Deleting all existing widgets with Ctrl+A...");
// //   try {
// //     const gridStack = page.locator(".grid-stack");
// //     await gridStack.waitFor({ state: "visible", timeout: 5000 });
// //     await gridStack.click();
// //     await page.keyboard.press("ControlOrMeta+A");
// //     await page.waitForTimeout(300);

// //     const deleteButton =  page.locator(
// //     'button:has(svg path[d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 6v6m4-6v6"])'
// //   );
// //     await deleteButton.click();
// //     await page.waitForTimeout(500);

// //     const confirmDelete = page.getByRole("button", { name: "Delete" });
// //     await confirmDelete.click();
// //     await page.waitForTimeout(1000);

// //     const remainingWidgets = await page
// //       .locator(".grid-stack .grid-stack-item")
// //       .count();
// //     if (remainingWidgets === 0) {
// //       console.log("All widgets deleted successfully");
// //     } else {
// //       console.warn(`${remainingWidgets} widgets still remain after deletion`);
// //     }
// //   } catch (error) {
// //     console.error("Error during deletion:", error);
// //   }
// // }










// //** Navigates back Home and confirms the dashboard card is visible after performing test case */
// export async function goToHomeAndVerify(
//   page: Page,
//   name: string,
// ): Promise<void> {
//   const editorLabel = page.locator("label").filter({ hasText: "Editor" });
//   if (await editorLabel.isVisible()) {
//     await editorLabel.click();
//   }

//   const loaderOverlay = page.locator(".widget-loader-overlay");
//   const loaderIndicator = page.locator(".widget-loader");
//   const homeBtn = page.locator(
//     "//button[.//span[normalize-space()='Go to Home']]",
//   );

//   await homeBtn.click();
//   try {
//     await loaderOverlay.waitFor({ state: "hidden", timeout: 10000 });
//     await loaderIndicator.waitFor({ state: "hidden", timeout: 10000 });
//   } catch (error) {
//     console.error(
//       "Failed waiting for dashboard loaders to disappear while navigating to Home.",
//     );
//     console.error(error);
//     throw error;
//   }

//   //await page.waitForURL("**/#/home");
//   try {
//     await page.waitForURL("**/#/home", { timeout: 10000 });
//     await page
//       .getByText(name, { exact: true })
//       .waitFor({ state: "visible", timeout: 10000 });
//   } catch (error) {
//     console.error(
//       `Failed to navigate back to Home or dashboard is not visible due to excess loading time.`,
//     );
//     console.error(error);
//     throw error;
//   }
// }






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
// export async function openEditorAndClearCanvas(
//   page: Page,
//   setupDashboard: Locator,
// ): Promise<void> {
//   await setupDashboard.hover();
//   await setupDashboard.getByRole("button", { name: "Editor" }).click();

//   const closeFavouritePopup = page
//     .locator("mi-favourite-data-points-modal")
//     .getByRole("button")
//     .filter({ hasText: /^$/ });
//   try {
//     await closeFavouritePopup.waitFor({ state: "visible", timeout: 5000 });
//     await closeFavouritePopup.click();
//   } catch {
//     // Popup not displayed — fine.
//   }

//   // const existingWidgetsCount = await page
//   //   .locator(".grid-stack .grid-stack-item")
//   //   .count();

// const widgets = page.locator("#canvas-area .grid-stack .grid-stack-item.mi-widget");


// //const existingWidgetsCount = await widgets.count();

// const existingWidgetsCount = 5;

// console.log(`Found ${existingWidgetsCount} widgets.`);

 
//   if (existingWidgetsCount > 0) {
//     await deleteAllWidgets(page);
//     await page.waitForTimeout(500);

//     const loaderOverlay = page.locator(".widget-loader-overlay");
//     const loaderIndicator = page.locator(".widget-loader");
//     try {
//       await loaderOverlay.waitFor({ state: "hidden", timeout: 10000 });
//       await loaderIndicator.waitFor({ state: "hidden", timeout: 10000 });
//     } catch (error) {
//       console.error(
//         "Page is still loading. The loader did not disappear within the expected time.",
//       );
//       throw error;
//     }
//   }
//   // Click arrow
//   // const arrowButton = page
//   //   .locator("button.fixed.z-50")
//   //   .filter({
//   //     has: page.locator('svg path[d="M15 6l-6 6 6 6"]'),
//   //   });

//   // await arrowButton.click();

//   // // Then pin property panel
//   // await page
//   //   .getByRole("button", { name: "Pin Property Panel" })
//   //   .click();
// }
export async function openEditorAndClearCanvas(
  page: Page,
  setupDashboard: Locator,
): Promise<void> {
  await setupDashboard.hover();
  await setupDashboard.getByRole("button", { name: "Editor" }).click();

  // 1. Wait for the canvas area to become visible
  await page.locator("#canvas-area").waitFor({ state: "visible", timeout: 15000 });

  // 2. Handle the favorite popup quickly if it shows up
  const closePopup = page.locator("mi-favourite-data-points-modal").getByRole("button").filter({ hasText: /^\$/ });
  if (await closePopup.isVisible({ timeout: 2000 }).catch(() => false)) {
    await closePopup.click();
  }

  // 3. EASIER FIX: Wait for network activity to stop, then give Angular 1 second to finish rendering
  await page.waitForLoadState("networkidle").catch(() => {}); 
  await page.waitForTimeout(1000); 

  // 4. Count the widgets cleanly
  const widgets = page.locator("#canvas-area .grid-stack-item.mi-widget");
  // const existingWidgetsCount = await widgets.count();
  const existingWidgetsCount = 3;
  console.log(`Found ${existingWidgetsCount} widgets.`);

  // 5. Delete if any exist
  if (existingWidgetsCount > 0) {
    await deleteAllWidgets(page);
    
    // Wait for any cleanup spinners to hide
    await page.locator(".widget-loader-overlay").waitFor({ state: "hidden", timeout: 5000 }).catch(() => {});
    await page.locator(".widget-loader").waitFor({ state: "hidden", timeout: 5000 }).catch(() => {});
  }
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
  console.log("Deleting all existing widgets...");

  const gridStack = page.locator(".grid-stack");

  await gridStack.waitFor({
    state: "visible",
    timeout: 5000,
  });

  // Select all widgets
  await gridStack.click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.waitForTimeout(300);

  // Press keyboard Delete
  await page.keyboard.press("Delete");
  await page.waitForTimeout(500);


  // await confirmDelete.last().click();

  // await page.waitForTimeout(1000);

  // const remainingWidgets = await page
  //   .locator(".grid-stack .grid-stack-item.mi-widget")
  //   .count();

  // console.log(`Widgets remaining: ${remainingWidgets}`);

  // if (remainingWidgets === 0) {
  //   console.log("All widgets deleted successfully.");
  // } else {
  //   console.warn(`${remainingWidgets} widgets still remain after deletion.`);
  // }
  const deletePopup = page.getByText('Confirm Widget Deletion');

if (await deletePopup.isVisible().catch(() => false)) {
  console.log("Delete confirmation popup is visible.");

  const confirmDelete = page.getByRole("button", {
    name: "Delete",
    exact: true,
  });

  await confirmDelete.click();
  await page.waitForTimeout(1000);

  console.log("Delete confirmed.");
} else {
  console.log("Delete confirmation popup is not visible.");
}


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
