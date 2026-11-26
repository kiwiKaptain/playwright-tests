import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import {
  setActionsProperties,
  setAppearance,
  setWidgetWidth,
  setColorTheme,
  setLayoutAndSpacing,
  setLegendProperties,
  setMinorGridProperties,
  setRotated,
  setRunTimeFilter,
  setSeriesType,
  setSubtitleProperties,
  setTitleProperties,
  setTooltipProperties,
  setXAxisGridProperties,
  setXAxisLabelProperties,
  setXAxisTickProperties,
  setXAxisTitleProperties,
  setYAxisGridProperties,
  setYAxisLabelProperties,
  setYAxisTickProperties,
  setYAxisTitleProperties,

} from "../../CommonHelperFunctions/commonPropertiesHelpers";
import {
  login,
  ensureDashboardExists,
  openEditorAndClearCanvas,
  goToHomeAndVerify,
  turnDarkMode,
} from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import {
  getDroppedWidgetByUuid,
  setupWidgets,
} from "../../CommonHelperFunctions/commonWidgetSetupHelpers";

const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { LINECHART: "mi-line-chart" } as const;

/**
 * Standard Viewport Breakpoints
 */
const VIEWPORTS = {
  DESKTOP_LARGE: { width: 1920, height: 1080 },
  DESKTOP_STANDARD: { width: 1280, height: 720 },
  TABLET_LANDSCAPE: { width: 1024, height: 768 },
  TABLET_PORTRAIT: { width: 768, height: 1024 },
  MOBILE_LARGE: { width: 414, height: 896 },
  MOBILE_STANDARD: { width: 375, height: 667 },
};

/**
 * Helper to apply maximum visual and chart properties in Edit mode,
 * then switch to Viewer mode and Save.
 */
async function applyMaximumLineChartProperties(page: Page) {
  // 1. Layout & Spacing
  await setLayoutAndSpacing(page, "10", "15", "20", "25");

  // 2. Appearance (Background Color)
  await setAppearance(page, "rgb(229, 214, 73)");

  // 3. General ( Width=12, Carmine Color Theme, Rotated)
 
  await setWidgetWidth(page, "12");
  await setColorTheme(page, "Carmine");
  await setRotated(page);

  // 4. Title
  await setTitleProperties(
    page,
    "Responsive Test Title",
    "rgb(36, 32, 232)",
    "20",
    "500",
    "bottom",
    "right"
  );

  // 5. Subtitle
  const titleTextLabel = page.getByTestId("prop-label-title-text");
  if ((await titleTextLabel.count()) > 0) {
    await titleTextLabel.click();
    const titleTextInput = page.getByTestId("prop-input-title-text");
    if ((await titleTextInput.count()) > 0) {
      await titleTextInput.click();
      await titleTextInput.press("ControlOrMeta+A");
      await titleTextInput.fill("Responsive Test Title");
      await titleTextInput.press("Enter");
    }
  }
  await setSubtitleProperties(
    page,
    "Responsive Subtitle",
    "rgb(255, 99, 132)",
    "16",
    "700"
  );

  // 6. Legend
  await setLegendProperties(
    page,
    true,
    true,
    "rgb(24, 206, 24)",
    "right",
    "bottom",
    "top",
    "rgb(32, 28, 243)",
    "14",
    "700",
    "rgb(250, 162, 136)",
    "outside"
  );

  // 7. X-Axis Title & Label & Ticks & Grids
  await setXAxisTitleProperties(
    page,
    "X-Axis Sample Title",
    "rgb(255, 0, 0)",
    "16",
    "700"
  );
  await setXAxisLabelProperties(page, "rgb(255, 165, 0)", "14", "700");
  await setXAxisTickProperties(page, "rgb(255, 0, 255)");
  await setXAxisGridProperties(page, "rgb(2, 240, 172)");

  // 8. Y-Axis Title & Label & Ticks & Grids & Minor Grid
  await setYAxisTitleProperties(
    page,
    "Y-Axis Sample Title",
    "rgb(0, 0, 255)",
    "16",
    "700"
  );
  await setYAxisLabelProperties(page, "rgb(255, 165, 0)", "14", "700");
  await setYAxisTickProperties(page, "rgb(43, 255, 0)");
  await setYAxisGridProperties(page, "rgb(2, 240, 172)");
  await setMinorGridProperties(page, "rgb(255, 165, 0)");

  // 9. Tooltip
  await setTooltipProperties(
    page,
    "rgb(245, 241, 44)",
    "14",
    "700",
    "rgb(76, 41, 233)"
  );

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();
}

/**
 * Common verification assertions to ensure the widget layout and properties
 * adapt smoothly to the current viewport without clipping or breaking.
 */
async function verifyResponsiveWidgetAndProperties(
  page: Page,
  expectedViewport: { width: number; height: number }
) {
  const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);
  const bgContainer = targetWidget.locator(".mi-line-chart-container");
  const chartSvg = targetWidget.locator("svg.dxc-chart");

  // 1. Wait for container & chart SVG to be visible
  await expect(bgContainer).toBeVisible();
  await expect(chartSvg).toBeVisible();

  // 2. Verify widget width fits inside the viewport (no horizontal overflow outside the screen)
  const widgetBox = await targetWidget.boundingBox();
  expect(widgetBox).not.toBeNull();
  expect(widgetBox!.width).toBeLessThanOrEqual(expectedViewport.width);

  // 3. Verify SVG dimensions are positive and within the widget boundary
  const svgBox = await chartSvg.boundingBox();
  expect(svgBox).not.toBeNull();
  expect(svgBox!.width).toBeGreaterThan(0);
  expect(svgBox!.height).toBeGreaterThan(0);
  expect(svgBox!.width).toBeLessThanOrEqual(widgetBox!.width + 5);

  // 4. Verify Layout Padding is preserved
  const targetWidgetContent = targetWidget.locator(".grid-stack-item-content");
  await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
  await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
  await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
  await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");

  // 5. Verify Background Color is preserved
  await expect(bgContainer).toHaveCSS("background-color", "rgb(229, 214, 73)");

  // 6. Verify Title & Subtitle are rendered
  const titleText = targetWidget.locator(".dxc-title text").first();
  await expect(titleText).toHaveText("Responsive Test Title");

  const subtitleText = targetWidget.locator(".dxc-title text").nth(1);
  await expect(subtitleText).toHaveText("Responsive Subtitle");



  // 7. Verify Legend is visible
  // const legendGroup = targetWidget.locator(".dxc-legend");
  // await expect(legendGroup).toBeVisible();

  // // 8. Verify Grid Lines are rendered
  // const yAxisGrid = targetWidget.locator(".dxc-val-grid path, .dxc-val-grid line");
  // expect(await yAxisGrid.count()).toBeGreaterThan(0);
}

test.describe("RESPONSIVENESS - LINE-CHART Widget Properties", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    await login(page);
    const dashboardCard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, dashboardCard);

    // Create 1 Line Chart
    await setupWidgets(page, WIDGETS.LINECHART, 1);
  });

  

  // =========================================================================
  // LIGHT MODE RESPONSIVENESS
  // =========================================================================

  test("1. User can verify Line Chart with configured properties on Desktop Large (1920x1080) in Light Mode", async ({
    page,
  }) => {
    await applyMaximumLineChartProperties(page);
    await page.setViewportSize(VIEWPORTS.DESKTOP_LARGE);
    await page.waitForTimeout(1000);

    await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.DESKTOP_LARGE);
  });

  test("2. User can verify Line Chart with configured properties on Desktop Standard (1280x720) in Light Mode", async ({
    page,
  }) => {
    await applyMaximumLineChartProperties(page);
    await page.setViewportSize(VIEWPORTS.DESKTOP_STANDARD);
    await page.waitForTimeout(1000);

    await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.DESKTOP_STANDARD);
  });

  test("3. User can verify Line Chart with configured properties on Tablet Landscape (1024x768) in Light Mode", async ({
    page,
  }) => {
    await applyMaximumLineChartProperties(page);
    await page.setViewportSize(VIEWPORTS.TABLET_LANDSCAPE);
    await page.waitForTimeout(1000);

    await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.TABLET_LANDSCAPE);
  });

  test("4. User can verify Line Chart with configured properties on Tablet Portrait (768x1024) in Light Mode", async ({
    page,
  }) => {
    await applyMaximumLineChartProperties(page);
    await page.setViewportSize(VIEWPORTS.TABLET_PORTRAIT);
    await page.waitForTimeout(1000);

    await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.TABLET_PORTRAIT);
  });

  test("5. User can verify Line Chart with configured properties on Mobile  (414x896) in Light Mode", async ({
    page,
  }) => {
    await applyMaximumLineChartProperties(page);
    await page.setViewportSize(VIEWPORTS.MOBILE_LARGE);
    await page.waitForTimeout(1000);

    await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.MOBILE_LARGE);
  });

  test("6. User can verify Line Chart with configured properties on Mobile Standard (375x667) in Light Mode", async ({
    page,
  }) => {
    await applyMaximumLineChartProperties(page);
    await page.setViewportSize(VIEWPORTS.MOBILE_STANDARD);
    await page.waitForTimeout(1000);

    await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.MOBILE_STANDARD);
  });

 

  // // =========================================================================
  // // DARK MODE RESPONSIVENESS
  // // =========================================================================

  // test("7. User can verify Line Chart with configured properties on Desktop Large (1920x1080) in Dark Mode", async ({
  //   page,
  // }) => {
  //   await turnDarkMode(page);
  //   await applyMaximumLineChartProperties(page);
  //   await page.setViewportSize(VIEWPORTS.DESKTOP_LARGE);
  //   await page.waitForTimeout(1000);

  //   await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.DESKTOP_LARGE);
  // });

  // test("8. User can verify Line Chart with configured properties on Desktop Standard (1280x720) in Dark Mode", async ({
  //   page,
  // }) => {
  //   await turnDarkMode(page);
  //   await applyMaximumLineChartProperties(page);
  //   await page.setViewportSize(VIEWPORTS.DESKTOP_STANDARD);
  //   await page.waitForTimeout(1000);

  //   await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.DESKTOP_STANDARD);
  // });

  // test("9. User can verify Line Chart with configured properties on Tablet Landscape (1024x768) in Dark Mode", async ({
  //   page,
  // }) => {
  //   await turnDarkMode(page);
  //   await applyMaximumLineChartProperties(page);
  //   await page.setViewportSize(VIEWPORTS.TABLET_LANDSCAPE);
  //   await page.waitForTimeout(1000);

  //   await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.TABLET_LANDSCAPE);
  // });

  // test("10. User can verify Line Chart with configured properties on Tablet Portrait (768x1024) in Dark Mode", async ({
  //   page,
  // }) => {
  //   await turnDarkMode(page);
  //   await applyMaximumLineChartProperties(page);
  //   await page.setViewportSize(VIEWPORTS.TABLET_PORTRAIT);
  //   await page.waitForTimeout(1000);

  //   await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.TABLET_PORTRAIT);
  // });

  // test("11. User can verify Line Chart with configured properties on Mobile Large (414x896) in Dark Mode", async ({
  //   page,
  // }) => {
  //   await turnDarkMode(page);
  //   await applyMaximumLineChartProperties(page);
  //   await page.setViewportSize(VIEWPORTS.MOBILE_LARGE);
  //   await page.waitForTimeout(1000);

  //   await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.MOBILE_LARGE);
  // });

  // test("12. User can verify Line Chart with configured properties on Mobile Standard (375x667) in Dark Mode", async ({
  //   page,
  // }) => {
  //   await turnDarkMode(page);
  //   await applyMaximumLineChartProperties(page);
  //   await page.setViewportSize(VIEWPORTS.MOBILE_STANDARD);
  //   await page.waitForTimeout(1000);

  //   await verifyResponsiveWidgetAndProperties(page, VIEWPORTS.MOBILE_STANDARD);
  // });
});
