import { expect, test } from "@playwright/test";
import { TEST_DATA } from "../testData";
import {
  login,
  ensureDashboardExists,
  openEditorAndClearCanvas,
} from "../commonDashboardSetupHelpers";
import { dragAndDropWidget } from "../commonDragDropHelpers";
import { goToHomeAndVerify } from "../../../test-data/tests/metrix-vu/commonDashboardSetupHelpers";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;

test.describe("DRAG AND DROP - BASIC WIDGETS", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);

    const dashboardCard = await ensureDashboardExists(page, dashboardName);

    await openEditorAndClearCanvas(page, dashboardCard);
  });

  // BASIC WIDGET drag drop test cases
  test("1. User can drag drop CARD widget to the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-card");
  });

  test("2. User can drag drop IMAGE widget to the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-image");
  });

  test("3. User can drag drop DATA GRID widget to the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-data-grid");
  });

  test("4. User can drag drop BUTTON widget to the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-button");
  });

  test("5. User can drag drop NUMBER BOX widget to the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-number-box");
  });

  test("6. User can drag drop TREE VIEW widget to the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-tree-view");
  });

  test("7. User can drag drop TAB PANEL widget to the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-tab-panel");
  });

  test("8. User can drag drop SELECT BOX widget to the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-select-box");
  });

  test("9. User can drag drop TEXT BOX widget to the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-text-box");
  });
});

test.afterEach(async ({ page }, testInfo) => {
  let widgetType: string;

  switch (testInfo.title) {
    case "1. User can drag drop CARD widget to the dashboard canvas":
      widgetType = "mi-card";
      break;

    case "2. User can drag drop IMAGE widget to the dashboard canvas":
      widgetType = "mi-image";
      break;

    case "3. User can drag drop DATA GRID widget to the dashboard canvas":
      widgetType = "mi-data-grid";
      break;

    case "4. User can drag drop BUTTON widget to the dashboard canvas":
      widgetType = "mi-button";
      break;

    case "5. User can drag drop NUMBER BOX widget to the dashboard canvas":
      widgetType = "mi-number-box";
      break;

    case "6. User can drag drop TREE VIEW widget to the dashboard canvas":
      widgetType = "mi-tree-view";
      break;

    case "7. User can drag drop SELECT BOX widget to the dashboard canvas":
      widgetType = "mi-select-box";
      break;

    case "8. User can drag drop TEXT BOX widget to the dashboard canvas":
      widgetType = "mi-text-box";
      break;

    default:
      throw new Error(`Widget type is not defined for test: ${testInfo.title}`);
  }

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Verify that the dragged widget exists on the dashboard.
  const widget = page.locator(
    `.grid-stack-item[data-widget-type="${widgetType}"][data-widget-uuid]`,
  );

  await expect(widget).toBeVisible();

  await goToHomeAndVerify(page, dashboardName);
});
