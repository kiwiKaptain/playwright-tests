
import { expect, test } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import {
  login,
  ensureDashboardExists,
  openEditorAndClearCanvas,
  goToHomeAndVerify,
} from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;

test.describe("DRAG AND DROP - GAUGE WIDGETS", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);

    await login(page);

    const dashboardCard = await ensureDashboardExists(
      page,
      dashboardName,
    );

    await openEditorAndClearCanvas(page, dashboardCard);
  });

  // GAUGE WIDGET drag drop test cases
  test(
    "1. User can drag drop BAR GAUGE widget from the widget panel onto the dashboard canvas",
    async ({ page }) => {
      await dragAndDropWidget(page, "mi-bar-gauge");
    },
  );

  test(
    "2. User can drag drop CIRCULAR GAUGE widget from the widget panel onto the dashboard canvas",
    async ({ page }) => {
      await dragAndDropWidget(page, "mi-circular-gauge");
    },
  );

  test(
    "3. User can drag drop LINEAR GAUGE widget from the widget panel onto the dashboard canvas",
    async ({ page }) => {
      await dragAndDropWidget(page, "mi-linear-gauge");
    },
  );
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
      widgetType = "mi-bar-gauge";
      break;

    case "2":
      widgetType = "mi-circular-gauge";
      break;

    case "3":
      widgetType = "mi-linear-gauge";
      break;

    default:
      throw new Error(
        `Widget type is not defined for test number: ${testNumber}`,
      );
  }

  // Save the dashboard after the widget is added.
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Verify that the dragged widget exists on the dashboard.
  const widget = page.locator(
    `.grid-stack-item[data-widget-type="${widgetType}"][data-widget-uuid]`,
  );

  await expect(widget).toBeVisible();

  // Navigate back to the dashboard and verify it loads successfully.
  await goToHomeAndVerify(page, dashboardName);
});

