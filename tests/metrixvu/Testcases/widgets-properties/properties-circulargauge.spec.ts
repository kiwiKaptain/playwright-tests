import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import {
  setActionsProperties,
  setActionsToNone,
  setAppearance,
  setColorTheme,
  setLayoutAndSpacing,
  setLegendProperties,
  setMinorGridProperties,
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
import { ScaleRangeLocators } from "../../Locators/commonLocators";
import {
  addGaugeRange,
  deleteGaugeRange,
  setGaugeRangeWidth,
  setGaugeScaleLabel,
  setGaugeScaleMinorTickProperties,
  setGaugeScaleRange,
  setGaugeScaleTickProperties,
  setGaugeShape,
  setGaugeValueIndicatorProperties,
  updateGaugeRange,
} from "../../CommonHelperFunctions/commonGaugePropertiesHelpers";
import {
  GaugeValueIndicatorLocators,
  RangeContainerLocators,
} from "../../Locators/commonGaugeLocators";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { CIRCULARGAUGE: "mi-circular-gauge" } as const;

test.describe("PROPERTIES - CIRCULAR-GAUGE Widget", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    await login(page);
    const dashboardCard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, dashboardCard);
    // Create ONLY 1 CIRCULARGAUGE
    await setupWidgets(page, WIDGETS.CIRCULARGAUGE, 1);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

  test("1. User can change LAYOUT & SPACING properties for circular gauge widget", async ({
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
      WIDGETS.CIRCULARGAUGE,
    );
    const targetWidgetContent = targetWidget.locator(
      ".grid-stack-item-content",
    );
    await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
    await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
    await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
    await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
  });

  test("2. User can change APPEARANCE properties for circular gauge widget", async ({
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
      WIDGETS.CIRCULARGAUGE,
    );

    // Verify background color - look for the container with the background
    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");

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

  test("3. User can change TITLE properties for circular gauge widget", async ({
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
      WIDGETS.CIRCULARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // ============ VERIFY TITLE PROPERTIES ============

    const titleText = targetWidget.locator(".mi-gauge-title");
    const titleContainer = targetWidget.locator(".mi-gauge-title-container");

    // 1. Verify Title text
    await expect(titleText).toHaveText("Test Title");

    // 2. Verify Text Color
    await expect(titleText).toHaveCSS("color", "rgb(36, 32, 232)");

    // 3. Verify Text Size
    await expect(titleText).toHaveCSS("font-size", "24px");

    // 4. Verify Font Weight
    await expect(titleText).toHaveCSS("font-weight", "500");

    // 5. Verify Horizontal Alignment - Right
    await expect(titleContainer).toHaveCSS("text-align", "right");

    // 6. Verify Vertical Alignment - Bottom
    const widgetBox = await targetWidget.boundingBox();
    const titleContainerBox = await titleContainer.boundingBox();

    expect(widgetBox).toBeTruthy();
    expect(titleContainerBox).toBeTruthy();

    if (widgetBox && titleContainerBox) {
      const widgetBottom = widgetBox.y + widgetBox.height;

      const titleBottom = titleContainerBox.y + titleContainerBox.height;

      // Title should be positioned near the bottom
      expect(titleBottom).toBeGreaterThan(widgetBottom - 100);
    }
  });

  test("4. User can change SUBTITLE properties for circular gauge widget", async ({
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
      WIDGETS.CIRCULARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // ============ VERIFY SUBTITLE PROPERTIES ============

    const subtitleText = targetWidget.locator(".mi-gauge-subtitle");

    await expect(subtitleText).toBeVisible();

    // 1. Verify Subtitle Text
    await expect(subtitleText).toHaveText("Test Subtitle");

    // 2. Verify Subtitle Text Color
    await expect(subtitleText).toHaveCSS("color", "rgb(255, 99, 132)");

    // 3. Verify Subtitle Text Size
    await expect(subtitleText).toHaveCSS("font-size", "24px");

    // 4. Verify Subtitle Font Weight
    await expect(subtitleText).toHaveCSS("font-weight", "700");

    // 5. Verify Subtitle is visible
    await expect(subtitleText).toBeVisible();
  });

  test("5. User can change TOOLTIP properties for circular gauge widget", async ({
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
      WIDGETS.CIRCULARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    // ============ VERIFY TOOLTIP PROPERTIES ============
    const trackerPath = targetWidget
      .locator(".dxg-tracker path, .dxg-spindle")
      .first();
    await expect(trackerPath).toBeVisible();

    // Trigger mouse event directly on the tracker
    await trackerPath.dispatchEvent("mousemove");

    // Tooltip is rendered outside the widget
    const tooltipGroup = page.locator(".dxg-tooltip");
    await expect(tooltipGroup).toBeVisible({ timeout: 5000 });

    // ============ VERIFY TOOLTIP TEXT ============
    const tooltipText = tooltipGroup.locator("text");
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

  test("6. User can change VALUE INDICATOR TYPE NEEDLE properties for circular gauge widget", async ({
    page,
  }) => {
    await setGaugeValueIndicatorProperties(page, {
      type: "rectangleNeedle",
      offset: "30",
    });
    // Gradient
    await GaugeValueIndicatorLocators.gradientLabel(page).click();
    await GaugeValueIndicatorLocators.gradientInput(page).click();
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();
    // Save
    //
    await page.getByRole("button", { name: "Save", exact: true }).click();
    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );
    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });
    await expect(bgContainer).toBeVisible();
    // VALUE INDICATOR
    const valueIndicator = bgContainer.locator(".dxg-value-indicator");
    await expect(valueIndicator).toBeVisible();
    // Verify rectangle needle
    const needle = valueIndicator.locator("path").first();
    await expect(needle).toHaveAttribute(
      "d",
      "M 180 98 L 180 74 L 182 74 L 182 98 Z",
    ); // Verify spindle border
    const spindleBorder = valueIndicator.locator(".dxg-spindle-border");
    await expect(spindleBorder).toBeVisible();
    await expect(spindleBorder).toHaveAttribute("cx", "181");
    await expect(spindleBorder).toHaveAttribute("cy", "98");
    await expect(spindleBorder).toHaveAttribute("r", "7");
    // Verify spindle hole
    const spindleHole = valueIndicator.locator(".dxg-spindle-hole");
    await expect(spindleHole).toBeVisible();
    await expect(spindleHole).toHaveAttribute("cx", "181");
    await expect(spindleHole).toHaveAttribute("cy", "98");
    await expect(spindleHole).toHaveAttribute("r", "5");
    // Verify rectangle needle rotation
    await expect(valueIndicator).toHaveAttribute(
      "transform",
      "translate(0,0) rotate(-31.5,181,98)",
    );
  });
  test("7. User can change VALUE INDICATOR TYPE TRIANGULAR MARKER properties for circular gauge widget", async ({
    page,
  }) => {
    await setGaugeValueIndicatorProperties(page, {
      type: "triangleMarker",
      offset: "25",
    });
    // Gradient
    await GaugeValueIndicatorLocators.gradientLabel(page).click();
    await GaugeValueIndicatorLocators.gradientInput(page).click();
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();
    // Save
    //
    await page.getByRole("button", { name: "Save", exact: true }).click();
    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );
    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });
    await expect(bgContainer).toBeVisible();
    const valueIndicator = bgContainer.locator(".dxg-value-indicator");

    await expect(valueIndicator).toBeVisible();
    // Verify triangular marker
    const triangleMarker = valueIndicator.locator("path");

    await expect(triangleMarker).toBeVisible();

    // Triangle marker has a closed triangular path
    await expect(triangleMarker).toHaveAttribute("d", /^M .* L .* L .* Z$/);
  });

  test("8. User can change VALUE DISPLAY properties for circular gauge widget", async ({
    page,
  }) => {
    // Value Position - Top
    await page
      .getByTestId("prop-label-center-template-visibility-value-position")
      .click();

    await page
      .getByTestId("prop-control-center-template-visibility-value-position-top")
      .click();

    // Font Color
    const fontColorInput = page.getByTestId(
      "prop-input-center-template-visibility-font-color",
    );

    await page
      .getByTestId("prop-label-center-template-visibility-font-color")
      .click();

    await fontColorInput.click();
    await fontColorInput.press("ControlOrMeta+a");
    await fontColorInput.fill("rgba(232, 37, 37, 1)");
    await fontColorInput.press("Enter");

    // Font Size
    const fontSizeInput = page.getByTestId(
      "prop-input-center-template-visibility-font-size",
    );

    await page
      .getByTestId("prop-label-center-template-visibility-font-size")
      .click();

    await fontSizeInput.click();
    await fontSizeInput.press("ControlOrMeta+a");
    await fontSizeInput.fill("24");
    await fontSizeInput.press("Enter");

    // Unit
    const unitInput = page.getByTestId(
      "prop-input-center-template-visibility-unit",
    );

    await page
      .getByTestId("prop-label-center-template-visibility-unit")
      .click();

    await unitInput.click();
    await unitInput.press("ControlOrMeta+a");
    await unitInput.fill("C");
    await unitInput.press("Enter");

    // Show Icon + Icon Position - Bottom
    await page
      .getByTestId("prop-label-center-template-visibility-show-icon")
      .click();

    await page
      .getByTestId("prop-input-center-template-visibility-show-icon")
      .click();

    await page
      .getByTestId(
        "prop-control-center-template-visibility-icon-position-bottom",
      )
      .click();

    // Icon Size
    const iconSizeInput = page.getByTestId(
      "prop-input-center-template-visibility-icon-size",
    );

    await page
      .getByTestId("prop-label-center-template-visibility-icon-size")
      .click();

    await iconSizeInput.click();
    await iconSizeInput.press("ControlOrMeta+a");
    await iconSizeInput.fill("28");
    await iconSizeInput.press("Enter");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Get Circular Gauge widget
    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await expect(bgContainer).toBeVisible();

    // --------------------------------------------------
    // Verify VALUE DISPLAY
    // --------------------------------------------------

    // Value text
    const valueText = bgContainer.locator(".mi-gauge-value-text");

    await expect(valueText).toBeVisible();

    await expect(valueText).toHaveText("65 C");

    // Font color
    await expect(valueText).toHaveCSS("color", "rgb(232, 37, 37)");

    // Font size
    await expect(valueText).toHaveCSS("font-size", "24px");

    // Icon
    const valueIcon = bgContainer.locator(".mi-gauge-value-icon");

    await expect(valueIcon).toBeVisible();

    // Icon size
    await expect(valueIcon).toHaveAttribute(
      "style",
      /width:\s*28px;\s*height:\s*28px;/,
    );

    // Verify icon is positioned after the value text
    const valueTextBox = await valueText.boundingBox();
    const valueIconBox = await valueIcon.boundingBox();

    expect(valueTextBox).not.toBeNull();
    expect(valueIconBox).not.toBeNull();

    expect(valueIconBox!.y).toBeGreaterThan(
      valueTextBox!.y + valueTextBox!.height,
    );
  });

  test("9. User can change SCALE LABEL properties for Circular gauge widget", async ({
    page,
  }) => {
    await setGaugeScaleLabel(page, "rgb(12, 45, 235)", "18", "700");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );

    // Wait for gauge container
    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");
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
    await expect(scaleLabels.nth(1)).toHaveText("50");
    await expect(scaleLabels.nth(2)).toHaveText("100");
    await expect(scaleLabels.nth(3)).toHaveText("150");
    await expect(scaleLabels.nth(4)).toHaveText("200");

    // Verify font color
    await expect(scaleLabels.nth(0)).toHaveCSS("fill", "rgb(12, 45, 235)");

    // Verify font size
    await expect(scaleLabels.nth(0)).toHaveCSS("font-size", "18px");

    // Verify font weight
    await expect(scaleLabels.nth(0)).toHaveCSS("font-weight", "700");
  });

  test("10. User can change SCALE TICK properties for Circular gauge widget", async ({
    page,
  }) => {
    await setGaugeScaleTickProperties(page, {
      visible: true,
      color: "rgba(74, 64, 214, 1)",
      width: "12",
      length: "24",
      interval: "100",
    });
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );

    // Wait for container
    const gaugeContainer = targetWidget.locator(".mi-circular-gauge-container");
    await gaugeContainer.waitFor({ state: "visible", timeout: 10000 });

    // ============ VERIFY SCALE TICK PROPERTIES ============

    const scaleTickPaths = gaugeContainer.locator(
      ".dxg-scale .dxg-axis .dxg-line path",
    );

    // Verify color
    await expect(scaleTickPaths.first()).toHaveAttribute(
      "stroke",
      "rgba(74, 64, 214, 1)",
    );

    // Verify width
    await expect(scaleTickPaths.first()).toHaveAttribute("stroke-width", "12");

    // Verify tick length
    await expect(scaleTickPaths.first()).toHaveAttribute(
      "d",
      "M 130 65 L 154 65",
    );

    // Verify all ticks have the same properties
    for (let i = 0; i < (await scaleTickPaths.count()); i++) {
      const tick = scaleTickPaths.nth(i);

      await expect(tick).toHaveAttribute("stroke", "rgba(74, 64, 214, 1)");

      await expect(tick).toHaveAttribute("stroke-width", "12");

      await expect(tick).toHaveAttribute("d", "M 130 65 L 154 65");
    }

    // Verify scale interval using scale labels
    const scaleLabels = gaugeContainer.locator(
      ".dxg-scale-elements .dxg-elements text",
    );

    await expect(scaleLabels.nth(0)).toHaveText("0");
    await expect(scaleLabels.nth(1)).toHaveText("100");
    await expect(scaleLabels.nth(2)).toHaveText("200");
  });

  test("11. User can change SCALE MINOR TICK properties for Circular gauge widget", async ({
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

    // Get Circular Gauge widget
    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );

    // Wait for container
    const gaugeContainer = targetWidget.locator(".mi-circular-gauge-container");

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

    // Verify minor tick length
    await expect(minorTicks.first()).toHaveAttribute("d", "M 138 69 L 150 69");

    // Verify all minor ticks have the expected properties
    for (let i = 0; i < (await minorTicks.count()); i++) {
      const tick = minorTicks.nth(i);

      await expect(tick).toHaveAttribute("stroke", "rgba(64, 171, 214, 1)");

      await expect(tick).toHaveAttribute("stroke-width", "6");

      await expect(tick).toHaveAttribute("d", "M 138 69 L 150 69");
    }

    // Verify minor tick interval using their rotation
    const minorTickTransforms = await minorTicks.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("transform")),
    );

    expect(minorTickTransforms).toEqual([
      "translate(0,0) rotate(-162,69,69)",
      "translate(0,0) rotate(-144,69,69)",
      "translate(0,0) rotate(-117,69,69)",
      "translate(0,0) rotate(-99,69,69)",
      "translate(0,0) rotate(-72,69,69)",
      "translate(0,0) rotate(-54,69,69)",
      "translate(0,0) rotate(-27,69,69)",
      "translate(0,0) rotate(-9,69,69)",
    ]);
  });

  test("12. User can change SCALE RANGE properties for circular gauge widget", async ({
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
      WIDGETS.CIRCULARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    await expect(bgContainer).toBeVisible();
    // Verify Scale Range properties input values
  });
  test("13. User can add new RANGE container  for circular gauge widget", async ({
    page,
  }) => {
    await updateGaugeRange(page, {
      index: 2,
      startValue: "150",
      endValue: "180",
      gradient: false,
    });

    await addGaugeRange(page);
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    await expect(bgContainer).toBeVisible();
    // Verify Scale Range properties input values
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
  test("14. User can update start value, end value, gradient of exisiting RANGE container  for circular gauge widget", async ({
    page,
  }) => {
    await updateGaugeRange(page, {
      index: 0,
      startValue: "30",
      endValue: "130",
      gradient: true,
    });
    // Property-panel verification
    await expect(RangeContainerLocators.rangeStartValue(page, 0)).toHaveValue(
      "30",
    );

    await expect(RangeContainerLocators.rangeEndValue(page, 0)).toHaveValue(
      "130",
    );
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    await expect(bgContainer).toBeVisible();
    // Verify Update Range properties input values
    // Verify range container
    const rangeContainer = bgContainer.locator(".dxg-range-container");
    await expect(rangeContainer).toBeVisible();

    // Verify updated range
    const updatedRange = rangeContainer.locator(".dxg-range-0");

    await expect(updatedRange).toBeVisible();

    // Verify gradient is applied
    await expect(updatedRange).toHaveAttribute("fill", /url\(#DevExpress_/);

    // Verify updated range path
    await expect(updatedRange).toHaveAttribute(
      "d",
      /M .* A 85\.00000 85\.00000/,
    );
  });
  test("15. User can delete exisiting RANGE container  for circular gauge widget", async ({
    page,
  }) => {
    await deleteGaugeRange(page, 0);
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );

    const bgContainer = targetWidget.locator(".mi-circular-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    await expect(bgContainer).toBeVisible();
    // Verify Scale Range properties input values
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
  test("16. User can change RANGE WIDTH properties for Circular Gauge widget", async ({
    page,
  }) => {
    await setGaugeRangeWidth(page, 24);

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );

    const gaugeContainer = targetWidget.locator(".mi-circular-gauge-container");

    await gaugeContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await expect(gaugeContainer).toBeVisible();

    // Verify Range Width
    const rangeContainer = gaugeContainer.locator(".dxg-range-container");

    await expect(rangeContainer).toBeVisible();

    const rangePaths = rangeContainer.locator(".dxg-range");

    // Verify all range segments are rendered
    await expect(rangePaths).toHaveCount(3);

    // Range Width = Outer Radius - Inner Radius
    // 93 - 69 = 24
    const firstRange = rangeContainer.locator(".dxg-range-0");
    const secondRange = rangeContainer.locator(".dxg-range-1");
    const thirdRange = rangeContainer.locator(".dxg-range-2");

    await expect(firstRange).toHaveAttribute(
      "d",
      /A 93\.00000 93\.00000.*A 69\.00000 69\.00000/,
    );

    await expect(secondRange).toHaveAttribute(
      "d",
      /A 93\.00000 93\.00000.*A 69\.00000 69\.00000/,
    );

    await expect(thirdRange).toHaveAttribute(
      "d",
      /A 93\.00000 93\.00000.*A 69\.00000 69\.00000/,
    );
  });
  test("17. User can change Link To Dashboard via ACTIONS properties for circular gauge widget", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );
    await cardWidget.click();

    // Verify the linked dashboard is opened
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
  });
  test("18. User can set the action type to NONE for Circular Gauge widget", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(
      page,
      WIDGETS.CIRCULARGAUGE,
    );
    await cardWidget.click();

    // Verify none Action
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(
      TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
    );
  });
});
