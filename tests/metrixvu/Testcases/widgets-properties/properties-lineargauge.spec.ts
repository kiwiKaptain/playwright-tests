import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import {
  setActionsProperties,
  setActionsToNone,
  setAppearance,
  setColorTheme,
  setLayoutAndSpacing,
  setRunTimeFilter,
  setSubtitleProperties,
  setTitleProperties,
  setTooltipProperties,
} from "../../CommonHelperFunctions/commonPropertiesHelpers";
import {
  login,
  ensureDashboardExists,
  openEditorAndClearCanvas,
  goToHomeAndVerify,
} from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import {
  getDroppedWidgetByUuid,
  setupWidgets,
} from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import {
  addGaugeRange,
  deleteGaugeRange,
  setGaugeRangeWidth,
  setGaugeScaleLabel,
  setGaugeScaleMinorTickProperties,
  setGaugeScaleRange,
  setGaugeScaleTickProperties,
  setGaugeValueIndicatorProperties,
  updateGaugeRange,
} from "../../CommonHelperFunctions/commonGaugePropertiesHelpers";
import {
  GaugeValueIndicatorLocators,
  RangeContainerLocators,
  ThresholdLocators
} from "../../Locators/commonGaugeLocators";
import { ScaleRangeLocators } from "../../Locators/commonLocators";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { LINEARGAUGE: "mi-linear-gauge" } as const;

test.describe("PROPERTIES - LINEAR-GAUGE Widget", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    await login(page);
    const dashboardCard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, dashboardCard);
    // Create ONLY 1 LINEARGAUGE
    await setupWidgets(page, WIDGETS.LINEARGAUGE, 1);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

  test("1. User can change LAYOUT & SPACING properties for linear gauge widget", async ({
    page,
  }) => {
    // Update Layout & Spacing
    await setLayoutAndSpacing(page, "10", "15", "20", "25");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );
    const targetWidgetContent = targetWidget.locator(
      ".grid-stack-item-content",
    );
    await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
    await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
    await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
    await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
  });

  test("2. User can change APPEARANCE properties for linear gauge widget", async ({
    page,
  }) => {
    await setAppearance(page, "rgb(229, 214, 73)");
    await setRunTimeFilter(page);

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    // Verify background color - look for the container with the background
    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");

    // Wait for the container to be visible
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    // Check the background color
    await expect(bgContainer).toHaveCSS(
      "background-color",
      "rgb(229, 214, 73)",
    );

    // Verify runtime filter is visible
    const runtimeFilter = targetWidget.locator('[title="Filter"]');
    await expect(runtimeFilter).toBeVisible();
  });

  test("3. User can change GEOMETRY  properties  for linear gauge widget", async ({
    page,
  }) => {
    await page.getByTestId("prop-input-geometry-orientation").click();
    // Select Vertical orientation from dropdown
    await page.getByText("vertical", { exact: true }).click();
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // Verify scale labels

    const gaugeSvg = bgContainer.locator("svg.dxg-linear-gauge");

    await expect(gaugeSvg).toBeVisible();

    // Verify scale axis is vertically oriented
    const scaleAxis = gaugeSvg.locator(".dxg-scale .dxg-axis");

    await expect(scaleAxis).toBeVisible();

    const axisTransform = await scaleAxis.getAttribute("transform");
    expect(axisTransform).toMatch(/^translate\(\s*[\d.]+\s*,\s*0\s*\)$/);

    // Verify scale labels are displayed vertically
    const scaleLabels = gaugeSvg.locator(
      ".dxg-scale-elements .dxg-elements text",
    );

    await expect(scaleLabels.nth(0)).toHaveText("0");
    await expect(scaleLabels.nth(1)).toHaveText("25");
    await expect(scaleLabels.nth(2)).toHaveText("50");
    await expect(scaleLabels.nth(3)).toHaveText("75");
    await expect(scaleLabels.nth(4)).toHaveText("100");

    // Verify each scale label has a different Y position,
    // confirming that the labels are arranged vertically.
    const yPositions: string[] = [];

    for (let i = 0; i < 5; i++) {
      yPositions.push((await scaleLabels.nth(i).getAttribute("y")) ?? "");
    }

    expect(new Set(yPositions).size).toBe(5);

    // Verify scale tick paths are vertical
    const scaleTickPaths = gaugeSvg.locator(
      ".dxg-scale .dxg-axis .dxg-line path",
    );

    const firstMajorTick = scaleTickPaths.first();
    const firstTickPath = await firstMajorTick.getAttribute("d");

    expect(firstTickPath).toMatch(/^M\s+0\s+[\d.]+\s+L\s+8\s+[\d.]+$/);
  });
  test("4. User can change TITLE properties for linear gauge widget", async ({
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

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // ============ VERIFY TITLE PROPERTIES ============

    // Title SVG text element
    const titleText = targetWidget.locator(".dxg-title text").first();
    const titleContainer = targetWidget.locator(".dxg-title").first();

    // 1. Verify Title text
    await expect(titleText).toHaveText("Test Title");

    // 2. Verify Text Color
    await expect(titleText).toHaveCSS("fill", "rgb(36, 32, 232)");

    // 3. Verify Text Size
    await expect(titleText).toHaveCSS("font-size", "24px");

    // 4. Verify Font Weight
    await expect(titleText).toHaveCSS("font-weight", "500");

    // 5. Verify Horizontal Alignment - Right
    // DevExtreme uses text-anchor="end" for right alignment
    await expect(titleText).toHaveAttribute("text-anchor", "end");

    // 6. Verify Vertical Alignment - Bottom
    // The title group is positioned using an SVG translate transform.
    // For bottom alignment, verify that the title group is positioned
    // close to the bottom portion of the gauge.

    const widgetBox = await targetWidget.boundingBox();
    const titleBox = await titleText.boundingBox();

    expect(widgetBox).toBeTruthy();
    expect(titleBox).toBeTruthy();

    if (widgetBox && titleBox) {
      const widgetBottom = widgetBox.y + widgetBox.height;
      const titleBottom = titleBox.y + titleBox.height;

      // Title should be positioned in the bottom portion of the widget
      expect(titleBottom).toBeGreaterThan(widgetBottom - 100);
    }
  });

  test("5. User can change SUBTITLE properties for linear gauge widget", async ({
    page,
  }) => {
   const titleTextLabel = page.getByTestId("prop-label-title-text");

if ((await titleTextLabel.count()) === 0) {
  throw new Error("Test ID prop-label-title-text not found.");
}

await titleTextLabel.click();

const titleTextInput = page.getByTestId("prop-input-title-text");

if ((await titleTextInput.count()) === 0) {
  throw new Error("Test ID prop-input-title-text not found.");
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

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // ============ VERIFY SUBTITLE PROPERTIES ============

    const subtitleText = targetWidget.locator(".dxg-title text").nth(1);

    // 1. Verify Subtitle is visible
    await expect(subtitleText).toBeVisible();

    // 2. Verify Subtitle Text
    await expect(subtitleText).toHaveText("Test Subtitle");

    // 3. Verify Subtitle Text Color
    await expect(subtitleText).toHaveCSS("fill", "rgb(255, 99, 132)");

    // 4. Verify Subtitle Text Size
    await expect(subtitleText).toHaveCSS("font-size", "24px");

    // 5. Verify Subtitle Font Weight
    await expect(subtitleText).toHaveCSS("font-weight", "700");
  });

  test("6. User can change TOOLTIP properties for linear gauge widget", async ({
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

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // ============ TRIGGER TOOLTIP ============

    const trackerPath = targetWidget.locator(".dxg-tracker path").first();

    await expect(trackerPath).toBeVisible();

    // Click on the tracker to display the tooltip
    await trackerPath.click();

    // Tooltip is rendered dynamically
    const tooltipGroup = page.locator(".dxg-tooltip");

    await expect(tooltipGroup).toBeVisible({
      timeout: 5000,
    });

    // ============ VERIFY TOOLTIP TEXT ============

    const tooltipText = tooltipGroup.locator("text").first();

    await expect(tooltipText).toBeVisible();

    // 1. Verify Tooltip Text Color
    await expect(tooltipText).toHaveCSS("fill", "rgb(245, 241, 44)");

    // 2. Verify Tooltip Font Size
    await expect(tooltipText).toHaveCSS("font-size", "18px");

    // 3. Verify Tooltip Font Weight
    await expect(tooltipText).toHaveCSS("font-weight", "700");

    // ============ VERIFY TOOLTIP BACKGROUND ============

    const tooltipBackground = tooltipGroup.locator("path").first();

    await expect(tooltipBackground).toBeVisible();

    // 4. Verify Tooltip Background Color
    await expect(tooltipBackground).toHaveCSS("fill", "rgb(76, 41, 233)");
  });

  test("7. User can change VALUE INDICATOR TYPE CIRCLE properties for linear gauge widget", async ({
  page,
}) => {
  await setGaugeValueIndicatorProperties(page, {
    type: "circle",
    offset: "70",
    size: "18",
  });

  // Enable Gradient
  await GaugeValueIndicatorLocators.gradientLabel(page).click();
  await GaugeValueIndicatorLocators.gradientInput(page).click();

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINEARGAUGE,
  );

  const bgContainer = targetWidget.locator(".mi-linear-gauge-container");

  await bgContainer.waitFor({
    state: "visible",
    timeout: 10000,
  });

  await expect(bgContainer).toBeVisible();

  // ============ VERIFY VALUE INDICATOR ============

  const valueIndicator = bgContainer.locator("g.dxg-value-indicator");

  await expect(valueIndicator).toBeVisible();

  // Verify Circle Indicator
  const circle = valueIndicator.locator("circle");

  await expect(circle).toBeVisible();

  // Verify that the indicator is a circle and not the default path
  await expect(valueIndicator.locator("path")).toHaveCount(0);

  // ============ VERIFY GRADIENT ============

  const fill = await valueIndicator.getAttribute("fill");

  if (!fill) {
    throw new Error(
      "Gradient check failed: the Circle value indicator does not have a fill color. " +
        "Please check that the Gradient option is enabled."
    );
  }

  if (!/^url\(#DevExpress_\d+\)$/.test(fill)) {
    throw new Error(
      `Gradient check failed: the Circle value indicator is using a solid color "${fill}" instead of a gradient. ` +
        "Please check that the Gradient option is checked and gradient is applied in the Value Indicator settings."
    );
  }

  // ============ VERIFY OFFSET ============

  const transform = await valueIndicator.getAttribute("transform");

  if (!transform) {
    throw new Error(
      "Offset check failed: the Circle value indicator does not have a transform value. " +
        "Please check that the Offset setting is applied correctly."
    );
  }

  // Offset is represented by the horizontal translation
  expect(transform).toMatch(/^translate\([\d.]+,0\)$/);
});
 test("8. User can change VALUE INDICATOR TYPE RECTANGLE properties for linear gauge widget", async ({
  page,
}) => {
  await setGaugeValueIndicatorProperties(page, {
    type: "rectangle",
    offset: "30",
  });

  // Enable Gradient
  await GaugeValueIndicatorLocators.gradientLabel(page).click();
  await GaugeValueIndicatorLocators.gradientInput(page).click();

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINEARGAUGE,
  );

  const bgContainer = targetWidget.locator(".mi-linear-gauge-container");

  await bgContainer.waitFor({
    state: "visible",
    timeout: 10000,
  });

  await expect(bgContainer).toBeVisible();

  // ============ VERIFY VALUE INDICATOR ============

  const valueIndicator = bgContainer.locator(".dxg-value-indicator");

  await expect(valueIndicator).toBeVisible();

  // Verify rectangle is rendered using a path
  const rectangle = valueIndicator.locator("path");

  await expect(rectangle).toBeVisible();
  await expect(rectangle).toHaveCount(1);

  // Verify rectangle has no circle element
  await expect(valueIndicator.locator("circle")).toHaveCount(0);

  // ============ VERIFY GRADIENT ============

  const fill = await valueIndicator.getAttribute("fill");

  if (!fill) {
    throw new Error(
      "Gradient check failed: the Rectangle value indicator does not have a fill color. " +
        "Please check that the Gradient option is enabled."
    );
  }

  if (!/^url\(#DevExpress_\d+\)$/.test(fill)) {
    throw new Error(
      `Gradient check failed: the Rectangle value indicator is using a solid color "${fill}" instead of a gradient. ` +
        "Please check that the Gradient option is checked in the Value Indicator settings."
    );
  }

  // ============ VERIFY RECTANGLE SIZE AND POSITION ============

  await expect(rectangle).toHaveAttribute(
    "d",
    "M 5.5 80.5 L 5.5 65.5 L 15.5 65.5 L 15.5 80.5 Z",
  );

  await expect(bgContainer).toBeVisible();
});
   test("9. User can change VALUE INDICATOR TYPE TEXT CLOUD properties for linear gauge widget", async ({
  page,
}) => {
  await setGaugeValueIndicatorProperties(page, {
    type: "textCloud",
    offset: "25",
  });

  // Enable Gradient
  await GaugeValueIndicatorLocators.gradientLabel(page).click();
  await GaugeValueIndicatorLocators.gradientInput(page).click();

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINEARGAUGE,
  );

  const bgContainer = targetWidget.locator(".mi-linear-gauge-container");

  await bgContainer.waitFor({
    state: "visible",
    timeout: 10000,
  });

  await expect(bgContainer).toBeVisible();

  // ============ VERIFY VALUE INDICATOR ============

  const valueIndicator = bgContainer.locator(".dxg-value-indicator");

  await expect(valueIndicator).toBeVisible();

  // Verify Text Cloud shape is rendered using a path
  const textCloudPath = valueIndicator.locator("path");

  await expect(textCloudPath).toBeVisible();
  await expect(textCloudPath).toHaveCount(1);

  // Verify Text Cloud contains the displayed value
  const valueText = valueIndicator.locator("text");

  await expect(valueText).toBeVisible();
  await expect(valueText).toHaveText("45.0");

  // Verify text styling
  await expect(valueText).toHaveCSS("font-size", "18px");
  await expect(valueText).toHaveCSS("font-weight", "400");

  // ============ VERIFY GRADIENT ============

  const fill = await valueIndicator.getAttribute("fill");

  if (!fill) {
    throw new Error(
      "Gradient check failed: the Text Cloud value indicator does not have a fill color. " +
        "Please check that the Gradient option is enabled."
    );
  }

  if (!/^url\(#DevExpress_\d+\)$/.test(fill)) {
    throw new Error(
      `Gradient check failed: the Text Cloud value indicator is using a solid color "${fill}" instead of a gradient. ` +
        "Please check that the Gradient option is checked in the Value Indicator settings."
    );
  }

  // ============ VERIFY TEXT CLOUD GEOMETRY ============

  const pathData = await textCloudPath.getAttribute("d");

  if (!pathData) {
    throw new Error(
      "Text Cloud shape check failed: the Text Cloud path does not contain any geometry data."
    );
  }

  // Text Cloud should be a closed path
  expect(pathData).toMatch(/Z$/);

  // Text Cloud should contain multiple line segments
  expect(pathData).toMatch(/M\s+[\d.]+\s+[\d.]+/);
  expect(pathData).toMatch(/L\s+[\d.]+\s+[\d.]+/);

  // Verify the path contains the expected number of points
  const points = pathData.match(/[ML]\s+[\d.]+\s+[\d.]+/g);

  expect(points).not.toBeNull();
  expect(points!.length).toBe(5);
});
test("10. User can change THRESHOLD properties for linear gauge widget", async ({
  page,
}) => {
  // ============ THRESHOLD ENABLED ============

  const thresholdEnabledLabel =
    ThresholdLocators.enabledLabel(page);

  if ((await thresholdEnabledLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-threshold-enabled not found.",
    );
  }

  await thresholdEnabledLabel.click();

  const thresholdEnabled =
    ThresholdLocators.enabled(page);

  if ((await thresholdEnabled.count()) === 0) {
    throw new Error(
      "Test ID prop-input-threshold-enabled not found.",
    );
  }

  const isChecked =
    (await thresholdEnabled.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await thresholdEnabled.click();
  }

  // ============ THRESHOLD VALUE ============

  const thresholdValueLabel =
    ThresholdLocators.valueLabel(page);

  if ((await thresholdValueLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-threshold-value not found.",
    );
  }

  await thresholdValueLabel.click();

  const thresholdValue =
    ThresholdLocators.value(page);

  if ((await thresholdValue.count()) === 0) {
    throw new Error(
      "Test ID prop-input-threshold-value not found.",
    );
  }

  await thresholdValue.click();
  await thresholdValue.press("ControlOrMeta+a");
  await thresholdValue.fill("80");
  await thresholdValue.press("Enter");

  // ============ SUBVALUE INDICATOR TYPE ============

  const subvalueIndicatorType =
    ThresholdLocators.subvalueIndicatorType(page);

  if ((await subvalueIndicatorType.count()) === 0) {
    throw new Error(
      "Test ID prop-input-subvalue-indicator-type not found.",
    );
  }

  await subvalueIndicatorType.click();
  await page.getByText("textCloud").click();

  // ============ SWITCH TO VIEWER ============

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============ SAVE ============

  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINEARGAUGE,
  );

  const bgContainer = targetWidget.locator(
    ".mi-linear-gauge-container",
  );

  await bgContainer.waitFor({
    state: "visible",
    timeout: 10000,
  });

  // ============ VERIFY THRESHOLD ============

  const gaugeSvg = bgContainer.locator("svg.dxg-linear-gauge");

  await expect(gaugeSvg).toBeVisible();

  // Verify threshold subvalue indicator
  const subvalueIndicator = gaugeSvg
    .locator(
      ".dxg-subvalue-indicators .dxg-subvalue-indicator",
    )
    .first();

  await expect(subvalueIndicator).toBeVisible();

  // Verify textCloud shape is rendered
  const textCloudPath = subvalueIndicator.locator("path");

  await expect(textCloudPath).toHaveCount(1);
  await expect(textCloudPath).toBeVisible();

  // Verify threshold value is displayed
  const thresholdText = subvalueIndicator.locator("text");

  await expect(thresholdText).toHaveCount(1);
  await expect(thresholdText).toBeVisible();
  await expect(thresholdText).toHaveText("80.0");

  // Verify threshold text styling
  await expect(thresholdText).toHaveCSS("font-size", "18px");
  await expect(thresholdText).toHaveCSS("font-weight", "400");
});
  test("11. User can change SCALE LABEL properties for Linear gauge widget", async ({
    page,
  }) => {
    await setGaugeScaleLabel(page, "rgb(12, 45, 235)", "18", "700");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    // Wait for gauge container
    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // ============ VERIFY SCALE LABEL PROPERTIES ============

    const scaleLabels = bgContainer.locator(
      ".dxg-scale-elements .dxg-elements text",
    );

    // Verify scale labels are displayed
    await expect(scaleLabels).toHaveCount(5);

    // Verify label values
    await expect(scaleLabels.nth(0)).toHaveText("0");
    await expect(scaleLabels.nth(1)).toHaveText("25");
    await expect(scaleLabels.nth(2)).toHaveText("50");
    await expect(scaleLabels.nth(3)).toHaveText("75");
    await expect(scaleLabels.nth(4)).toHaveText("100");

    // Verify font color for all scale labels
    for (let i = 0; i < 5; i++) {
      await expect(scaleLabels.nth(i)).toHaveCSS("fill", "rgb(12, 45, 235)");
    }

    // Verify font size for all scale labels
    for (let i = 0; i < 5; i++) {
      await expect(scaleLabels.nth(i)).toHaveCSS("font-size", "18px");
    }

    // Verify font weight for all scale labels
    for (let i = 0; i < 5; i++) {
      await expect(scaleLabels.nth(i)).toHaveCSS("font-weight", "700");
    }
  });

  test("13. User can change SCALE TICK properties for Linear gauge widget", async ({
    page,
  }) => {
    await setGaugeScaleTickProperties(page, {
      visible: true,
      color: "rgb(81, 214, 64)",
      width: "12",
      length: "24",
      interval: "20",
    });

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    // Wait for container
    const gaugeContainer = targetWidget.locator(".mi-linear-gauge-container");

    await gaugeContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // ============ VERIFY SCALE TICK PROPERTIES ============

    const scaleTickPaths = gaugeContainer.locator(
      ".dxg-scale .dxg-axis .dxg-line path",
    );

    // Verify major tick color
    for (let i = 0; i < 6; i++) {
      await expect(scaleTickPaths.nth(i)).toHaveAttribute(
        "stroke",
        "rgba(81, 214, 64, 1)",
      );
    }

    // Verify major tick width
    for (let i = 0; i < 6; i++) {
      await expect(scaleTickPaths.nth(i)).toHaveAttribute("stroke-width", "12");
    }

    // Verify major tick length
    for (let i = 0; i < 6; i++) {
      const pathData = await scaleTickPaths.nth(i).getAttribute("d");

      expect(pathData).not.toBeNull();

      // Major ticks should have length 24:
      // M x 0 L x 24
      expect(pathData).toMatch(/^M\s+[\d.]+\s+0\s+L\s+[\d.]+\s+24$/);
    }

    // ============ VERIFY SCALE INTERVAL ============

    const scaleLabels = gaugeContainer.locator(
      ".dxg-scale-elements .dxg-elements text",
    );

    await expect(scaleLabels).toHaveCount(6);

    await expect(scaleLabels.nth(0)).toHaveText("0");
    await expect(scaleLabels.nth(1)).toHaveText("20");
    await expect(scaleLabels.nth(2)).toHaveText("40");
    await expect(scaleLabels.nth(3)).toHaveText("60");
    await expect(scaleLabels.nth(4)).toHaveText("80");
    await expect(scaleLabels.nth(5)).toHaveText("100");
  });

  test("14. User can change SCALE MINOR TICK properties for Linear gauge widget", async ({
    page,
  }) => {
    await setGaugeScaleMinorTickProperties(page, {
      visible: true,
      color: "rgb(64, 171, 214)",
      width: "6",
      length: "12",
      interval: "20",
    });

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Get Linear Gauge widget
    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    // Wait for container
    const gaugeContainer = targetWidget.locator(".mi-linear-gauge-container");

    await gaugeContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // ============ VERIFY SCALE MINOR TICK PROPERTIES ============

    const scaleLine = gaugeContainer.locator(".dxg-scale .dxg-axis .dxg-line");

    const minorTicks = scaleLine.locator(
      'path[stroke="rgba(64, 171, 214, 1)"]',
    );

    // Verify minor tick color
    await expect(minorTicks.first()).toHaveAttribute(
      "stroke",
      "rgba(64, 171, 214, 1)",
    );

    // Verify minor tick width
    await expect(minorTicks.first()).toHaveAttribute("stroke-width", "6");
  });

  test("15. User can change SCALE RANGE properties for linear gauge widget", async ({
    page,
  }) => {
    await setGaugeScaleRange(page, {
      startValue: "40",
      endValue: "180",
      offset: "10",
    });

    // Verify Scale Range property values
    await expect(ScaleRangeLocators.startValue(page)).toHaveValue("40");
    await expect(ScaleRangeLocators.endValue(page)).toHaveValue("180");
    await expect(ScaleRangeLocators.offset(page)).toHaveValue("10");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    await expect(bgContainer).toBeVisible();
  });

  test("16. User can add new RANGE container for linear gauge widget", async ({
    page,
  }) => {
    await updateGaugeRange(page, {
      index: 2,
      startValue: "66",
      endValue: "75",
      gradient: false,
    });

    await addGaugeRange(page);

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    await expect(bgContainer).toBeVisible();

    // Verify 4 range containers are rendered
    const ranges = bgContainer.locator(".dxg-range-container .dxg-range");

    await expect(ranges).toHaveCount(4);

    // Verify all 4 ranges exist
    await expect(bgContainer.locator(".dxg-range-0")).toBeVisible();
    await expect(bgContainer.locator(".dxg-range-1")).toBeVisible();
    await expect(bgContainer.locator(".dxg-range-2")).toBeVisible();

    // Verify newly added 4th range
    const newRange = bgContainer.locator(".dxg-range-3");
    await expect(newRange).toBeVisible();
  });

  test("17. User can update start value, end value, gradient of exisiting RANGE container for linear gauge widget", async ({
    page,
  }) => {
    await updateGaugeRange(page, {
      index: 0,
      startValue: "10",
      endValue: "30",
      gradient: true,
    });

    // Property-panel verification
    await expect(RangeContainerLocators.rangeStartValue(page, 0)).toHaveValue(
      "10",
    );

    await expect(RangeContainerLocators.rangeEndValue(page, 0)).toHaveValue(
      "30",
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    await expect(bgContainer).toBeVisible();

    // Verify range container
    const rangeContainer = bgContainer.locator(".dxg-range-container");
    await expect(rangeContainer).toBeVisible();

    // Verify updated range
    const updatedRange = rangeContainer.locator(".dxg-range-0");
    await expect(updatedRange).toBeVisible();

    // Verify gradient is applied
    await expect(updatedRange).toHaveAttribute("fill", /url\(#DevExpress_/);
  });

  test("18. User can delete exisiting RANGE container for linear gauge widget", async ({
    page,
  }) => {
    await deleteGaugeRange(page, 0);

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-linear-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    await expect(bgContainer).toBeVisible();

    // Verify range container
    const rangeContainer = bgContainer.locator(".dxg-range-container");
    await expect(rangeContainer).toBeVisible();

    // Verify only 2 actual ranges remain
    const range0 = rangeContainer.locator(".dxg-range-0");
    const range1 = rangeContainer.locator(".dxg-range-1");

    await expect(range0).toBeVisible();
    await expect(range1).toBeVisible();

    // Original range 1 (yellow) is now range 0
    await expect(range0).toHaveAttribute("fill", "#DDDF0D");

    // Original range 2 (red) is now range 1
    await expect(range1).toHaveAttribute("fill", "#DF5353");

    // Verify green range was deleted
    await expect(range0).not.toHaveAttribute("fill", "#55BF3B");
    await expect(range1).not.toHaveAttribute("fill", "#55BF3B");

    // Verify background range still exists
    await expect(rangeContainer.locator(".dxg-background-range")).toBeVisible();
  });

  test("19. User can change RANGE WIDTH properties for Linear Gauge widget", async ({
    page,
  }) => {
    await setGaugeRangeWidth(page, 24);

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.LINEARGAUGE,
    );

    const gaugeContainer = targetWidget.locator(".mi-linear-gauge-container");

    await gaugeContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await expect(gaugeContainer).toBeVisible();

    // Verify Range Width
    // Verify Range Width
    const rangeContainer = gaugeContainer.locator(".dxg-range-container");
    await expect(rangeContainer).toBeVisible();

    const rangePaths = rangeContainer.locator(".dxg-range");
    // Verify all range segments are rendered
    await expect(rangePaths).toHaveCount(3);

    for (let i = 0; i < 3; i++) {
      const pathData = await rangePaths.nth(i).getAttribute("d");

      expect(pathData).toBeTruthy();

      // Extract Y coordinates from the SVG path
      const yValues = [
        ...pathData!.matchAll(/(?:M|L)\s*[\d.]+\s+([\d.]+)/g),
      ].map((match) => Number(match[1]));

      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);

      const actualRangeWidth = maxY - minY;

      // Range width = bottom Y - top Y = 72 - 48 = 24px
      expect(actualRangeWidth).toBe(24);
    }
  });

  test("20 .User can change Link To Dashboard via ACTIONS properties for linear gauge widget", async ({
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
    ).toContainText(
      TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
    );

    // Fetch the parent container widget using the dynamic helper function
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINEARGAUGE);
    await cardWidget.click();

    // Verify the linked dashboard is opened
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
  });

  test("21 . User can set the action type to NONE for linear gauge widget", async ({
    page,
  }) => {
    // Update ACTIONS to None
    await setActionsToNone(page);

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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINEARGAUGE);
    await cardWidget.click();

    // Verify none Action
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(
      TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
    );
  });
});
