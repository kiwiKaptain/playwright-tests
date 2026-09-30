import { expect, test } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import {
  login,
  ensureDashboardExists,
  openEditorAndClearCanvas,
} from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";
import { goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;

test.describe("DRAG AND DROP - BASIC WIDGETS", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await login(page);

    const dashboardCard = await ensureDashboardExists(page, dashboardName);

    await openEditorAndClearCanvas(page, dashboardCard);
  });

  // BASIC WIDGET drag drop test cases

  test("1. User can drag drop CARD widget from the widget panel onto the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-card");
  });

  test("2. User can drag drop IMAGE widget from the widget panel onto the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-image");
  });

  test("3. User can drag drop DATA GRID widget from the widget panel onto the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-data-grid");
  });

  test("4. User can drag drop BUTTON widget from the widget panel onto the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-button");
  });

  test("5. User can drag drop NUMBER BOX widget from the widget panel onto the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-number-box");
  });

  test("6. User can drag drop TREE VIEW widget from the widget panel onto the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-tree-view");
  });

  test("7. User can drag drop SELECT BOX widget from the widget panel onto the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-select-box");
  });

  test("8. User can drag drop TEXT BOX widget from the widget panel onto the dashboard canvas", async ({
    page,
  }) => {
    await dragAndDropWidget(page, "mi-text-box");
  });
});

test.afterEach(async ({ page }, testInfo) => {
  const testNumber = testInfo.title.match(/^\d+/)?.[0];
  if (!testNumber) {
    throw new Error(
      `Test number is missing from test title: ${testInfo.title}`,
    );
  }
  let widgetType: string;
  switch (testNumber) {
    case "1":
      widgetType = "mi-card";
      break;
    case "2":
      widgetType = "mi-image";
      break;
    case "3":
      widgetType = "mi-data-grid";
      break;
    case "4":
      widgetType = "mi-button";
      break;
    case "5":
      widgetType = "mi-number-box";
      break;
    case "6":
      widgetType = "mi-tree-view";
      break;
    case "7":
      widgetType = "mi-select-box";
      break;
    case "8":
      widgetType = "mi-text-box";
      break;
    default:
      throw new Error(
        `Widget type is not defined for test number: ${testNumber}`,
      );
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
