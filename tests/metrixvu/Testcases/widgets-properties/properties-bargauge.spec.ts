import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import {
  setActionsProperties,
  setActionsToNone,
  setAppearance,
  setColorTheme,
  setLayoutAndSpacing,
  setLegendProperties,
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
  setGaugeScaleLabel,
  setGaugeScaleRange,
  setGaugeShape,
  setGaugeValueIndicatorProperties,
} from "../../CommonHelperFunctions/commonGaugePropertiesHelpers";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { BARGAUGE: "mi-bar-gauge" } as const;
test.describe("PROPERTIES - BAR-GAUGE Widget", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    await login(page);
    const dashboardCard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, dashboardCard);
    // Create ONLY 1 BARGAUGE
    await setupWidgets(page, WIDGETS.BARGAUGE, 1);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

  test("1. User can change LAYOUT & SPACING properties for bar gauge widget", async ({
    page,
  }) => {
    // Update Layout & Spacing

    await setLayoutAndSpacing(page, "10", "15", "20", "25");
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);
    const targetWidgetContent = targetWidget.locator(
      ".grid-stack-item-content",
    );
    await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
    await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
    await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
    await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
  });
  test("2. User can change APPEARANCE properties for bar gauge widget", async ({
    page,
  }) => {
    await setAppearance(page, "rgb(229, 214, 73)");

    await setRunTimeFilter(page);
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);

    // Verify background color - look for the container with the background
    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");

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
  test("3. User can change GENERAL properties for bar gauge widget", async ({
    page,
  }) => {
    await setColorTheme(page, "Carmine");
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);
    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    // Verify color theme

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // Verify color theme
    const gaugeBars = bgContainer.locator(".dxbg-bars > path");

    const firstValueBar = gaugeBars.nth(1);
    const secondValueBar = gaugeBars.nth(4);
    const thirdValueBar = gaugeBars.nth(7);

    await expect(firstValueBar).toHaveAttribute("fill", "#fb7764");

    await expect(secondValueBar).toHaveAttribute("fill", "#73d47f");

    await expect(thirdValueBar).toHaveAttribute("fill", "#fed85e");
  });

  test("4. User can change GAUGE SHAPE properties for bar gauge widget", async ({
    page,
  }) => {
    // Set the Bar Gauge shape properties.
    // Expected:
    // Start Angle = 100°
    // End Angle   = 360°
    // Therefore, the expected gauge arc is:
    // 360° - 100° = 260°
    await setGaugeShape(page, 100, 360);

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Verify gauge SVG is visible
    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);

    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    const gaugeSvg = bgContainer.locator("svg.dxbg-bar-gauge");

    await expect(gaugeSvg).toBeVisible();

    const angles = await gaugeSvg.evaluate((svg) => {
      /*
       * DevExtreme does not expose startAngle and endAngle
       * directly as DOM attributes.
       *
       * Instead, the configured angles are converted into
       * SVG arc coordinates inside the <path d="...">.
       *
       * Therefore, we calculate the angles from the
       * rendered SVG path.
       */

      // ---------------------------------------------------------
      // 1. Get the center of the gauge
      // ---------------------------------------------------------
      //
      // DevExtreme's indicator/tick path contains a transform:
      //
      // rotate(angle, cx, cy)
      //
      // We extract cx and cy because the angle of an SVG point
      // must be calculated relative to the center of the gauge.

      const tick = svg.querySelector('.dxbg-bars path[transform*="rotate"]');

      const match = tick!
        .getAttribute("transform")!
        .match(/rotate\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);

      const cx = parseFloat(match![2]);
      const cy = parseFloat(match![3]);

      // ---------------------------------------------------------
      // 2. Get the SVG path that represents the gauge track
      // ---------------------------------------------------------
      //
      // The first path inside .dxbg-bars represents the
      // full-range background track of the gauge.
      //
      // Example SVG path structure:
      //
      // M x1 y1
      // A rx ry rotation largeArcFlag sweepFlag x2 y2
      //
      // M = starting point of the arc
      // A = SVG arc command
      // x2/y2 = ending point of the arc

      const trackPath = svg.querySelector(".dxbg-bars path")!;

      const d = trackPath.getAttribute("d")!;

      // ---------------------------------------------------------
      // 3. Extract the starting point from the SVG path
      // ---------------------------------------------------------
      //
      // The "M x y" coordinates represent one endpoint
      // of the gauge arc.

      const mMatch = d.match(/M\s*(-?[\d.]+)\s+(-?[\d.]+)/)!;

      // ---------------------------------------------------------
      // 4. Extract the ending point from the SVG arc command
      // ---------------------------------------------------------
      //
      // The final x/y coordinates of the "A" command represent
      // the other endpoint of the gauge arc.

      const aMatch = d.match(
        /A\s*[\d.]+\s+[\d.]+\s+[\d.]+\s+[01]\s+[01]\s+(-?[\d.]+)\s+(-?[\d.]+)/,
      )!;

      // ---------------------------------------------------------
      // 5. Convert SVG coordinates into angles
      // ---------------------------------------------------------
      //
      // SVG coordinates are different from normal mathematical
      // coordinates:
      //
      //     SVG X → increases to the right
      //     SVG Y → increases DOWN
      //
      // Because normal angles assume Y increases UP, we invert
      // the Y difference using:
      //
      //     dy = -(y - cy)
      //
      // atan2() then gives us the angle of the point relative
      // to the center of the gauge.

      const toDeg = (x: number, y: number) => {
        const dx = x - cx;
        const dy = -(y - cy);

        let deg = (Math.atan2(dy, dx) * 180) / Math.PI;

        // Convert negative angles into the 0°–360° range.
        if (deg < 0) {
          deg += 360;
        }

        return deg;
      };

      // Calculate the angle of the first endpoint.
      const firstPointAngle = toDeg(
        parseFloat(mMatch[1]),
        parseFloat(mMatch[2]),
      );

      // Calculate the angle of the second endpoint.
      const secondPointAngle = toDeg(
        parseFloat(aMatch[1]),
        parseFloat(aMatch[2]),
      );

      /*
       * ---------------------------------------------------------
       * 6. Calculate the gauge arc
       * ---------------------------------------------------------
       *
       * Expected configuration:
       *
       *     startAngle = 100°
       *     endAngle   = 360°
       *
       * Therefore:
       *
       *     360° - 100° = 260°
       *
       * Because angles wrap around at 360°, we normalize
       * the calculated difference using modulo 360.
       */

      const clockwiseSweep = (secondPointAngle - firstPointAngle + 360) % 360;

      const counterClockwiseSweep =
        (firstPointAngle - secondPointAngle + 360) % 360;

      /*
       * A 100° → 360° gauge has a 260° arc.
       *
       * Since 260° is greater than 180°, we select the
       * larger of the two possible arcs.
       */
      const sweepAngle =
        clockwiseSweep > 180 ? clockwiseSweep : counterClockwiseSweep;

      return {
        startAngle: firstPointAngle,
        endAngle: secondPointAngle,
        sweepAngle,
      };
    });
    // ---------------------------------------------------------
    // 7. Verify the calculated angles
    // ---------------------------------------------------------

    // Normalize the calculated angles to the 0°–359° range.
    //
    // JavaScript can produce -0 when applying % 360 to a
    // negative value. Convert -0 to 0 so that Jest does not
    // treat -0 and 0 as different values.
    const normalizeAngle = (angle: number) => {
      const normalized = Math.round(angle) % 360;
      return Object.is(normalized, -0) ? 0 : normalized;
    };

    const roundedFirstAngle = normalizeAngle(angles.startAngle);
    const roundedSecondAngle = normalizeAngle(angles.endAngle);

    // The two endpoints of a 100° → 360° arc are:
    // 100° and 0°.
    //
    // 360° is equivalent to 0° on a circle.
    //
    // DevExtreme may render the two endpoints in either order,
    // so we sort them before comparing.
    expect(
      [roundedFirstAngle, roundedSecondAngle].sort((a, b) => a - b),
    ).toEqual([0, 100]);

    // ---------------------------------------------------------
    // 8. Verify the actual rendered arc
    // ---------------------------------------------------------

    // Expected arc:
    //
    //     360° - 100° = 260°
    //
    // Therefore, the rendered SVG should contain a 260° arc.
    expect(Math.round(angles.sweepAngle)).toBe(260);
  });
  // test("4. User can change gauge shape properties for bar gauge widget", async ({
  //   page,
  // }) => {
  //   await setGaugeShape(page, 100, 360);

  //   await page.locator("label").filter({ hasText: "Viewer" }).click();

  //  const [saveRequest] = await Promise.all([
  //     page.waitForRequest(
  //       (req) =>
  //         req.url().includes("/api/dashboards/") &&
  //         req.method() === "PUT"
  //     ),
  //     page.getByRole("button", { name: "Save", exact: true }).click(),
  //   ]);

  //   const payload = saveRequest.postDataJSON();

  // const gaugeWidget = payload.data.children.find(
  //   (w: any) => w.widgetType === WIDGETS.BARGAUGE
  // );
  //   expect(gaugeWidget).toBeTruthy();
  //   expect(gaugeWidget.options.geometry.startAngle).toBe(100);
  //   expect(gaugeWidget.options.geometry.endAngle).toBe(360);

  // });
  test("5. User can change TITLE properties for bar gauge widget", async ({
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

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);

    // Verify background color - look for the container with the background
    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");

    // Wait for the container to be visible
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    // ============ VERIFY TITLE PROPERTIES ============
    // 1. Verify the Title text appears in the SVG
    const titleText = targetWidget.locator(".dxg-title text");
    await expect(titleText).toHaveText("Test Title");

    // 2. Verify Text Color
    await expect(titleText).toHaveCSS("fill", "rgb(36, 32, 232)");

    // 3. Verify Text Size
    await expect(titleText).toHaveCSS("font-size", "24px");

    // 4. Verify Boldness
    await expect(titleText).toHaveCSS("font-weight", "500");

    // 5. Verify Horizontal Alignment - Right
    await expect(titleText).toHaveAttribute("text-anchor", "end");

    // 6. Verify Vertical Position - Align Bottom
    const titleGroup = targetWidget.locator(".dxg-title");

    await expect(titleGroup).toBeVisible();

    const transform = await titleGroup.getAttribute("transform");

    expect(transform).toBeTruthy();

    const yMatch = transform?.match(/translate\(\s*[\d.]+,\s*([\d.]+)\s*\)/);

    expect(yMatch).toBeTruthy();

    if (yMatch) {
      const yPosition = parseFloat(yMatch[1]);

      // For bottom alignment, title should be positioned
      // in the lower portion of the widget.
      const widgetBox = await targetWidget.boundingBox();

      expect(widgetBox).toBeTruthy();

      if (widgetBox) {
        const titleBox = await titleGroup.boundingBox();

        expect(titleBox).toBeTruthy();

        if (titleBox) {
          const titleBottom = titleBox.y + titleBox.height;
          const widgetBottom = widgetBox.y + widgetBox.height;

          // Title should be close to the bottom of the widget
          expect(titleBottom).toBeGreaterThan(widgetBottom - 100);

          console.log(
            `Title Bottom Position: ${titleBottom}, Widget Bottom: ${widgetBottom}`,
          );
        }
      }
    }
  });
  test("6. User can change SUBTITLE properties for bar gauge widget", async ({
    page,
  }) => {
    await page.getByTestId("prop-label-title-text").click();
    await page.getByTestId("prop-input-title-text").click();
    await page.getByTestId("prop-input-title-text").press("ControlOrMeta+a");
    await page.getByTestId("prop-input-title-text").fill("Test Title");
    await page.getByTestId("prop-input-title-text").press("Enter");

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

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);

    // Verify background color - look for the container with the background
    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");

    // Wait for the container to be visible
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    // ============ VERIFY SUBTITLE PROPERTIES ============

    // Get all text elements inside dxg-title
    const titleGroup = targetWidget.locator(".dxg-title");
    const allTexts = titleGroup.locator("text");

    const titleText = allTexts.nth(0);
    const subtitleText = allTexts.nth(1);

    // 1. Verify Subtitle Text
    await expect(subtitleText).toHaveText("Test Subtitle");

    // 2. Verify Subtitle Text Color
    await expect(subtitleText).toHaveCSS("fill", "rgb(255, 99, 132)");

    // 3. Verify Subtitle Text Size
    await expect(subtitleText).toHaveCSS("font-size", "24px");

    // 4. Verify Subtitle Boldness
    await expect(subtitleText).toHaveCSS("font-weight", "700");

    // 5. Verify Subtitle is visible
    await expect(subtitleText).toBeVisible();
  });
  test("7. User can change LEGEND properties for bar gauge widget", async ({
    page,
  }) => {
    await setLegendProperties(
      page,
      true,
      true,
      "rgb(24, 206, 24)",
      "right",
      "bottom",
      "right",
      "rgb(32, 28, 243)",
      "18",
      "700",
      undefined, //bg color
      undefined, // position
      "horizontal", // orientation
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);

    // Wait for Bar Gauge container
    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");

    await bgContainer.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // ============ VERIFY LEGEND PROPERTIES ============

    // Legend border
    const legendBorder = targetWidget.locator(
      'rect[stroke="rgba(24, 206, 24, 1)"]',
    );

    await expect(legendBorder).toBeVisible();

    // 1. Verify Legend Border Color
    await expect(legendBorder).toHaveAttribute(
      "stroke",
      "rgba(24, 206, 24, 1)",
    );

    // 2. Verify Legend Border Width
    await expect(legendBorder).toHaveAttribute("stroke-width", "1");

    // 3. Verify Legend Items
    const legendItems = targetWidget.locator(".dxg-item");

    await expect(legendItems.first()).toBeVisible();

    // 4. Verify Text Color
    await expect(legendItems.first()).toHaveCSS("fill", "rgb(32, 28, 243)");

    // 5. Verify Font Size
    await expect(legendItems.first()).toHaveCSS("font-size", "18px");

    // 6. Verify Font Weight
    await expect(legendItems.first()).toHaveCSS("font-weight", "700");

    // 7. Verify Legend Text
    const legendTexts = legendItems.locator("text");

    await expect(legendTexts).toHaveCount(3);

    await expect(legendTexts.nth(0)).toHaveText("25.0");
    await expect(legendTexts.nth(1)).toHaveText("50.0");
    await expect(legendTexts.nth(2)).toHaveText("75.0");

    // 8. Verify Item Text Position - Right
    await expect(legendTexts.first()).toHaveAttribute("text-anchor", "start");

    // 9. Verify Legend Orientation - Horizontal
    const textTransforms = await legendTexts.evaluateAll((texts) =>
      texts.map((text) => text.getAttribute("transform")),
    );

    const positions = textTransforms.map((transform) => {
      const match = transform?.match(
        /translate\(\s*([\d.-]+),\s*([\d.-]+)\s*\)/,
      );

      return {
        x: match ? parseFloat(match[1]) : null,
        y: match ? parseFloat(match[2]) : null,
      };
    });

    expect(positions).toHaveLength(3);

    // All legend items should be on the same horizontal row
    expect(positions[0].y).toBe(positions[1].y);
    expect(positions[1].y).toBe(positions[2].y);

    // X position should increase from left to right
    expect(positions[1].x).toBeGreaterThan(positions[0].x!);
    expect(positions[2].x).toBeGreaterThan(positions[1].x!);
  });
  test("8. User can change TOOLTIP properties for bar gauge widget", async ({
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

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);

    // Verify background color
    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    // ============ VERIFY TOOLTIP PROPERTIES ============

    const trackerPath = targetWidget.locator(".dxg-tracker path").first();

    await expect(trackerPath).toBeVisible();

    // Trigger mouse event directly on the tracker
    await trackerPath.dispatchEvent("mousemove");

    // Tooltip is rendered outside the widget
    const tooltipGroup = page.locator(".dxg-tooltip");

    await expect(tooltipGroup).toBeVisible({
      timeout: 5000,
    });
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

    // Bar Gauge tooltip background is <path>
    const tooltipBackground = tooltipGroup.locator("path").first();

    await expect(tooltipBackground).toBeVisible();

    // 4. Verify Tooltip Background Color
    await expect(tooltipBackground).toHaveCSS("fill", "rgb(76, 41, 233)");
  });

  test("9. User can change VALUE INDICATOR properties for bar gauge widget", async ({
    page,
  }) => {
    await setGaugeValueIndicatorProperties(page, {
      offset: "9",
    });

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    // ============ VERIFY  PROPERTIES ============
    //   First bar:   77 → 70
    //              ↓
    //            GAP = 9
    //              ↓
    // Second bar:  61 → 54
    //              ↓
    //            GAP = 9
    //              ↓
    // Third bar:   45 → 38
    // ============ VERIFY PROPERTIES ============
    const gaugeBars = bgContainer.locator(".dxbg-bars > path");

    const firstBar = gaugeBars.nth(0);
    const secondBar = gaugeBars.nth(3);
    const thirdBar = gaugeBars.nth(6);

    // First → Second gap = 70 - 61 = 9px
    await expect(firstBar).toHaveAttribute(
      "d",
      /A 77\.00000 77\.00000.*A 70\.00000 70\.00000/,
    );

    await expect(secondBar).toHaveAttribute(
      "d",
      /A 61\.00000 61\.00000.*A 54\.00000 54\.00000/,
    );

    // Second → Third gap = 54 - 45 = 9px
    await expect(thirdBar).toHaveAttribute(
      "d",
      /A 45\.00000 45\.00000.*A 38\.00000 38\.00000/,
    );
  });
  test("10. User can change SCALE LABEL properties for bar gauge widget", async ({
    page,
  }) => {
    await setGaugeScaleLabel(page, "rgb(12, 45, 235)", "18", "700");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    // ============ VERIFY  PROPERTIES ============

    const scaleLabels = bgContainer.locator(".dxbg-bars text");

    await expect(scaleLabels).toHaveCount(3);

    for (let i = 0; i < 3; i++) {
      await expect(scaleLabels.nth(i)).toHaveAttribute(
        "style",
        /fill:\s*rgb\(12,\s*45,\s*235\)/,
      );

      await expect(scaleLabels.nth(i)).toHaveAttribute(
        "style",
        /font-size:\s*18px/,
      );

      await expect(scaleLabels.nth(i)).toHaveAttribute(
        "style",
        /font-weight:\s*700/,
      );
    }
  });
  test("11. User can change SCALE RANGE  properties for bar gauge widget", async ({
    page,
  }) => {
    //await setGaugeScaleRange(page, "10", "150");
    await setGaugeScaleRange(page, {
      startValue: "10",
      endValue: "150",
    });
    // Verify Scale Range properties
    await expect(ScaleRangeLocators.startValue(page)).toHaveValue("10");
    await expect(ScaleRangeLocators.endValue(page)).toHaveValue("150");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-bar-gauge-container");
    await bgContainer.waitFor({ state: "visible", timeout: 10000 });

    // ============ VERIFY SCALE RANGE ============

    // Scale range was configured as 10 to 150.
    const gaugeBars = bgContainer.locator(".dxbg-bars > path");

    // Outer gauge rings generated from the 10–150 scale range
    const firstBar = gaugeBars.nth(0);
    const secondBar = gaugeBars.nth(3);
    const thirdBar = gaugeBars.nth(6);

    // First gauge ring geometry
    await expect(firstBar).toHaveAttribute(
      "d",
      /A 77\.00000 77\.00000.*A 66\.66667 66\.66667/,
    );

    // Second gauge ring geometry
    await expect(secondBar).toHaveAttribute(
      "d",
      /A 62\.66667 62\.66667.*A 52\.33333 52\.33333/,
    );

    // Third gauge ring geometry
    await expect(thirdBar).toHaveAttribute(
      "d",
      /A 48\.33333 48\.33333.*A 38\.00000 38\.00000/,
    );
  });

  test("12 .User can change Link Dashboard via ACTIONS properties for bar gauge widget", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);
    await cardWidget.click();

    // Verify the linked dashboard is opened
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
  });

  test("13. User can set the action type to NONE for Bar Gauge widget", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.BARGAUGE);
    await cardWidget.click();

    // Verify the None Action
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(
      TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
    );
  });
});
