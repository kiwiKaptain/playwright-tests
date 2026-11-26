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

export async function turnDarkMode(page: Page) {
  await page.getByRole("banner").click();

  // const themeToggle = page
  //   .getByRole("button")
  //   .filter({ hasText: "Toggle Light/Dark Mode" });

const themeToggle = page.getByTestId('theme-toggle-btn');

  if ((await themeToggle.count()) === 0) {
    throw new Error(
      "Toggle Light/Dark Mode button not found. Playwright might be stuck or the page may not have loaded correctly. Please try rerunning the test case."
    );
  }

  await themeToggle.click();
await page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).click();




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

  await page.locator('.space-y-4 > div:nth-child(3)').click();
  await page.getByText('Property Panel in Viewer').click();
  await page.getByText('Allow property panel to be').click();
  await page.getByRole('button', { name: 'OFF' }).nth(2).click();
  await page.getByText('Property Panel in Viewer ENABLED Allow property panel to be visible and').click();

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

  // 1. Wait for the canvas area to become visible
  await page
    .locator("#canvas-area")
    .waitFor({ state: "visible", timeout: 15000 });

  // 2. Handle the favorite popup quickly if it shows up
//   const closePopup = page
//     .locator("mi-favourite-data-points-modal")
//     .getByRole("button")
//     .filter({ hasText: /^\$/ });

//   if (await closePopup.isVisible({ timeout: 5000 }).catch(() => false)) {
//     await closePopup.click();
//   }

  // Handle the Favourite Data Points popup if it appears
  const favouriteDataPointsModal = page
    .locator("mi-favourite-data-points-modal")
    .filter({
      has: page.getByRole("heading", {
        name: "Favourite Data Points",
        exact: true,
      }),
    });

  const favouriteDataPointsHeading = favouriteDataPointsModal.getByRole(
    "heading",
    {
      name: "Favourite Data Points",
      exact: true,
    }
  );

  try {
    await favouriteDataPointsHeading.waitFor({
      state: "visible",
      timeout: 5000,
    });

    console.log("Favourite Data Points popup is visible.");

    const cancelButton = favouriteDataPointsModal.getByRole("button", {
      name: "Cancel",
      exact: true,
    });

    try {
      await cancelButton.click({ timeout: 5000 });
      await favouriteDataPointsHeading.waitFor({
        state: "hidden",
        timeout: 5000,
      });

      console.log("Favourite Data Points popup closed successfully.");
    } catch (error) {
      throw new Error(
        `Failed to click Cancel or close the Favourite Data Points popup. ${error}`
      );
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(
        "Failed to click Cancel or close the Favourite Data Points popup."
      )
    ) {
      throw error;
    }

    console.log(
      "Favourite Data Points popup did not become visible within 5 seconds. Continuing..."
    );
  }

  //Wait for network activity to stop,
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1000);

  await deleteAllWidgets(page);

  // Wait for any cleanup spinners to hide
  await page
    .locator(".widget-loader-overlay")
    .waitFor({ state: "hidden", timeout: 5000 })
    .catch(() => {});
  await page
    .locator(".widget-loader")
    .waitFor({ state: "hidden", timeout: 5000 })
    .catch(() => {});



    
}

// export async function deleteAllWidgets(page: Page): Promise<void> {
//   console.log("Deleting all existing widgets...");

//   const gridStack = page.locator(".grid-stack");

//   await gridStack.waitFor({
//     state: "visible",
//     timeout: 5000,
//   });

//   // Select all widgets
//   await gridStack.click();
//   await page.keyboard.press("ControlOrMeta+A");
//   await page.waitForTimeout(300);

//   // Press keyboard Delete
//   await page.keyboard.press("Delete");
//   await page.waitForTimeout(500);

//   const deletePopup = page.getByText('Confirm Widget Deletion');

// if (await deletePopup.isVisible().catch(() => false)) {
//   console.log("Delete confirmation popup is visible.");

//   const confirmDelete = page.getByRole("button", {
//     name: "Delete",
//     exact: true,
//   });

//   await confirmDelete.click();
//   await page.waitForTimeout(1000);

//   console.log("Delete confirmed.");
// } else {
//   console.log("Delete confirmation popup is not visible.");
// }
// await gridStack.click();

// }

export async function deleteAllWidgets(page: Page): Promise<void> {
  console.log("Deleting all existing widgets...");

  const gridStack = page.locator(".grid-stack");

  await gridStack.waitFor({
    state: "visible",
    timeout: 10000,
  });

  const widgets = page.locator(
    ".grid-stack > .grid-stack-item[data-widget-type]",
  );

  console.log(`Widgets found: ${await widgets.count()}`);
  while ((await widgets.count()) > 0) {
    const initialCount = await widgets.count();

    console.log(`Widgets found: ${initialCount}`);

    const widget = widgets.first();

    console.log("Scrolling widget into view...");

    await widget.scrollIntoViewIfNeeded({
      timeout: 5000,
    });

    console.log("Widget is in view. Clicking widget...");

    await widget.click({
      timeout: 5000,
      force: true,
    });

    console.log("Widget clicked.");
    await page.waitForTimeout(300);

    console.log("Pressing Delete...");
    await page.keyboard.press("Delete");
    await page.waitForTimeout(500);

    const deletePopup = page.getByText("Confirm Widget Deletion");
    const popupVisible = await deletePopup.isVisible().catch(() => false);

    console.log(`Delete confirmation popup visible: ${popupVisible}`);

    if (popupVisible) {
      console.log("Confirming widget deletion...");

      await page
        .getByRole("button", {
          name: "Delete",
          exact: true,
        })
        .click({ timeout: 5000 });

      await page.waitForTimeout(700);
      console.log("Deletion confirmed.");
    }

    const remaining = await widgets.count();

    console.log(`Widgets remaining: ${remaining}`);

    if (remaining >= initialCount && remaining > 0) {
      console.log(
        "Widget count did not decrease. Stopping to prevent an infinite loop.",
      );
      break;
    }
  }

  console.log(`Remaining widgets: ${await widgets.count()}`);
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

export async function openDashboardInEditor(
  page: Page,
  dashboardName: Locator,
): Promise<void> {
  console.log("Waiting for dashboard card to become visible...");

  await dashboardName.waitFor({
    state: "visible",
    timeout: 15000,
  });

  await dashboardName.hover();

  const editorButton = dashboardName.getByRole("button", {
    name: "Editor",
  });

  try {
    await editorButton.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await editorButton.click({
      timeout: 10000,
    });
  } catch (error) {
    throw new Error(
      "Failed to click the Editor button. The button may not be visible, enabled, or actionable. Please verify the dashboard card and retry.",
      { cause: error },
    );
  }

  console.log("Editor button clicked. Waiting for canvas...");

  await page.locator("#canvas-area").waitFor({
    state: "visible",
    timeout: 15000,
  });

  const closePopup = page
    .locator("mi-favourite-data-points-modal")
    .getByRole("button")
    .filter({ hasText: /^\$/ });

  if (await closePopup.isVisible().catch(() => false)) {
    await closePopup.click({ timeout: 3000 }).catch(() => {});
  }

  await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

  await page
    .locator(".widget-loader-overlay")
    .waitFor({ state: "hidden", timeout: 10000 })
    .catch(() => {});

  await page
    .locator(".widget-loader")
    .waitFor({ state: "hidden", timeout: 10000 })
    .catch(() => {});

  console.log("Dashboard opened in Editor mode.");
}



export async function copyPasteWidget(page: Page): Promise<void> {
  try {
    console.log("Copying the configured Widget...");
    await page.getByTestId("toolbar-copy-button").click();
    await page.waitForTimeout(500);

    console.log("Pasting the copied Widget...");
    await page.getByTestId("toolbar-paste-button").click();
    await page.waitForTimeout(5000);

    console.log("PASS: Widget copied and pasted successfully.");
  } catch (error) {
    console.error(
      "COPY-PASTE OF Widget FAILED: Unable to copy or paste the configured Bar Chart."
    );
    console.error("Issue:", error);
    throw error;
  }
}



export async function dragPastedWidget(
  page: Page,
  originalWidget: Locator,
  pastedWidget: Locator
): Promise<void> {
  try {
    console.log("Moving pasted widget horizontally to the right...");

    const pastedBox = await pastedWidget.boundingBox();

    if (!pastedBox) {
      throw new Error(
        "DRAG FAILED: Unable to determine the position of the pasted widget."
      );
    }

    const startX = pastedBox.x + pastedBox.width / 2;
    const startY = pastedBox.y + pastedBox.height / 2;
    const targetX = startX + pastedBox.width / 2 + 200;

    await page.mouse.move(startX, startY);
    await page.mouse.down();

    try {
      await page.mouse.move(targetX, startY, {
        steps: 100,
      });
    } finally {
      await page.mouse.up();
    }

    await page.waitForTimeout(1000);

    await expect(
      originalWidget,
      "DRAG FAILED: Original widget is no longer visible."
    ).toBeVisible();

    await expect(
      pastedWidget,
      "DRAG FAILED: Pasted widget is no longer visible after dragging."
    ).toBeVisible();

    console.log("PASS: Pasted widget drag completed.");
  } catch (error) {
    console.error("DRAG FAILED: Unable to move the pasted widget.");
    console.error("Issue:", error);
    throw error;
  }
}
