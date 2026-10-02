import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import {
  setActionsProperties,
  setActionsToNone,
  setAppearance,
  setLayoutAndSpacing,
  setRunTimeFilter,
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
  playwrightLocators,
  ScaleRangeLocators,
} from "../../Locators/commonLocators";
import { SparklineLocators } from "../../Locators/sparklineSpecificLocators";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { SPARKLINE: "mi-sparkline" } as const;

test.describe("PROPERTIES - SPARKLINE Widget", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    await login(page);
    const dashboardCard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, dashboardCard);
    // Create ONLY 1 SPARKLINE
    await setupWidgets(page, WIDGETS.SPARKLINE, 1);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

  test("1. User can change LAYOUT & SPACING properties for sparkline chart widget", async ({
    page,
  }) => {
    // Update Layout & Spacing
    await setLayoutAndSpacing(page, "5", "15", "20", "25");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);
    const targetWidgetContent = targetWidget.locator(
      ".grid-stack-item-content",
    );
    await expect(targetWidgetContent).toHaveCSS("padding-top", "5px");
    await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
    await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
    await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
  });

  test("2. User can change APPEARANCE properties for sparkline chart widget", async ({
    page,
  }) => {
    await setAppearance(page, "rgb(229, 214, 73)");
    await setRunTimeFilter(page);

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);

    // Verify background color
    const bgContainer = targetWidget.locator(".mi-sparkline-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await expect(bgContainer).toHaveCSS(
      "background-color",
      "rgb(229, 214, 73)",
    );

    // Verify runtime filter is visible
    const runtimeFilter = targetWidget.locator('[title="Filter"]');
    await expect(runtimeFilter).toBeVisible();
  });
  // test("3. User can change GENERAL properties for sparkline chart widget", async ({
  //   page,
  // }) => {
  //   await page.getByTestId("prop-label-type").click();
  //   await page.getByTestId("prop-input-type").click();
  //   await page.getByText("line", { exact: true }).click();
  //   await page.getByTestId("prop-label-line-width").click();
  //   await page.getByTestId("prop-input-line-width").click();
  //   await page.getByTestId("prop-input-line-width").press("ControlOrMeta+a");
  //   await page.getByTestId("prop-input-line-width").fill("15");
  //   await page.getByTestId("prop-input-line-width").press("Enter");
  //   await page.getByTestId("prop-label-gradient-setting-gradient").click();
  //   await page.getByTestId("prop-input-gradient-setting-gradient").click();

  //   // Switch to Viewer
  //   await page.locator("label").filter({ hasText: "Viewer" }).click();

  //   // Save
  //   await page.getByRole("button", { name: "Save", exact: true }).click();

  //   const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);

  //   const sparkline = targetWidget.locator("#mi-sparkline-chart");

  //   await expect(sparkline).toBeVisible();

  //   const linePath = sparkline.locator(".dxc-elements path");

  //   await expect(linePath).toBeVisible();

  //   // Verify line width = 15
  //   await expect(linePath).toHaveAttribute("stroke-width", "15");

  //   // Verify gradient is applied to the line
  //   const stroke = await linePath.getAttribute("stroke");

  //   expect(stroke).toMatch(/^url\(#sparkline-gradient-/);

  //   // Verify gradient definition exists
  //   const gradient = sparkline.locator(
  //     "defs linearGradient[id^='sparkline-gradient-']",
  //   );
  // });
  test("3. User can change GENERAL properties for sparkline chart widget", async ({
  page,
}) => {
  // ============================================================
  // Type
  // ============================================================

  const typeLabel = SparklineLocators.typeLabel(page);

  if ((await typeLabel.count()) === 0) {
    throw new Error("Test ID prop-label-type not found.");
  }

  await typeLabel.click();

  const typeInput = SparklineLocators.typeInput(page);

  if ((await typeInput.count()) === 0) {
    throw new Error("Test ID prop-input-type not found.");
  }

  await typeInput.click();

  const lineOption = page.getByText("line", { exact: true });

  if ((await lineOption.count()) === 0) {
    throw new Error("Sparkline type option 'line' not found.");
  }

  await lineOption.click();

  // ============================================================
  // Line Width
  // ============================================================

  const lineWidthLabel = SparklineLocators.lineWidthLabel(page);

  if ((await lineWidthLabel.count()) === 0) {
    throw new Error("Test ID prop-label-line-width not found.");
  }

  await lineWidthLabel.click();

  const lineWidthInput = SparklineLocators.lineWidthInput(page);

  if ((await lineWidthInput.count()) === 0) {
    throw new Error("Test ID prop-input-line-width not found.");
  }

  await lineWidthInput.click();
  await lineWidthInput.press("ControlOrMeta+A");
  await lineWidthInput.fill("15");
  await lineWidthInput.press("Enter");

  // ============================================================
  // Gradient
  // ============================================================

  const gradientLabel = SparklineLocators.gradientLabel(page);

  if ((await gradientLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-gradient-setting-gradient not found.",
    );
  }

  await gradientLabel.click();

  const gradientInput = SparklineLocators.gradientInput(page);

  if ((await gradientInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-gradient-setting-gradient not found.",
    );
  }

  await gradientInput.click();

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page
    .getByRole("button", {
      name: "Save",
      exact: true,
    })
    .click();

  // ============================================================
  // Get Sparkline
  // ============================================================

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.SPARKLINE,
  );

  const sparkline = targetWidget.locator("#mi-sparkline-chart");

  try {
    await expect(sparkline).toBeVisible();
  } catch {
    throw new Error("Sparkline chart widget is not visible.");
  }

  // ============================================================
  // Verify Line
  // ============================================================

  const linePath = sparkline.locator(".dxc-elements path");

  try {
    await expect(linePath).toBeVisible();
  } catch {
    throw new Error("Sparkline line path is not visible.");
  }

  // Verify line width = 15
  try {
    await expect(linePath).toHaveAttribute("stroke-width", "15");
  } catch {
    throw new Error(
      "Sparkline line width is not 15.",
    );
  }

  // ============================================================
  // Verify Gradient is Applied
  // ============================================================

  const stroke = await linePath.getAttribute("stroke");

  if (!stroke || !/^url\(#sparkline-gradient-/.test(stroke)) {
    throw new Error(
      `Sparkline gradient is not applied to the line. Expected gradient stroke, but received: ${stroke}`,
    );
  }

  // Verify gradient definition exists
  const gradient = sparkline.locator(
    "defs linearGradient[id^='sparkline-gradient-']",
  );

  try {
    await expect(gradient).toHaveCount(1);
  } catch {
    throw new Error(
      "Sparkline gradient is applied in the stroke .Please check the Gradient checkbox or if it applied to widget .",
    );
  }
});
  // test("4. User can apply WINLOSS for sparkline chart widget", async ({
  //   page,
  // }) => {
  //   await page.getByTestId("prop-label-type").click();
  //   await page.getByTestId("prop-input-type").click();
  //   await page.getByText("winloss", { exact: true }).click();

  //   // Switch to Viewer
  //   await page.locator("label").filter({ hasText: "Viewer" }).click();

  //   // Save
  //   await page.getByRole("button", { name: "Save", exact: true }).click();

  //   const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);

  //   const sparkline = targetWidget.locator("#mi-sparkline-chart");

  //   await expect(sparkline).toBeVisible();

  //   // Verify all Win/Loss bars are rendered
  //   const bars = sparkline.locator(".dxc-markers rect");

  //   await expect(bars).toHaveCount(12);
  // });
  test("4. User can apply WINLOSS for sparkline chart widget", async ({
    page,
  }) => {
    // ============================================================
    // Type
    // ============================================================

    const typeLabel = SparklineLocators.typeLabel(page);

    if ((await typeLabel.count()) === 0) {
      throw new Error("Test ID prop-label-type not found.");
    }

    await typeLabel.click();

    const typeInput = SparklineLocators.typeInput(page);

    if ((await typeInput.count()) === 0) {
      throw new Error("Test ID prop-input-type not found.");
    }

    await typeInput.click();

    const winlossOption = SparklineLocators.winlossOption(page);

    if ((await winlossOption.count()) === 0) {
      throw new Error("Sparkline type option 'winloss' not found.");
    }

    await winlossOption.click();

    // ============================================================
    // Switch to Viewer
    // ============================================================

    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // ============================================================
    // Save
    // ============================================================

    await page
      .getByRole("button", {
        name: "Save",
        exact: true,
      })
      .click();

    // ============================================================
    // Get Sparkline
    // ============================================================

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);

    const sparkline = targetWidget.locator("#mi-sparkline-chart");

    await expect(sparkline).toBeVisible();

    // ============================================================
    // Verify Win/Loss bars
    // ============================================================

    const bars = sparkline.locator(".dxc-markers rect");

    await expect(bars).toHaveCount(12);
  });
  // test("5. User can change DISPLAY for sparkline chart widget", async ({
  //   page,
  // }) => {
  //   await page.getByTestId("prop-label-show-min-max").click();
  //   await page.getByTestId("prop-input-show-min-max").click();
  //   await page.getByTestId("prop-label-point-size").click();
  //   await page.getByTestId("prop-input-point-size").click();
  //   await page.getByTestId("prop-input-point-size").press("ControlOrMeta+a");
  //   await page.getByTestId("prop-input-point-size").fill("15");
  //   await page.getByTestId("prop-input-point-size").press("Enter");
  //   await page.getByTestId("prop-label-point-color").click();
  //   await page.getByTestId("prop-input-point-color").click();
  //   await page
  //     .getByTestId("prop-input-point-color")
  //     .fill("rgba(234, 92, 247, 1)");
  //   await page.getByTestId("prop-input-point-color").press("Enter");
  //   await page.getByTestId("prop-label-point-symbol").click();
  //   await page.getByTestId("prop-input-point-symbol").click();
  //   await page.getByText("circle").click();
  //   await page.getByTestId("prop-label-line-color").click();
  //   await page.getByTestId("prop-input-line-color").click();
  //   await page
  //     .getByTestId("prop-input-line-color")
  //     .fill("rgba(49, 235, 235, 1)");
  //   await page.getByTestId("prop-input-line-color").press("Enter");

  //   // Switch to Viewer
  //   await page.locator("label").filter({ hasText: "Viewer" }).click();

  //   // Save
  //   await page.getByRole("button", { name: "Save", exact: true }).click();

  //   const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);

  //   const sparkline = targetWidget.locator("#mi-sparkline-chart");

  //   await expect(sparkline).toBeVisible();

  //   // Verify line color
  //   const linePath = sparkline.locator(".dxc-elements path");

  //   await expect(linePath).toHaveAttribute("stroke", "rgba(49, 235, 235, 1)");

  //   // Verify point symbol = circle
  //   const pointMarkers = sparkline.locator(".dxc-markers circle");

  //   // Verify point color
  //   for (const marker of await pointMarkers.all()) {
  //     await expect(marker).toHaveAttribute("fill", "rgba(234, 92, 247, 1)");
  //   }

  //   // Verify point size
  //   for (const marker of await pointMarkers.all()) {
  //     await expect(marker).toHaveAttribute("r", "8.5");
  //   }

  //   // Verify Show Min/Max
  //   for (const marker of await pointMarkers.all()) {
  //     await expect(marker).toHaveAttribute("visibility", "visible");
  //   }
  // });
  test("5. User can change DISPLAY for sparkline chart widget", async ({
    page,
  }) => {
    // ============================================================
    // Show Min/Max
    // ============================================================

    const showMinMaxLabel = SparklineLocators.showMinMaxLabel(page);

    if ((await showMinMaxLabel.count()) === 0) {
      throw new Error("Test ID prop-label-show-min-max not found.");
    }

    await showMinMaxLabel.click();

    const showMinMaxInput = SparklineLocators.showMinMaxInput(page);

    if ((await showMinMaxInput.count()) === 0) {
      throw new Error("Test ID prop-input-show-min-max not found.");
    }

    await showMinMaxInput.click();

    // ============================================================
    // Point Size
    // ============================================================

    const pointSizeLabel = SparklineLocators.pointSizeLabel(page);

    if ((await pointSizeLabel.count()) === 0) {
      throw new Error("Test ID prop-label-point-size not found.");
    }

    await pointSizeLabel.click();

    const pointSizeInput = SparklineLocators.pointSizeInput(page);

    if ((await pointSizeInput.count()) === 0) {
      throw new Error("Test ID prop-input-point-size not found.");
    }

    await pointSizeInput.click();
    await pointSizeInput.press("ControlOrMeta+A");
    await pointSizeInput.fill("15");
    await pointSizeInput.press("Enter");

    // ============================================================
    // Point Color
    // ============================================================

    const pointColorLabel = SparklineLocators.pointColorLabel(page);

    if ((await pointColorLabel.count()) === 0) {
      throw new Error("Test ID prop-label-point-color not found.");
    }

    await pointColorLabel.click();

    const pointColorInput = SparklineLocators.pointColorInput(page);

    if ((await pointColorInput.count()) === 0) {
      throw new Error("Test ID prop-input-point-color not found.");
    }

    await pointColorInput.click();
    await pointColorInput.fill("rgba(234, 92, 247, 1)");
    await pointColorInput.press("Enter");

    // ============================================================
    // Point Symbol
    // ============================================================

    const pointSymbolLabel = SparklineLocators.pointSymbolLabel(page);

    if ((await pointSymbolLabel.count()) === 0) {
      throw new Error("Test ID prop-label-point-symbol not found.");
    }

    await pointSymbolLabel.click();

    const pointSymbolInput = SparklineLocators.pointSymbolInput(page);

    if ((await pointSymbolInput.count()) === 0) {
      throw new Error("Test ID prop-input-point-symbol not found.");
    }

    await pointSymbolInput.click();

    const circleOption = SparklineLocators.circleOption(page);

    if ((await circleOption.count()) === 0) {
      throw new Error("Sparkline point symbol option 'circle' not found.");
    }

    await circleOption.click();

    // ============================================================
    // Line Color
    // ============================================================

    const lineColorLabel = SparklineLocators.lineColorLabel(page);

    if ((await lineColorLabel.count()) === 0) {
      throw new Error("Test ID prop-label-line-color not found.");
    }

    await lineColorLabel.click();

    const lineColorInput = SparklineLocators.lineColorInput(page);

    if ((await lineColorInput.count()) === 0) {
      throw new Error("Test ID prop-input-line-color not found.");
    }

    await lineColorInput.click();
    await lineColorInput.fill("rgba(49, 235, 235, 1)");
    await lineColorInput.press("Enter");

    // ============================================================
    // Switch to Viewer
    // ============================================================

    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // ============================================================
    // Save
    // ============================================================

    await page
      .getByRole("button", {
        name: "Save",
        exact: true,
      })
      .click();

    // ============================================================
    // Get Sparkline
    // ============================================================

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);

    const sparkline = targetWidget.locator("#mi-sparkline-chart");

    await expect(sparkline).toBeVisible();

    // ============================================================
    // Verify Line Color
    // ============================================================

    const linePath = sparkline.locator(".dxc-elements path");

    await expect(linePath).toHaveAttribute("stroke", "rgba(49, 235, 235, 1)");

    // ============================================================
    // Verify Point Symbol = Circle
    // ============================================================

    const pointMarkers = sparkline.locator(".dxc-markers circle");

    // ============================================================
    // Verify Point Color
    // ============================================================

    for (const marker of await pointMarkers.all()) {
      await expect(marker).toHaveAttribute("fill", "rgba(234, 92, 247, 1)");
    }

    // ============================================================
    // Verify Point Size
    // ============================================================

    for (const marker of await pointMarkers.all()) {
      await expect(marker).toHaveAttribute("r", "8.5");
    }

    // ============================================================
    // Verify Show Min/Max
    // ============================================================

    for (const marker of await pointMarkers.all()) {
      await expect(marker).toHaveAttribute("visibility", "visible");
    }
  });
  // test("6. User can change SYMBOL for sparkline chart widget", async ({
  //   page,
  // }) => {
  //   await page.getByTestId("prop-label-show-min-max").click();
  //   await page.getByTestId("prop-input-show-min-max").click();
  //   await page.getByTestId("prop-label-point-size").click();
  //   await page.getByTestId("prop-input-point-size").click();
  //   await page.getByTestId("prop-input-point-size").press("ControlOrMeta+a");
  //   await page.getByTestId("prop-input-point-size").fill("15");
  //   await page.getByTestId("prop-input-point-size").press("Enter");
  //   await page.getByTestId("prop-label-point-color").click();
  //   await page.getByTestId("prop-input-point-color").click();
  //   await page
  //     .getByTestId("prop-input-point-color")
  //     .fill("rgba(234, 92, 247, 1)");
  //   await page.getByTestId("prop-input-point-color").press("Enter");
  //   await page.getByTestId("prop-label-point-symbol").click();
  //   await page.getByTestId("prop-input-point-symbol").click();
  //   await page.getByText("square").click();
  //   await page.getByTestId("prop-label-line-color").click();
  //   await page.getByTestId("prop-input-line-color").click();
  //   await page
  //     .getByTestId("prop-input-line-color")
  //     .fill("rgba(49, 235, 235, 1)");
  //   await page.getByTestId("prop-input-line-color").press("Enter");

  //   // Switch to Viewer
  //   await page.locator("label").filter({ hasText: "Viewer" }).click();

  //   // Save
  //   await page.getByRole("button", { name: "Save", exact: true }).click();

  //   const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);
  //   const sparkline = targetWidget.locator("#mi-sparkline-chart");

  //   await expect(sparkline).toBeVisible();

  //   // Verify square point symbols
  //   const squareMarkers = sparkline.locator(".dxc-markers path");

  //   await expect(squareMarkers).toHaveCount(4);

  //   // Verify square shape
  //   for (const marker of await squareMarkers.all()) {
  //     await expect(marker).toHaveAttribute(
  //       "d",
  //       "M -8.5 -8.5 L 8.5 -8.5 L 8.5 8.5 L -8.5 8.5 L -8.5 -8.5 Z",
  //     );
  //   }

  //   // Verify point size
  //   for (const marker of await squareMarkers.all()) {
  //     await expect(marker).toHaveAttribute("r", "8.5");
  //   }

  //   // Verify markers are visible
  //   for (const marker of await squareMarkers.all()) {
  //     await expect(marker).toHaveAttribute("visibility", "visible");
  //   }

  //   // Verify line color
  //   const linePath = sparkline.locator(".dxc-elements path");

  //   await expect(linePath).toHaveAttribute("stroke", "rgba(49, 235, 235, 1)");
  //   // Point color should be applied to square markers
  //   for (const marker of await squareMarkers.all()) {
  //     await expect(marker).toHaveAttribute("fill", "rgba(234, 92, 247, 1)");
  //   }
  // });
  test("6. User can change SYMBOL for sparkline chart widget", async ({
    page,
  }) => {
    // ============================================================
    // Show Min/Max
    // ============================================================

    const showMinMaxLabel = SparklineLocators.showMinMaxLabel(page);

    if ((await showMinMaxLabel.count()) === 0) {
      throw new Error("Test ID prop-label-show-min-max not found.");
    }

    await showMinMaxLabel.click();

    const showMinMaxInput = SparklineLocators.showMinMaxInput(page);

    if ((await showMinMaxInput.count()) === 0) {
      throw new Error("Test ID prop-input-show-min-max not found.");
    }

    await showMinMaxInput.click();

    // ============================================================
    // Point Size
    // ============================================================

    const pointSizeLabel = SparklineLocators.pointSizeLabel(page);

    if ((await pointSizeLabel.count()) === 0) {
      throw new Error("Test ID prop-label-point-size not found.");
    }

    await pointSizeLabel.click();

    const pointSizeInput = SparklineLocators.pointSizeInput(page);

    if ((await pointSizeInput.count()) === 0) {
      throw new Error("Test ID prop-input-point-size not found.");
    }

    await pointSizeInput.click();
    await pointSizeInput.press("ControlOrMeta+A");
    await pointSizeInput.fill("15");
    await pointSizeInput.press("Enter");

    // ============================================================
    // Point Color
    // ============================================================

    const pointColorLabel = SparklineLocators.pointColorLabel(page);

    if ((await pointColorLabel.count()) === 0) {
      throw new Error("Test ID prop-label-point-color not found.");
    }

    await pointColorLabel.click();

    const pointColorInput = SparklineLocators.pointColorInput(page);

    if ((await pointColorInput.count()) === 0) {
      throw new Error("Test ID prop-input-point-color not found.");
    }

    await pointColorInput.click();
    await pointColorInput.fill("rgba(234, 92, 247, 1)");
    await pointColorInput.press("Enter");

    // ============================================================
    // Point Symbol
    // ============================================================

    const pointSymbolLabel = SparklineLocators.pointSymbolLabel(page);

    if ((await pointSymbolLabel.count()) === 0) {
      throw new Error("Test ID prop-label-point-symbol not found.");
    }

    await pointSymbolLabel.click();

    const pointSymbolInput = SparklineLocators.pointSymbolInput(page);

    if ((await pointSymbolInput.count()) === 0) {
      throw new Error("Test ID prop-input-point-symbol not found.");
    }

    await pointSymbolInput.click();

    const squareOption = SparklineLocators.squareOption(page);

    if ((await squareOption.count()) === 0) {
      throw new Error("Sparkline point symbol option 'square' not found.");
    }

    await squareOption.click();

    // ============================================================
    // Line Color
    // ============================================================

    const lineColorLabel = SparklineLocators.lineColorLabel(page);

    if ((await lineColorLabel.count()) === 0) {
      throw new Error("Test ID prop-label-line-color not found.");
    }

    await lineColorLabel.click();

    const lineColorInput = SparklineLocators.lineColorInput(page);

    if ((await lineColorInput.count()) === 0) {
      throw new Error("Test ID prop-input-line-color not found.");
    }

    await lineColorInput.click();
    await lineColorInput.fill("rgba(49, 235, 235, 1)");
    await lineColorInput.press("Enter");

    // ============================================================
    // Switch to Viewer
    // ============================================================

    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // ============================================================
    // Save
    // ============================================================

    await page
      .getByRole("button", {
        name: "Save",
        exact: true,
      })
      .click();

    // ============================================================
    // Get Sparkline
    // ============================================================

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);

    const sparkline = targetWidget.locator("#mi-sparkline-chart");

    await expect(sparkline).toBeVisible();

    // ============================================================
    // Verify Square Point Symbols
    // ============================================================

    const squareMarkers = sparkline.locator(".dxc-markers path");

    if ((await squareMarkers.count()) === 0) {
  throw new Error(
    "Square point symbols are not displayed. Please check the Point Symbol setting.",
  );
}


    // ============================================================
    // Verify Square Shape
    // ============================================================

    for (const marker of await squareMarkers.all()) {
      await expect(marker).toHaveAttribute(
        "d",
        "M -8.5 -8.5 L 8.5 -8.5 L 8.5 8.5 L -8.5 8.5 L -8.5 -8.5 Z",
      );
    }

    // ============================================================
    // Verify Point Size
    // ============================================================

    for (const marker of await squareMarkers.all()) {
      await expect(marker).toHaveAttribute("r", "8.5");
    }

    // ============================================================
    // Verify Markers Are Visible
    // ============================================================

    for (const marker of await squareMarkers.all()) {
      await expect(marker).toHaveAttribute("visibility", "visible");
    }

    // ============================================================
    // Verify Line Color
    // ============================================================

    const linePath = sparkline.locator(".dxc-elements path");

    await expect(linePath).toHaveAttribute("stroke", "rgba(49, 235, 235, 1)");

     // ============================================================
  // Verify Point Color
  // ============================================================

  for (const marker of await squareMarkers.all()) {
    try {
      await expect(marker).toHaveAttribute(
        "fill",
        "rgba(234, 92, 247, 1)",
      );
    } catch {
      throw new Error(
        "Point color is not applied. The specified color rgba(234, 92, 247, 1) is not reflected on the point symbols. Please check the Point Color setting.",
      );
    }
  }
  });
  test("7. User can change TOOLTIP properties for sparkline chart widget", async ({
    page,
  }) => {
    await playwrightLocators.Tooltip.enabled(page).click();

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

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);

    const sparkline = targetWidget.locator(
      ".mi-sparkline-container svg.dxsl-sparkline",
    );

    await expect(sparkline).toBeVisible();

    // Click on the Sparkline to display the tooltip
    await sparkline.click();

    // Locate the Sparkline tooltip
    const tooltip = page.locator(".dxsl-tooltip");

    await expect(tooltip).toBeVisible();

    // Verify tooltip background color
    const tooltipBackground = tooltip.locator("svg path").first();

    await expect(tooltipBackground).toHaveAttribute(
      "fill",
      "rgba(76, 41, 233, 1)",
    );

    // Locate tooltip text container
    const tooltipText = tooltip.locator("div[style*='font-size: 18px']");

    // Verify tooltip font size
    await expect(tooltipText).toHaveCSS("font-size", "18px");

    // Verify tooltip font weight
    await expect(tooltipText).toHaveCSS("font-weight", "700");

    // Verify tooltip text color
    await expect(tooltipText).toHaveCSS("color", "rgb(245, 241, 44)");
  });

  test("8 .User can change Link To Dashboard via ACTIONS properties for sparkline chart widget", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);
    await cardWidget.click();

    // Verify the linked dashboard is opened
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
  });

  test("9 . User can set the action type to NONE for sparkline chart widget", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.SPARKLINE);
    await cardWidget.click();

    // Verify none Action
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(
      TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
    );
  });
});
