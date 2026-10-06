import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setLayoutAndSpacing, setAppearance, setTitleProperties, setSubtitleProperties, setLegendProperties, setTooltipProperties, setXAxisTitleProperties, setYAxisTitleProperties, setXAxisLabelProperties, setYAxisLabelProperties, setXAxisTickProperties, setYAxisTickProperties, setXAxisGridProperties, setYAxisGridProperties, setMinorGridProperties, setActionsProperties, setRunTimeFilter, setSeriesType, setColorTheme, setRotated, setActionsToNone } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid, resizeWidget, setupWidgets } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { AREACHART: "mi-area-chart" } as const;
test.describe("PROPERTIES - AREA-CHART Widget", () => {

test.beforeEach(async ({ page }) => {
   test.setTimeout(120000);
  await login(page);
  const dashboardCard = await ensureDashboardExists(page, dashboardName);
  await openEditorAndClearCanvas(page, dashboardCard);
   // Create ONLY 1 AREACHART
  await setupWidgets(
    page,
    WIDGETS.AREACHART,
    1
  );
});

test.afterEach(async ({ page }) => {
  await goToHomeAndVerify(page, dashboardName);
});
 
  test("1.User can change LAYOUT & SPACING properties for area chart widget", async ({
    page,
  }) => {
    // Update Layout & Spacing
    await setLayoutAndSpacing(page, "10", "15", "20", "25");
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);
    const targetWidgetContent = targetWidget.locator(
      ".grid-stack-item-content",
    );
    await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
    await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
    await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
    await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
  });
  test("2.User can change APPEARANCE properties for area chart widget", async ({
    page,
  }) => {

    await setAppearance(page, "rgb(229, 214, 73)");
   await setRunTimeFilter (page);
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Verify background color - look for the container with the background
    const bgContainer = targetWidget.locator(".mi-area-chart-container");

    // Wait for the container to be visible
    await bgContainer.waitFor({ state: "visible" });

    // Check the background color
    await expect(bgContainer).toHaveCSS(
      "background-color",
      "rgb(229, 214, 73)",
    );
    // Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');

  await expect(runtimeFilter).toBeVisible();

  });
  test("3.User can change GENERAL properties for area chart widget", async ({
    page,
  }) => {
    await setSeriesType(page, "steparea");
await setColorTheme(page, "Carmine");
await setRotated(page);
   
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);
  const chart = targetWidget.locator("svg.dxc-chart");

  await expect(chart).toBeVisible();

  // --------------------------------------------------
  // Verify Series Type = Step Area
  // --------------------------------------------------

  const series = chart.locator("g.dxc-series");

  await expect(series).toHaveCount(3);

  const areaElements = series.locator("g.dxc-elements");

  await expect(areaElements).toHaveCount(3);

  // Verify step-area paths are rendered
  for (let i = 0; i < 3; i++) {
    const areaPath = areaElements.nth(i).locator("path");

    await expect(areaPath).toBeVisible();

    // Step Area contains horizontal/vertical segments
    await expect(areaPath).toHaveAttribute("d", /M.*L.*L/);
  }

  // --------------------------------------------------
  // Verify Carmine Color Theme
  // --------------------------------------------------

  await expect(areaElements.nth(0)).toHaveAttribute(
    "fill",
    "#fb7764"
  );

  await expect(areaElements.nth(1)).toHaveAttribute(
    "fill",
    "#73d47f"
  );

  await expect(areaElements.nth(2)).toHaveAttribute(
    "fill",
    "#fed85e"
  );

  // --------------------------------------------------
  // Verify Rotated
  // --------------------------------------------------

  // When rotated:
  // Category values (years) are on the Y-axis
  // Numeric values are on the X-axis.

  const argumentAxisLabels =
    chart.locator(".dxc-arg-elements text");

  const valueAxisLabels =
    chart.locator(".dxc-val-elements text");

  // Verify category/year values are on Y-axis
  await expect(argumentAxisLabels.first()).toHaveText("2015");
  await expect(argumentAxisLabels.last()).toHaveText("2019");

  // Verify numeric values are on X-axis
  await expect(valueAxisLabels.first()).toHaveText("0");
  await expect(valueAxisLabels.last()).toHaveText("1.0K");
   
  });
  test("4.User can change TITLE properties for area chart widget", async ({
    page,
  }) => {
    await setTitleProperties(
      page,
      "Test Title",
      "rgb(36, 32, 232)",
      "24",
      "500",
      "bottom",
      "right",
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Verify background color - look for the container with the background
    const bgContainer = targetWidget.locator(".mi-area-chart-container");

    // Wait for the container to be visible
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY TITLE PROPERTIES ============

    // 1. Verify the Title text appears in the SVG
    const titleText = targetWidget.locator(".dxc-title text");
    await expect(titleText).toHaveText("Test Title");

    // 2. Verify Text Color
    await expect(titleText).toHaveCSS("fill", "rgb(36, 32, 232)");

    // 3. Verify Text Size - 24px
    await expect(titleText).toHaveCSS("font-size", "24px");

    // 4. Verify Boldness - font-weight 500
    await expect(titleText).toHaveCSS("font-weight", "500");
    // Check if the widget has data attributes for alignment
    expect(titleText).toHaveAttribute("text-anchor", "end");

    // 6. Verify Vertical Position - Align Bottom
    const titleGroup = targetWidget.locator(".dxc-title");
    const transform = await titleGroup.getAttribute("transform");
    const yMatch = transform?.match(/translate\(\d+,\s*(\d+)\)/);

    if (yMatch) {
      const yPosition = parseInt(yMatch[1]);

      // Get the SVG height
      const svg = targetWidget.locator(".dxc-chart");
      const svgHeight = await svg.getAttribute("height");

      if (svgHeight) {
        const chartHeight = parseInt(svgHeight);
        // For bottom alignment, Y should be near the bottom of the SVG
        //For example: Y=252, Height=291 (difference of 39)
        // So we check if Y is within 50px of the bottom
        expect(yPosition).toBeGreaterThan(chartHeight - 50);
        console.log(
          `Vertical Position (Bottom): Y=${yPosition}, SVG Height=${chartHeight}`,
        );
      }
    }
  });
  test("5.User can change SUBTITLE properties for area chart widget", async ({
    page,
  }) => {
    const titleTextLabel = page.getByTestId("prop-label-title-text");

if ((await titleTextLabel.count()) === 0) {
  throw new Error("Test ID prop-label-title-text not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
}

await titleTextLabel.click();

const titleTextInput = page.getByTestId("prop-input-title-text");

if ((await titleTextInput.count()) === 0) {
  throw new Error("Test ID prop-input-title-text not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
}

await titleTextInput.click();
await titleTextInput.press("ControlOrMeta+A");
await titleTextInput.fill("Test Title");
await titleTextInput.press("Enter");

    await setSubtitleProperties(
      page,
      "Test Subtitle",
      "rgb(255, 99, 132)",
      "24",
      "700",
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Verify background color - look for the container with the background
    const bgContainer = targetWidget.locator(".mi-area-chart-container");

    // Wait for the container to be visible
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY SUBTITLE PROPERTIES ============

    // Get all text elements inside dxc-title
    const titleGroup = targetWidget.locator(".dxc-title");
    const allTexts = titleGroup.locator("text");
    const titleText = allTexts.nth(0);
    const subtitleText = allTexts.nth(1);

    // 1. Verify Subtitle Text
    await expect(subtitleText).toHaveText("Test Subtitle");

    // 2. Verify Subtitle Text Color
    await expect(subtitleText).toHaveCSS("fill", "rgb(255, 99, 132)");

    // 3. Verify Subtitle Text Size - 24px
    await expect(subtitleText).toHaveCSS("font-size", "24px");

    // 4. Verify Subtitle Boldness - font-weight 700
    await expect(subtitleText).toHaveCSS("font-weight", "700");

    await expect(subtitleText).toBeVisible();
  });
  test("6.User can change LEGEND properties for area chart widget", async ({
    page,
  }) => {
 
await setLegendProperties(
  page,
  true,
  true,
  "rgb(24, 206, 24)",
  "right",
  "bottom",
  "top",
  "rgb(32, 28, 243)",
  "18",
  "700",
  "rgb(250, 162, 136)",
  "outside"
);
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Verify background color - look for the container with the background
    const bgContainer = targetWidget.locator(".mi-area-chart-container");

    // Wait for the container to be visible
    await bgContainer.waitFor({ state: "visible" });

    // ============ COMPLETE VERIFICATION ============
    // Get the legend group
    const legendGroup = targetWidget.locator(".dxc-legend");

    // 1. Verify Legend is visible (enabled)
    await expect(legendGroup).toBeVisible();

    // 2. Verify Legend Background Color
    const legendRect = legendGroup.locator("rect.dxc-border");
    await expect(legendRect).toHaveCSS("fill", "rgb(250, 162, 136)");

    // 3. Verify Legend Border Color
    await expect(legendRect).toHaveCSS("stroke", "rgb(24, 206, 24)");

    // 4. Verify Legend Border Width - 1px
    await expect(legendRect).toHaveCSS("stroke-width", "1px");

    // 5. Verify Text Color
    const legendTexts = legendGroup.locator("text");
    await expect(legendTexts.first()).toHaveCSS("fill", "rgb(32, 28, 243)");

    // 6. Verify Text Size
    await expect(legendTexts.first()).toHaveCSS("font-size", "18px");

    // 7. Verify Boldness
    await expect(legendTexts.first()).toHaveCSS("font-weight", "700");

    // 8. Verify Text Position
    await expect(legendTexts.first()).toHaveAttribute("text-anchor", "middle");

    // 9. Verify Box Position

    const innerLegendGroup = legendGroup.locator("g[transform]").first();
    const innerTransform = await innerLegendGroup.getAttribute("transform");

    if (innerTransform) {
      const match = innerTransform.match(/translate\((\d+),\s*(\d+)\)/);
      if (match) {
        const xPosition = parseInt(match[1]);
        const yPosition = parseInt(match[2]);

        // Get chart dimensions
        const svg = targetWidget.locator(".dxc-chart");
        const svgWidth = await svg.getAttribute("width");
        const svgHeight = await svg.getAttribute("height");

        if (svgWidth && svgHeight) {
          const chartWidth = parseInt(svgWidth);
          const chartHeight = parseInt(svgHeight);

          expect(xPosition).toBeGreaterThan(50);
          expect(xPosition).toBeLessThan(chartWidth - 50);
          expect(yPosition).toBeGreaterThan(50);
          expect(yPosition).toBeLessThan(chartHeight - 50);

          expect(xPosition).toBeGreaterThan(chartWidth - 200);
          expect(xPosition).toBeLessThan(chartWidth - 20);

          expect(yPosition).toBeLessThan(chartHeight - 150);
        }
      }
    }
  });
  test("7.User can change TOOLTIP properties for area chart widget", async ({
    page,
  }) => {
    await setTooltipProperties(
      page,
      "rgb(245, 241, 44)",
      "18",
      "700",
      "rgb(76, 41, 233)",
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Verify background color
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY TOOLTIP PROPERTIES ============

    const tooltipGroup = targetWidget.locator(".dxc-tooltip");

    // Verify Tooltip is visible (enabled) - hover over a chart element to trigger tooltip
    // First, hover over a bar in the chart to make tooltip appear
    const chartBars = targetWidget.locator(".dxc-markers rect");
    if ((await chartBars.count()) > 0) {
      await chartBars.first().hover();
      // Wait for tooltip to appear
      await page.waitForTimeout(500);
    }

    //. Verify Tooltip Text Color - rgb(245, 241, 44) - Yellow
    const tooltipTexts = tooltipGroup.locator("text");
    if ((await tooltipTexts.count()) > 0) {
      await expect(tooltipTexts.first()).toHaveCSS("fill", "rgb(245, 241, 44)");
    }

    //  Verify Tooltip Text Size - 18px
    if ((await tooltipTexts.count()) > 0) {
      await expect(tooltipTexts.first()).toHaveCSS("font-size", "18px");
    }

    //Verify Tooltip Boldness - font-weight 700
    if ((await tooltipTexts.count()) > 0) {
      await expect(tooltipTexts.first()).toHaveCSS("font-weight", "700");
    }

    //  Verify Tooltip Background Color - rgb(76, 41, 233) - Purple/Blue
    const tooltipBg = tooltipGroup.locator("rect").first();
    if ((await tooltipBg.count()) > 0) {
      await expect(tooltipBg).toHaveCSS("fill", "rgb(76, 41, 233)");
    }
  });
  test("8.User can change X-AXIS TITLE properties for area chart widget", async ({
    page,
  }) => {
    await setXAxisTitleProperties(
      page,
      "X-Axis Sample Title",
      "rgb(255, 0, 0)",
      "20",
      "700",
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS TITLE PROPERTIES ============

    // Look for x-axis title
    const xAxisTitle = targetWidget.locator(
      ".dxc-arg-axis .dxc-arg-title text",
    );

    // 1. Verify X-Axis Title exists
    await expect(xAxisTitle).toHaveCount(1);

    // 2. Verify X-Axis Title Text
    await expect(xAxisTitle).toHaveText("X-Axis Sample Title");

    // 3. Verify X-Axis Title Text Color
    await expect(xAxisTitle).toHaveCSS("fill", "rgb(255, 0, 0)");

    // 4. Verify X-Axis Title Text Size
    await expect(xAxisTitle).toHaveCSS("font-size", "20px");

    // 5. Verify X-Axis Title Boldness
    await expect(xAxisTitle).toHaveCSS("font-weight", "700");
  });
  test("9. User can change Y-AXIS TITLE properties for area chart widget", async ({
    page,
  }) => {
    await setYAxisTitleProperties(
      page,
      "Y-Axis Sample Title",
      "rgb(0, 0, 255)",
      "20",
      "700",
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS TITLE PROPERTIES ============

    // Look for y-axis title - vertical axis
    const yAxisTitle = targetWidget.locator(
      ".dxc-val-axis .dxc-val-title text",
    );

    // 2. Verify Y-Axis Title Text
    await expect(yAxisTitle).toHaveText("Y-Axis Sample Title");

    // 3. Verify Y-Axis Title Text Color - rgb(0, 0, 255) - Blue
    await expect(yAxisTitle).toHaveCSS("fill", "rgb(0, 0, 255)");

    // 4. Verify Y-Axis Title Text Size - 20px
    await expect(yAxisTitle).toHaveCSS("font-size", "20px");

    // 5. Verify Y-Axis Title Boldness - font-weight 700
    await expect(yAxisTitle).toHaveCSS("font-weight", "700");

    // 6. Verify Y-Axis Title is visible
    await expect(yAxisTitle).toBeVisible();
  });
  test("10. User can change X-AXIS LABEL properties for area chart widget", async ({
    page,
  }) => {
    await setXAxisLabelProperties(page, "rgb(255, 165, 0)", "16", "700");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS LABEL PROPERTIES ============

    // X-Axis labels are the text elements in the arg-axis (horizontal axis)
    const xAxisLabels = targetWidget.locator(
      ".dxc-arg-axis .dxc-arg-elements text",
    );
    const labelCount = await xAxisLabels.count();

    // 2. Verify X-Axis Label Text Color - rgb(255, 165, 0) - Orange (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(xAxisLabels.nth(i)).toHaveCSS("fill", "rgb(255, 165, 0)");
    }

    // 3. Verify X-Axis Label Text Size - 16px (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(xAxisLabels.nth(i)).toHaveCSS("font-size", "16px");
    }

    // 4. Verify X-Axis Label Boldness - font-weight 700 (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(xAxisLabels.nth(i)).toHaveCSS("font-weight", "700");
    }
  });
  test("11. User can change Y-AXIS LABEL properties for area chart widget", async ({
    page,
  }) => {
    await setYAxisLabelProperties(page, "rgb(255, 165, 0)", "16", "700");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS LABEL PROPERTIES ============

    // X-Axis labels are the text elements in the arg-axis (horizontal axis)
    const yAxisLabels = targetWidget.locator(
      ".dxc-arg-axis .dxc-arg-elements text",
    );
    const labelCount = await yAxisLabels.count();

    // 2. Verify X-Axis Label Text Color - rgb(255, 165, 0) - Orange (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(yAxisLabels.nth(i)).toHaveCSS("fill", "rgb(255, 165, 0)");
    }

    // 3. Verify X-Axis Label Text Size - 16px (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(yAxisLabels.nth(i)).toHaveCSS("font-size", "16px");
    }

    // 4. Verify X-Axis Label Boldness - font-weight 700 (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(yAxisLabels.nth(i)).toHaveCSS("font-weight", "700");
    }
  });
  test("12. User can change X-AXIS TICK properties for area chart widget", async ({
    page,
  }) => {
    await setXAxisTickProperties(page, "rgb(255, 0, 255)");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS TICK PROPERTIES ============

    const xAxisTicks = targetWidget.locator(
      '.dxc-arg-axis .dxc-arg-line path[opacity="1"]',
    );

    const tickCount = await xAxisTicks.count();
    expect(tickCount).toBeGreaterThan(0);

    for (let i = 0; i < tickCount; i++) {
      const stroke = await xAxisTicks.nth(i).getAttribute("stroke");
      expect(stroke).toContain("255, 0, 255");
    }

    console.log(
      ` All ${tickCount} X-Axis tick properties verified successfully!`,
    );
  });
  test("13. User can change Y-AXIS TICK properties for area chart widget", async ({
    page,
  }) => {
    await setYAxisTickProperties(page, "rgb(43, 255, 0)");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS TICK PROPERTIES ============

    const yAxisTicks = targetWidget.locator(
      '.dxc-val-axis .dxc-val-line path[opacity="1"]',
    );

    const tickCount = await yAxisTicks.count();
    expect(tickCount).toBeGreaterThan(0);

    for (let i = 0; i < tickCount; i++) {
      const stroke = await yAxisTicks.nth(i).getAttribute("stroke");
      expect(stroke).toContain("43, 255, 0");
    }
  });

  test("14. User can change X-AXIS GRID properties for area chart widget", async ({
    page,
  }) => {
    await setXAxisGridProperties(page, "rgb(2, 240, 172)");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS GRID PROPERTIES ============

    // X-Axis grid lines are usually path elements with stroke
    const xAxisGrid = targetWidget.locator(
      ".dxc-arg-grid path, .dxc-arg-grid line",
    );

    const gridCount = await xAxisGrid.count();

    // 1. Verify X-Axis Grid lines exist
    expect(gridCount).toBeGreaterThan(0);

    // 2. Verify X-Axis Grid Color
    for (let i = 0; i < gridCount; i++) {
      const stroke = await xAxisGrid.nth(i).getAttribute("stroke");
      expect(stroke).toContain("2, 240, 172");
    }
  });
  test("15. User can change Y-AXIS GRID properties for area chart widget", async ({
    page,
  }) => {
    await setYAxisGridProperties(page, "rgb(2, 240, 172)");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS GRID PROPERTIES ============

    // Y-Axis grid lines are usually path elements with stroke
    const yAxisGrid = targetWidget.locator(
      ".dxc-val-grid path, .dxc-val-grid line",
    );

    const gridCount = await yAxisGrid.count();

    // 1. Verify Y-Axis Grid lines exist
    expect(gridCount).toBeGreaterThan(0);

    // 2. Verify Y-Axis Grid Color
    for (let i = 0; i < gridCount; i++) {
      const stroke = await yAxisGrid.nth(i).getAttribute("stroke");
      expect(stroke).toContain("2, 240, 172");
    }
  });
  test("16. User can change MINOR GRID properties for area chart widget", async ({
    page,
  }) => {
    await setMinorGridProperties(page, "rgb(255, 165, 0)");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-area-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY y-AXIS MINOR GRID PROPERTIES ============

    const yAxisMinorGrid = targetWidget.locator(
      ".dxc-val-grid path, .dxc-val-grid line",
    );

    const gridCount = await yAxisMinorGrid.count();

    //  Verify Y-Axis Minor Grid lines exist
    expect(gridCount).toBeGreaterThan(0);

    for (let i = 0; i < gridCount; i++) {
      const stroke = await yAxisMinorGrid.nth(i).getAttribute("stroke");
      expect(stroke).toContain("255, 165, 0");
    }
  });



  test("17 .User can change Link Dashboard via ACTIONS properties for AREA Chart widget", async ({
      page,
    }) => {
      // Update ACTIONS
  
      await setActionsProperties(
        page,
        TEST_DATA.dashboards.dashboardNameForActionPropertyTesting,
      );
      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();
      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();
  
      // Verify current dashboard
      await expect(
        page.locator(
          '//div[@class="flex items-center space-x-1 md:space-x-2"]/p',
        ),
      ).toContainText(TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting);
      // Fetch the parent container widget using the dynamic helper function
      const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.AREACHART);
      await cardWidget.click();
  
      // Verify the linked dashboard is opened
      await expect(
        page.locator('//p[contains(@class,"truncate")]'),
      ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
    });
    test("18. User can set the action type to NONE for Area Chart widget", async ({
          page,
        }) => {
          // Update ACTIONS to None
          await setActionsToNone(
            page,
           
          );
      
          // Switch to Viewer
          await page.locator("label").filter({ hasText: "Viewer" }).click();
      
          // Save
          await page.getByRole("button", { name: "Save", exact: true }).click();
      
          // Verify current dashboard
          await expect(
            page.locator(
              '//div[@class="flex items-center space-x-1 md:space-x-2"]/p',
            ),
          ).toContainText(
            TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
          );
      
          // Fetch the parent container widget using the dynamic helper function
          const cardWidget = await getDroppedWidgetByUuid(
            page,
            WIDGETS.AREACHART,
          );
          await cardWidget.click();
      
          // Verify the None Action
          await expect(
            page.locator('//p[contains(@class,"truncate")]'),
          ).toContainText(TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting);
        });
});
