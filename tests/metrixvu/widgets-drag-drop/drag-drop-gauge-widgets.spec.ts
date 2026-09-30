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

test.describe("DRAG AND DROP - GAUGE WIDGETS", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);

    const dashboardCard = await ensureDashboardExists(
      page,
      dashboardName,
    );

    await openEditorAndClearCanvas(page, dashboardCard);
  });

   test("1. User can drag drop BAR GAUGE widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-bar-gauge");
    });
    test("2. User can drag drop CIRCULAR GAUGE widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-circular-gauge");
    });
    test("3. User can drag drop LINEAR GAUGE widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-linear-gauge");
    });
   
});

test.afterEach(async ({ page }, testInfo) => {
  let widgetType: string;

  switch (testInfo.title) {
    case "1. User can drag drop BAR GAUGE widget to the dashboard canvas":
      widgetType = "mi-bar-gauge";
      break;

    case "2. User can drag drop CIRCULAR GAUGE widget to the dashboard canvas":
      widgetType = "mi-circular-gauge";
      break;

    case "3. User can drag drop LINEAR GAUGE widget to the dashboard canvas":
      widgetType = "mi-linear-gauge";
      break;

    default:
      throw new Error(
        `Widget type is not defined for test: ${testInfo.title}`,
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