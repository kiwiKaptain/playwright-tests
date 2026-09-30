import { expect, test } from "@playwright/test";
import { TEST_DATA } from "../testData";
import {
  login,
  ensureDashboardExists,
  openEditorAndClearCanvas,
} from "../commonDashboardSetupHelpers";
import { dragAndDropWidget } from "../commonDragDropHelpers";
import { goToHomeAndVerify } from "../commonDashboardSetupHelpers";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;

test.describe("DRAG AND DROP - CHART WIDGETS", () => {
  test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
    await login(page);

    const dashboardCard = await ensureDashboardExists(
      page,
      dashboardName,
    );

    await openEditorAndClearCanvas(page, dashboardCard);
  });

  // CHART WIDGET drag drop test cases
  test("1. User can drag drop SPARKLINE widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-sparkline");
    });
    test("2. User can drag drop BAR-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-bar-chart");
    });
    test("3. User can drag drop LINE-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-line-chart");
    });
    test("4. User can drag drop AREA-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-area-chart");
    });
    test("5. User can drag drop PIE-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-pie-chart");
    });

    test("6. User can drag drop BUBBLE-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-bubble-chart");
    });
    test("7. User can drag drop POLAR-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-polar-chart");
    });

    test("8. User can drag drop SANKEY-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-sankey-chart");
    });
    test("9. User can drag drop FUNNEL-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-funnel-chart");
    });
    test("10. User can drag drop PYRAMID-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-pyramid-chart");
    });
    test("11. User can drag drop GANTT-CHART widget to the dashboard canvas", async ({
        page,
    }) => {
        await dragAndDropWidget(page, "mi-gantt-chart");
    });

});

test.afterEach(async ({ page }, testInfo) => {
  let widgetType: string;

  switch (testInfo.title) {
    case "1. User can drag drop SPARKLINE widget to the dashboard canvas":
      widgetType = "mi-sparkline";
      break;

    case "2. User can drag drop BAR-CHART widget to the dashboard canvas":
      widgetType = "mi-bar-chart";
      break;

    case "3. User can drag drop LINE-CHART widget to the dashboard canvas":
      widgetType = "mi-line-chart";
      break;

    case "4. User can drag drop AREA-CHART widget to the dashboard canvas":
      widgetType = "mi-area-chart";
      break;

    case "5. User can drag drop PIE-CHART widget to the dashboard canvas":
      widgetType = "mi-pie-chart";
      break;

    case "6. User can drag drop BUBBLE-CHART widget to the dashboard canvas":
      widgetType = "mi-bubble-chart";
      break;

    case "7. User can drag drop POLAR-CHART widget to the dashboard canvas":
      widgetType = "mi-polar-chart";
      break;

    case "8. User can drag drop SANKEY-CHART widget to the dashboard canvas":
      widgetType = "mi-sankey-chart";
      break;

    case "9. User can drag drop FUNNEL-CHART widget to the dashboard canvas":
      widgetType = "mi-funnel-chart";
      break;

    case "10. User can drag drop PYRAMID-CHART widget to the dashboard canvas":
      widgetType = "mi-pyramid-chart";
      break;

    case "11. User can drag drop GANTT-CHART widget to the dashboard canvas":
      widgetType = "mi-gantt-chart";
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
