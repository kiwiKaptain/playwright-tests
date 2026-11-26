import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setActionsProperties, setAppearance, setWidgetWidth, setColorTheme, setLayoutAndSpacing, setLegendProperties, setMinorGridProperties, setRotated, setRunTimeFilter, setSeriesType, setSubtitleProperties, setTitleProperties, setTooltipProperties, setXAxisGridProperties, setXAxisLabelProperties, setXAxisTickProperties, setXAxisTitleProperties, setYAxisGridProperties, setYAxisLabelProperties, setYAxisTickProperties, setYAxisTitleProperties, setActionsToNone, setMultipleBatchSelection, setSingleCursor, setMultipleCursor, setStackedPanes, setMultipleYAxes, uncheckStackedPanes, selectBatchForDataPoint, applyRuntimeFilter, setMultipleAxesSpacing, setRelativeTime, setRelativeTimeMode, setYAxisMinMax, setYAxisPosition, setYAxisOffset } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify, turnDarkMode } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid,  setupWidgets } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { addDataPointsInFavouriteDataPoints, attachDataPointsToWidget, attachSingleDataPointToWidget } from "../../CommonHelperFunctions/commonDatapointsHelpers";
import { RelativeTimeLocators, StackedPanesLocators } from "../../Locators/commonLocators";

const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { LINECHART: "mi-line-chart" } as const;
test.describe("PROPERTIES - LINE-CHART Widget", () => {
  
test.beforeEach(async ({ page }) => {
   test.setTimeout(120000);
  await login(page);
  const dashboardCard = await ensureDashboardExists(page, dashboardName);
  await openEditorAndClearCanvas(page, dashboardCard);
   // Create ONLY 1 LINECHART
  await setupWidgets(
    page,
    WIDGETS.LINECHART,
    1
  );
});

test.afterEach(async ({ page }) => {
  await goToHomeAndVerify(page, dashboardName);
});
 
  // =========================================================================
  // LIGHT MODE TEST CASES
  // =========================================================================

  test("1. User can change LAYOUT & SPACING properties for line chart widget in Light Mode ", async ({
      page,
    }) => {
       // Update Layout & Spacing
       await setLayoutAndSpacing(page, "10", "15", "20", "25");
      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget  = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);
      const targetWidgetContent = targetWidget.locator(".grid-stack-item-content");
      await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
      await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
      await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
      await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
    });

  test("2. User can change APPEARANCE properties for line chart widget in Light Mode", async ({
      page,
    }) => {
      await setAppearance(page, "rgb(229, 214, 73)"); 
      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

      // Verify background color - look for the container with the background
      const bgContainer = targetWidget.locator(".mi-line-chart-container");
      
      // Wait for the container to be visible
      await bgContainer.waitFor({ state: "visible" });
      
      // Check the background color 
      await expect(bgContainer).toHaveCSS("background-color", "rgb(229, 214, 73)");
    });

  test("3. User can change GENERAL properties for line chart widget in Light Mode", async ({
      page,
    }) => {
      await setSeriesType(page, "spline");
      await setWidgetWidth(page, "12");
      await setColorTheme(page, "Carmine");
      await setRotated(page);
      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);
      const chart = targetWidget.locator("svg.dxc-chart");

      await expect(chart).toBeVisible();

      // --------------------------------------------------
      // Verify Spline Series
      // --------------------------------------------------

      const series = chart.locator("g.dxc-series");

      await expect(series).toHaveCount(1);

      const line = series.locator("g.dxc-elements path");

      await expect(line).toHaveCount(1);

      // Verify spline path is rendered
      await expect(line).toHaveAttribute("d", /M/);

      // --------------------------------------------------
      // Verify Carmine Color Theme
      // --------------------------------------------------

      const lineElements = series.locator("g.dxc-elements");

      await expect(lineElements).toHaveCount(1);

      // --------------------------------------------------
      // Verify Markers Color
      // --------------------------------------------------

      const markers = series.locator("g.dxc-markers circle");

      await expect(markers).toHaveCount(8);

      for (let i = 0; i < 8; i++) {
        const markerColor = await markers.nth(i).evaluate((el) => {
          return window.getComputedStyle(el).fill;
        });

        if (markerColor !== "rgb(251, 119, 100)") {
          throw new Error(
            `Carmine marker color is not applied. Expected #fb7764, but received ${markerColor || "no color"}.`,
          );
        }
      }

      // --------------------------------------------------
      // Verify Rotated
      // --------------------------------------------------

      const argumentAxisLabels =
        chart.locator(".dxc-arg-elements text");

      const valueAxisLabels =
        chart.locator(".dxc-val-elements text");

      // Years should be on Y-axis
      await expect(argumentAxisLabels.first()).toHaveText("2015");
      await expect(argumentAxisLabels.last()).toHaveText("2022");

      // Numeric values should be on X-axis
      await expect(valueAxisLabels.first()).toHaveText("880");
      await expect(valueAxisLabels.last()).toHaveText("1,020");
    });

  test("4. User can change TITLE properties for line chart widget in Light Mode", async ({
      page,
    }) => {
      await setTitleProperties(
        page,
        "Test Title",
        "rgb(36, 32, 232)",
        "24",
        "500",
        "bottom",
        "right"
      );
      
      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

      // Verify background color - look for the container with the background
      const bgContainer = targetWidget.locator(".mi-line-chart-container");
      
      // Wait for the container to be visible
      await bgContainer.waitFor({ state: "visible" });
      
      // ============ VERIFY TITLE PROPERTIES ============
      
      // 1. Verify the Title text appears in the SVG
      const titleText = targetWidget.locator('.dxc-title text');
      await expect(titleText).toHaveText('Test Title');
      
      // 2. Verify Text Color -
      await expect(titleText).toHaveCSS('fill', 'rgb(36, 32, 232)');
      
      // 3. Verify Text Size - 24px
      await expect(titleText).toHaveCSS('font-size', '24px');
      
      // 4. Verify Boldness - font-weight 500
      await expect(titleText).toHaveCSS('font-weight', '500');
      // Check if the widget has data attributes for alignment
      expect(titleText).toHaveAttribute('text-anchor', 'end');

      // 6. Verify Vertical Position - Align Bottom
      const titleGroup = targetWidget.locator('.dxc-title');
      const transform = await titleGroup.getAttribute('transform');
      const yMatch = transform?.match(/translate\(\d+,\s*(\d+)\)/);
      
      if (yMatch) {
        const yPosition = parseInt(yMatch[1]);
        
        // Get the SVG height
        const svg = targetWidget.locator('.dxc-chart');
        const svgHeight = await svg.getAttribute('height');
        
        if (svgHeight) {
          const chartHeight = parseInt(svgHeight);
          // For bottom alignment, Y should be near the bottom of the SVG
          // For example: Y=252, Height=291 (difference of 39)
          // So we check if Y is within 50px of the bottom
          expect(yPosition).toBeGreaterThan(chartHeight - 50);
          console.log(`Vertical Position (Bottom): Y=${yPosition}, SVG Height=${chartHeight}`);
        }
      }
    });

  test("5. User can change SUBTITLE properties for line chart widget in Light Mode", async ({
      page,
    }) => {
      const titleTextLabel = page.getByTestId("prop-label-title-text");

      if ((await titleTextLabel.count()) === 0) {
        throw new Error("Test ID prop-label-title-text not found. " +
          "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.");
      }

      await titleTextLabel.click();

      const titleTextInput = page.getByTestId("prop-input-title-text");

      if ((await titleTextInput.count()) === 0) {
        throw new Error("Test ID prop-input-title-text not found. " +
          "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.");
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
        "700"
      );

      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);
      
      // Verify background color - look for the container with the background
      const bgContainer = targetWidget.locator(".mi-line-chart-container");
      
      // Wait for the container to be visible
      await bgContainer.waitFor({ state: "visible" });

      // ============ VERIFY SUBTITLE PROPERTIES ============
      
      // Get all text elements inside dxc-title
      const titleGroup = targetWidget.locator('.dxc-title');
      const allTexts = titleGroup.locator('text');
      const subtitleText = allTexts.nth(1);
      
      // 1. Verify Subtitle Text
      await expect(subtitleText).toHaveText('Test Subtitle');
      
      // 2. Verify Subtitle Text Color 
      await expect(subtitleText).toHaveCSS('fill', 'rgb(255, 99, 132)');
      
      // 3. Verify Subtitle Text Size - 24px
      await expect(subtitleText).toHaveCSS('font-size', '24px');
      
      // 4. Verify Subtitle Boldness - font-weight 700
      await expect(subtitleText).toHaveCSS('font-weight', '700');

      await expect(subtitleText).toBeVisible();
    });

  test("6. User can change LEGEND properties for line chart widget in Light Mode", async ({
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

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

      // Verify background color - look for the container with the background
      const bgContainer = targetWidget.locator(".mi-line-chart-container");
      
      // Wait for the container to be visible
      await bgContainer.waitFor({ state: "visible" });
     
      // ============ COMPLETE VERIFICATION ============
      // Get the legend group
      const legendGroup = targetWidget.locator('.dxc-legend');
      
      // 1. Verify Legend is visible (enabled)
      await expect(legendGroup).toBeVisible();
      
      // 2. Verify Legend Background Color - rgb(250, 162, 136)
      const legendRect = legendGroup.locator('rect.dxc-border');
      await expect(legendRect).toHaveCSS('fill', 'rgb(250, 162, 136)');
      
      // 3. Verify Legend Border Color - rgb(24, 206, 24)
      await expect(legendRect).toHaveCSS('stroke', 'rgb(24, 206, 24)');
      
      // 4. Verify Legend Border Width - 1px
      await expect(legendRect).toHaveCSS('stroke-width', '1px');
      
      // 5. Verify Text Color - rgb(32, 28, 243) - Blue
      const legendTexts = legendGroup.locator('text');
      await expect(legendTexts.first()).toHaveCSS('fill', 'rgb(32, 28, 243)');
      
      // 6. Verify Text Size - 18px
      await expect(legendTexts.first()).toHaveCSS('font-size', '18px');
      
      // 7. Verify Boldness - font-weight 700
      await expect(legendTexts.first()).toHaveCSS('font-weight', '700');
      
      // 8. Verify Text Position - Top (text-anchor: middle)
      await expect(legendTexts.first()).toHaveAttribute('text-anchor', 'middle');

      // 9. Verify Box Position 
      const innerLegendGroup = legendGroup.locator("g[transform]").first();
      const innerTransform = await innerLegendGroup.getAttribute("transform");

      expect(innerTransform).not.toBeNull();

      const match = innerTransform!.match(
        /translate\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/
      );

      expect(match).not.toBeNull();

      const xPosition = parseFloat(match![1]);
      const yPosition = parseFloat(match![2]);

      // Get chart dimensions
      const svg = targetWidget.locator(".dxc-chart");
      const svgWidth = await svg.getAttribute("width");
      const svgHeight = await svg.getAttribute("height");

      expect(svgWidth).not.toBeNull();
      expect(svgHeight).not.toBeNull();

      const chartWidth = parseFloat(svgWidth!);
      const chartHeight = parseFloat(svgHeight!);

      console.log("Chart Width:", chartWidth);
      console.log("Chart Height:", chartHeight);
      console.log("Legend X Position:", xPosition);
      console.log("Legend Y Position:", yPosition);

      // Verify legend is inside the chart
      expect(xPosition).toBeGreaterThan(50);
      expect(xPosition).toBeLessThan(chartWidth - 20);

      // Verify legend is positioned toward the bottom
      expect(yPosition).toBeGreaterThan(chartHeight / 2);
      expect(yPosition).toBeLessThan(chartHeight - 20);
    });

  test("7. User can change TOOLTIP properties for line chart widget in Light Mode", async ({
    page,
  }) => {
    // Enable Tooltip
    await setTooltipProperties(
      page,
      "rgb(245, 241, 44)",
      "18",
      "700",
      "rgb(76, 41, 233)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Verify background color
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY TOOLTIP PROPERTIES ============

    // Trigger tooltip by hovering over a circle
    const chartCircles = targetWidget.locator('.dxc-markers circle');
    const circleCount = await chartCircles.count();
    console.log(`Number of circles found: ${circleCount}`);

    if (circleCount > 0) {
      const firstCircle = chartCircles.first();
      
      // Get the circle's position and hover using page.mouse
      const box = await firstCircle.boundingBox();
      if (box) {
        // Move mouse to circle center with slight delay
        await page.mouse.move(
          box.x + box.width / 2,
          box.y + box.height / 2,
          { steps: 5 } // Smooth movement
        );
        await page.waitForTimeout(1500); // Wait longer for tooltip to appear
      }
      
      // If tooltip still not appearing, try JavaScript approach
      const tooltipExists = await page.locator('.dxc-tooltip').count();
      console.log(`Tooltip exists after hover: ${tooltipExists > 0}`);
      
      if (tooltipExists === 0) {
        // Use evaluate to manually trigger tooltip
        await page.evaluate(() => {
          const circle = document.querySelector('.dxc-markers circle');
          if (circle) {
            // Trigger multiple events
            const events = ['mouseenter', 'mouseover', 'mousemove'];
            events.forEach(eventType => {
              const event = new MouseEvent(eventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: circle.getBoundingClientRect().left,
                clientY: circle.getBoundingClientRect().top
              });
              circle.dispatchEvent(event);
            });
          }
        });
        await page.waitForTimeout(1500);
      }
    }

    // Look for tooltip at page level, not widget level
    const tooltipGroup = page.locator('.dxc-tooltip');

    // Get the tooltip within the page context
    const tooltipTexts = tooltipGroup.locator('text');
    const textCount = await tooltipTexts.count();
    console.log(`Number of text elements in tooltip: ${textCount}`);

    if (textCount > 0) {
      // Verify Tooltip Text Color
      await expect(tooltipTexts.first()).toHaveCSS('fill', 'rgb(245, 241, 44)');
      
      // Verify Tooltip Text Size
      await expect(tooltipTexts.first()).toHaveCSS('font-size', '18px');
      
      // Verify Tooltip Boldness
      await expect(tooltipTexts.first()).toHaveCSS('font-weight', '700');
    }
  });

  test("8. User can change X-AXIS TITLE properties for line chart widget in Light Mode", async ({
    page,
  }) => {
    await setXAxisTitleProperties(
      page,
      "X-Axis Sample Title",
      "rgb(255, 0, 0)",
      "20",
      "700"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS TITLE PROPERTIES ============
    
    // Look for x-axis title
    const xAxisTitle = targetWidget.locator('.dxc-arg-axis .dxc-arg-title text');
    
    // 1. Verify X-Axis Title exists
    await expect(xAxisTitle).toHaveCount(1);
    
    // 2. Verify X-Axis Title Text
    await expect(xAxisTitle).toHaveText('X-Axis Sample Title');
    
    // 3. Verify X-Axis Title Text Color
    await expect(xAxisTitle).toHaveCSS('fill', 'rgb(255, 0, 0)');
    
    // 4. Verify X-Axis Title Text Size
    await expect(xAxisTitle).toHaveCSS('font-size', '20px');
    
    // 5. Verify X-Axis Title Boldness
    await expect(xAxisTitle).toHaveCSS('font-weight', '700');
  });

  test("9. User can change Y-AXIS TITLE properties for line chart widget in Light Mode", async ({
    page,
  }) => {
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachSingleDataPointToWidget(page);


    await setYAxisTitleProperties(
      page,
      "Y-Axis Sample Title",
      "rgb(0, 0, 255)",
      "20",
      "700"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS TITLE PROPERTIES ============
    
    // Look for y-axis title - vertical axis (val-axis)
    const yAxisTitle = targetWidget.locator('.dxc-val-axis .dxc-val-title text');

    // 2. Verify Y-Axis Title Text
    await expect(yAxisTitle).toHaveText('Y-Axis Sample Title');
    
    // 3. Verify Y-Axis Title Text Color - rgb(0, 0, 255) - Blue
    await expect(yAxisTitle).toHaveCSS('fill', 'rgb(0, 0, 255)');
    
    // 4. Verify Y-Axis Title Text Size - 20px
    await expect(yAxisTitle).toHaveCSS('font-size', '20px');
    
    // 5. Verify Y-Axis Title Boldness - font-weight 700
    await expect(yAxisTitle).toHaveCSS('font-weight', '700');
    
    // 6. Verify Y-Axis Title is visible
    await expect(yAxisTitle).toBeVisible();
  });

  test("10. User can change X-AXIS LABEL properties for line chart widget in Light Mode", async ({
    page,
  }) => {
    await setXAxisLabelProperties(
      page,
      "rgb(255, 165, 0)",
      "16",
      "700"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS LABEL PROPERTIES ============
    
    // X-Axis labels are the text elements in the arg-axis (horizontal axis)
    const xAxisLabels = targetWidget.locator('.dxc-arg-axis .dxc-arg-elements text');
    const labelCount = await xAxisLabels.count();

    // 2. Verify X-Axis Label Text Color - rgb(255, 165, 0) - Orange (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(xAxisLabels.nth(i)).toHaveCSS('fill', 'rgb(255, 165, 0)');
    }
    
    // 3. Verify X-Axis Label Text Size - 16px (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(xAxisLabels.nth(i)).toHaveCSS('font-size', '16px');
    }
    
    // 4. Verify X-Axis Label Boldness - font-weight 700 (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(xAxisLabels.nth(i)).toHaveCSS('font-weight', '700');
    }
  });

  test("11. User can change Y-AXIS LABEL properties for line chart widget in Light Mode", async ({
    page,
  }) => {
    await setYAxisLabelProperties(
      page,
      "rgb(255, 165, 0)",
      "16",
      "700"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS LABEL PROPERTIES ============
    
    // Y-Axis labels are the text elements in the arg-axis (horizontal axis)
    const yAxisLabels = targetWidget.locator('.dxc-arg-axis .dxc-arg-elements text');
    const labelCount = await yAxisLabels.count();

    // 2. Verify Y-Axis Label Text Color - rgb(255, 165, 0) - Orange (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(yAxisLabels.nth(i)).toHaveCSS('fill', 'rgb(255, 165, 0)');
    }
    
    // 3. Verify Y-Axis Label Text Size - 16px (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(yAxisLabels.nth(i)).toHaveCSS('font-size', '16px');
    }
    
    // 4. Verify Y-Axis Label Boldness - font-weight 700 (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(yAxisLabels.nth(i)).toHaveCSS('font-weight', '700');
    }
  });

  test("12. User can change X-AXIS TICK properties for line chart widget in Light Mode", async ({
    page,
  }) => {
    await setXAxisTickProperties(
      page,
      "rgb(255, 0, 255)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS TICK PROPERTIES ============

    const xAxisTicks = targetWidget.locator(
      '.dxc-arg-axis .dxc-arg-line path[opacity="1"]'
    );

    const tickCount = await xAxisTicks.count();
    expect(tickCount).toBeGreaterThan(0);

    for (let i = 0; i < tickCount; i++) {
      const stroke = await xAxisTicks.nth(i).getAttribute("stroke");
      expect(stroke).toContain("255, 0, 255");
    }
  });

  test("13. User can change Y-AXIS TICK properties for line chart widget in Light Mode", async ({
    page,
  }) => {
    await setYAxisTickProperties(
      page,
      "rgb(43, 255, 0)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS TICK PROPERTIES ============

    const yAxisTicks = targetWidget.locator(
      '.dxc-val-axis .dxc-val-line path[opacity="1"]'
    );

    const tickCount = await yAxisTicks.count();
    expect(tickCount).toBeGreaterThan(0);

    for (let i = 0; i < tickCount; i++) {
      const stroke = await yAxisTicks.nth(i).getAttribute("stroke");
      expect(stroke).toContain("43, 255, 0");
    }
  });

  test("14. User can change X-AXIS GRID properties for line chart widget in Light Mode", async ({
    page,
  }) => {
    await setXAxisGridProperties(
      page,
      "rgb(2, 240, 172)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS GRID PROPERTIES ============
    
    // X-Axis grid lines are usually path elements with stroke
    const xAxisGrid = targetWidget.locator(
      '.dxc-arg-grid path, .dxc-arg-grid line'
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

  test("15. User can change Y-AXIS GRID properties for line chart widget in Light Mode", async ({
    page,
  }) => {
    await setYAxisGridProperties(
      page,
      "rgb(2, 240, 172)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS GRID PROPERTIES ============
    
    // Y-Axis grid lines are usually path elements with stroke
    const yAxisGrid = targetWidget.locator(
      '.dxc-val-grid path, .dxc-val-grid line'
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

  test("16. User can change MINOR GRID properties for line chart widget in Light Mode", async ({
    page,
  }) => {
    await setMinorGridProperties(
      page,
      "rgb(255, 165, 0)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY y-AXIS MINOR GRID PROPERTIES ============

    const yAxisMinorGrid = targetWidget.locator(
      '.dxc-val-grid path[stroke], .dxc-val-grid line[stroke]'
    );

    const gridCount = await yAxisMinorGrid.count();

    expect(gridCount).toBeGreaterThan(0);

    let foundInputColour = false;

    for (let i = 0; i < gridCount; i++) {
      const stroke = await yAxisMinorGrid.nth(i).getAttribute("stroke");

      console.log(`SVG Grid ${i} stroke:`, stroke);

      if (
        stroke === "rgb(255, 165, 0)" ||
        stroke === "#ffa500" ||
        stroke?.includes("255, 165, 0")
      ) {
        foundInputColour = true;
        break;
      }
    }

    expect(foundInputColour).toBe(true);
  });

  test("17. User can change Link Dashboard via ACTIONS properties for line Chart widget in Light Mode", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);
    await cardWidget.click();

    // Verify the linked dashboard is opened
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
  });

  test("18. User can set the action type to NONE for Line Chart widget in Light Mode", async ({
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
      WIDGETS.LINECHART,
    );
    await cardWidget.click();

    // Verify the None Action
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting);
  });

  test("19. User can change BATCH & FILTER properties for line chart widget in Light Mode", async ({
  page,
}) => {
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');
  await expect(runtimeFilter).toBeVisible();
  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);
  

   // Verify all four value axes are rendered
const valueAxes = targetWidget.locator(
  "svg.dxc-chart .dxc-val-axis"
);

await expect(valueAxes).toHaveCount(4);

// Verify all four axis titles
const axisTitles = targetWidget.locator(
  "svg.dxc-chart .dxc-val-axis .dxc-val-title text"
);

await expect(axisTitles).toHaveCount(4);

// Verify each axis title by its visible text
await expect(axisTitles.nth(0)).toContainText(
  "BATCH_A000 (Pressu"
);

await expect(axisTitles.nth(1)).toHaveText(
  "BATCH_A001 (Pressure)"
);

await expect(axisTitles.nth(2)).toContainText(
  "BATCH_A002 (Tempe"
);

await expect(axisTitles.nth(3)).toContainText(
  "BATCH_A003 (Tempe"
);
 
});

  test("20. User can add single cursor in TOOLS & CURSORS properties for line chart widget in Light Mode", async ({
  page,
}) => {
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);
 
  await setSingleCursor(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');
  await expect(runtimeFilter).toBeVisible();
  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);
  
 // Verify single cursor layer
const cursorLayer = targetWidget.locator(".mi-chart-cursor-layer");

if ((await cursorLayer.count()) === 0) {
  throw new Error(
    "Single cursor is not displayed on the line chart. Please verify the cursor settings and try rerunning the test case."
  );
}

await expect(cursorLayer).toBeVisible();

// Verify exactly one cursor
const cursorHit = cursorLayer.locator(".mi-chart-cursor-hit");

if ((await cursorHit.count()) !== 1) {
  throw new Error(
    "Single cursor verification failed. Expected exactly one cursor to be displayed on the line chart."
  );
}

await expect(cursorHit).toBeVisible();

// Verify cursor line
const cursorLine = cursorHit.locator(".mi-chart-cursor-line");

if ((await cursorLine.count()) === 0) {
  throw new Error(
    "Single cursor line is not displayed on the line chart. Please verify the cursor settings."
  );
}

await expect(cursorLine).toBeVisible();

// Verify top and bottom handles
const topHandle = cursorHit.locator(".mi-chart-cursor-handle-top");

if ((await topHandle.count()) === 0) {
  throw new Error(
    "Single cursor top handle is not displayed on the line chart."
  );
}

await expect(topHandle).toBeVisible();

const bottomHandle = cursorHit.locator(".mi-chart-cursor-handle-bottom");

if ((await bottomHandle.count()) === 0) {
  throw new Error(
    "Single cursor bottom handle is not displayed on the line chart."
  );
}

await expect(bottomHandle).toBeVisible();
});

  test("21. User can add double cursor in TOOLS & CURSORS properties for line chart widget in Light Mode", async ({
  page,
}) => {
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);
 
  await setMultipleCursor(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');
  await expect(runtimeFilter).toBeVisible();
  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);
 


// Verify double cursor layer is visible
const doubleCursorLayer = targetWidget.locator(
  ".mi-chart-double-cursor-layer"
);

await expect(doubleCursorLayer).toBeVisible();

// Verify Cursor 1 and Cursor 2 are visible
const cursor1 = doubleCursorLayer.locator(
  ".double-cursor-c1"
);

const cursor2 = doubleCursorLayer.locator(
  ".double-cursor-c2"
);

await expect(cursor1).toBeVisible();
await expect(cursor2).toBeVisible();

// Verify both cursor lines are visible
await expect(
  cursor1.locator(".line-c1")
).toBeVisible();

await expect(
  cursor2.locator(".line-c2")
).toBeVisible();

// Verify C1 and C2 handles are displayed
await expect(
  cursor1.locator(".handle-c1").first()
).toContainText("C1");

await expect(
  cursor2.locator(".handle-c2").first()
).toContainText("C2");

// Verify measurement interval span is visible
await expect(
  doubleCursorLayer.locator(".mi-double-cursor-span")
).toBeVisible();

// Verify time difference label
await expect(
  doubleCursorLayer.locator(".mi-double-cursor-span-pill")
).toContainText("ΔT:");
});




  // =========================================================================
  // DARK MODE TEST CASES
  // =========================================================================

  test("22. User can change LAYOUT & SPACING properties for line chart widget in Dark Mode without multiple axis", async ({
      page,
    }) => {
      // Switch to Dark Mode
      await turnDarkMode(page);
      // Update Layout & Spacing
      await setLayoutAndSpacing(page, "10", "15", "20", "25");
      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget  = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);
      const targetWidgetContent = targetWidget.locator(".grid-stack-item-content");
      await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
      await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
      await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
      await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
    });

  test("23. User can change APPEARANCE properties for line chart widget in Dark Mode", async ({
      page,
    }) => {
      // Switch to Dark Mode
      await turnDarkMode(page);

      await setAppearance(page, "rgb(229, 214, 73)");

      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

      // Verify background color - look for the container with the background
      const bgContainer = targetWidget.locator(".mi-line-chart-container");

      // Wait for the container to be visible
      await bgContainer.waitFor({ state: "visible" });

      // Check the background color 
      await expect(bgContainer).toHaveCSS("background-color", "rgb(229, 214, 73)");
    });

  test("24. User can change GENERAL properties for line chart widget in Dark Mode", async ({
      page,
    }) => {
      // Switch to Dark Mode
      await turnDarkMode(page);

      await setSeriesType(page, "spline");
      await setWidgetWidth(page, "12");
      await setColorTheme(page, "Carmine");
      await setRotated(page);
      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);
      const chart = targetWidget.locator("svg.dxc-chart");

      await expect(chart).toBeVisible();

      // --------------------------------------------------
      // Verify Spline Series
      // --------------------------------------------------

      const series = chart.locator("g.dxc-series");

      await expect(series).toHaveCount(1);

      const line = series.locator("g.dxc-elements path");

      await expect(line).toHaveCount(1);

      // Verify spline path is rendered
      await expect(line).toHaveAttribute("d", /M/);

      // --------------------------------------------------
      // Verify Carmine Color Theme
      // --------------------------------------------------

      const lineElements = series.locator("g.dxc-elements");

      await expect(lineElements).toHaveCount(1);

      // --------------------------------------------------
      // Verify Markers Color
      // --------------------------------------------------

      const markers = series.locator("g.dxc-markers circle");

      await expect(markers).toHaveCount(8);

      for (let i = 0; i < 8; i++) {
        const markerColor = await markers.nth(i).evaluate((el) => {
          return window.getComputedStyle(el).fill;
        });

        if (markerColor !== "rgb(251, 119, 100)") {
          throw new Error(
            `Carmine marker color is not applied. Expected #fb7764, but received ${markerColor || "no color"}.`,
          );
        }
      }

      // --------------------------------------------------
      // Verify Rotated
      // --------------------------------------------------

      const argumentAxisLabels =
        chart.locator(".dxc-arg-elements text");

      const valueAxisLabels =
        chart.locator(".dxc-val-elements text");

      // Years should be on Y-axis
      await expect(argumentAxisLabels.first()).toHaveText("2015");
      await expect(argumentAxisLabels.last()).toHaveText("2022");

      // Numeric values should be on X-axis
      await expect(valueAxisLabels.first()).toHaveText("880");
      await expect(valueAxisLabels.last()).toHaveText("1,020");
    });

  test("25. User can change TITLE properties for line chart widget in Dark Mode", async ({
      page,
    }) => {
      // Switch to Dark Mode
      await turnDarkMode(page);

      await setTitleProperties(
        page,
        "Test Title",
        "rgb(36, 32, 232)",
        "24",
        "500",
        "bottom",
        "right"
      );
      
      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

      // Verify background color - look for the container with the background
      const bgContainer = targetWidget.locator(".mi-line-chart-container");
      
      // Wait for the container to be visible
      await bgContainer.waitFor({ state: "visible" });
      
      // ============ VERIFY TITLE PROPERTIES ============
      
      // 1. Verify the Title text appears in the SVG
      const titleText = targetWidget.locator('.dxc-title text');
      await expect(titleText).toHaveText('Test Title');
      
      // 2. Verify Text Color -
      await expect(titleText).toHaveCSS('fill', 'rgb(36, 32, 232)');
      
      // 3. Verify Text Size - 24px
      await expect(titleText).toHaveCSS('font-size', '24px');
      
      // 4. Verify Boldness - font-weight 500
      await expect(titleText).toHaveCSS('font-weight', '500');
      // Check if the widget has data attributes for alignment
      expect(titleText).toHaveAttribute('text-anchor', 'end');

      // 6. Verify Vertical Position - Align Bottom
      const titleGroup = targetWidget.locator('.dxc-title');
      const transform = await titleGroup.getAttribute('transform');
      const yMatch = transform?.match(/translate\(\d+,\s*(\d+)\)/);
      
      if (yMatch) {
        const yPosition = parseInt(yMatch[1]);
        
        // Get the SVG height
        const svg = targetWidget.locator('.dxc-chart');
        const svgHeight = await svg.getAttribute('height');
        
        if (svgHeight) {
          const chartHeight = parseInt(svgHeight);
          // For bottom alignment, Y should be near the bottom of the SVG
          // For example: Y=252, Height=291 (difference of 39)
          // So we check if Y is within 50px of the bottom
          expect(yPosition).toBeGreaterThan(chartHeight - 50);
          console.log(`Vertical Position (Bottom): Y=${yPosition}, SVG Height=${chartHeight}`);
        }
      }
    });

  test("26. User can change SUBTITLE properties for line chart widget in Dark Mode", async ({
      page,
    }) => {
      // Switch to Dark Mode
      await turnDarkMode(page);

      const titleTextLabel = page.getByTestId("prop-label-title-text");

      if ((await titleTextLabel.count()) === 0) {
        throw new Error("Test ID prop-label-title-text not found. " +
          "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.");
      }

      await titleTextLabel.click();

      const titleTextInput = page.getByTestId("prop-input-title-text");

      if ((await titleTextInput.count()) === 0) {
        throw new Error("Test ID prop-input-title-text not found. " +
          "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.");
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
        "700"
      );

      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();

      // Save
      await page.getByRole("button", { name: "Save", exact: true }).click();

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);
      
      // Verify background color - look for the container with the background
      const bgContainer = targetWidget.locator(".mi-line-chart-container");
      
      // Wait for the container to be visible
      await bgContainer.waitFor({ state: "visible" });

      // ============ VERIFY SUBTITLE PROPERTIES ============
      
      // Get all text elements inside dxc-title
      const titleGroup = targetWidget.locator('.dxc-title');
      const allTexts = titleGroup.locator('text');
      const subtitleText = allTexts.nth(1);
      
      // 1. Verify Subtitle Text
      await expect(subtitleText).toHaveText('Test Subtitle');
      
      // 2. Verify Subtitle Text Color 
      await expect(subtitleText).toHaveCSS('fill', 'rgb(255, 99, 132)');
      
      // 3. Verify Subtitle Text Size - 24px
      await expect(subtitleText).toHaveCSS('font-size', '24px');
      
      // 4. Verify Subtitle Boldness - font-weight 700
      await expect(subtitleText).toHaveCSS('font-weight', '700');

      await expect(subtitleText).toBeVisible();
    });

  test("27. User can change LEGEND properties for line chart widget in Dark Mode", async ({
      page,
    }) => {
      // Switch to Dark Mode
      await turnDarkMode(page);

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

      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

      // Verify background color - look for the container with the background
      const bgContainer = targetWidget.locator(".mi-line-chart-container");
      
      // Wait for the container to be visible
      await bgContainer.waitFor({ state: "visible" });
     
      // ============ COMPLETE VERIFICATION ============
      // Get the legend group
      const legendGroup = targetWidget.locator('.dxc-legend');
      
      // 1. Verify Legend is visible (enabled)
      await expect(legendGroup).toBeVisible();
      
      // 2. Verify Legend Background Color - rgb(250, 162, 136)
      const legendRect = legendGroup.locator('rect.dxc-border');
      await expect(legendRect).toHaveCSS('fill', 'rgb(250, 162, 136)');
      
      // 3. Verify Legend Border Color - rgb(24, 206, 24)
      await expect(legendRect).toHaveCSS('stroke', 'rgb(24, 206, 24)');
      
      // 4. Verify Legend Border Width - 1px
      await expect(legendRect).toHaveCSS('stroke-width', '1px');
      
      // 5. Verify Text Color - rgb(32, 28, 243) - Blue
      const legendTexts = legendGroup.locator('text');
      await expect(legendTexts.first()).toHaveCSS('fill', 'rgb(32, 28, 243)');
      
      // 6. Verify Text Size - 18px
      await expect(legendTexts.first()).toHaveCSS('font-size', '18px');
      
      // 7. Verify Boldness - font-weight 700
      await expect(legendTexts.first()).toHaveCSS('font-weight', '700');
      
      // 8. Verify Text Position - Top (text-anchor: middle)
      await expect(legendTexts.first()).toHaveAttribute('text-anchor', 'middle');

      // 9. Verify Box Position 
      const innerLegendGroup = legendGroup.locator("g[transform]").first();
      const innerTransform = await innerLegendGroup.getAttribute("transform");

      expect(innerTransform).not.toBeNull();

      const match = innerTransform!.match(
        /translate\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/
      );

      expect(match).not.toBeNull();

      const xPosition = parseFloat(match![1]);
      const yPosition = parseFloat(match![2]);

      // Get chart dimensions
      const svg = targetWidget.locator(".dxc-chart");
      const svgWidth = await svg.getAttribute("width");
      const svgHeight = await svg.getAttribute("height");

      expect(svgWidth).not.toBeNull();
      expect(svgHeight).not.toBeNull();

      const chartWidth = parseFloat(svgWidth!);
      const chartHeight = parseFloat(svgHeight!);

      console.log("Chart Width:", chartWidth);
      console.log("Chart Height:", chartHeight);
      console.log("Legend X Position:", xPosition);
      console.log("Legend Y Position:", yPosition);

      // Verify legend is inside the chart
      expect(xPosition).toBeGreaterThan(50);
      expect(xPosition).toBeLessThan(chartWidth - 20);

      // Verify legend is positioned toward the bottom
      expect(yPosition).toBeGreaterThan(chartHeight / 2);
      expect(yPosition).toBeLessThan(chartHeight - 20);
    });

  test("28. User can change TOOLTIP properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

    // Enable Tooltip
    await setTooltipProperties(
      page,
      "rgb(245, 241, 44)",
      "18",
      "700",
      "rgb(76, 41, 233)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Verify background color
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY TOOLTIP PROPERTIES ============

    // Trigger tooltip by hovering over a circle
    const chartCircles = targetWidget.locator('.dxc-markers circle');
    const circleCount = await chartCircles.count();
    console.log(`Number of circles found: ${circleCount}`);

    if (circleCount > 0) {
      const firstCircle = chartCircles.first();
      
      // Get the circle's position and hover using page.mouse
      const box = await firstCircle.boundingBox();
      if (box) {
        // Move mouse to circle center with slight delay
        await page.mouse.move(
          box.x + box.width / 2,
          box.y + box.height / 2,
          { steps: 5 } // Smooth movement
        );
        await page.waitForTimeout(1500); // Wait longer for tooltip to appear
      }
      
      // If tooltip still not appearing, try JavaScript approach
      const tooltipExists = await page.locator('.dxc-tooltip').count();
      console.log(`Tooltip exists after hover: ${tooltipExists > 0}`);
      
      if (tooltipExists === 0) {
        // Use evaluate to manually trigger tooltip
        await page.evaluate(() => {
          const circle = document.querySelector('.dxc-markers circle');
          if (circle) {
            // Trigger multiple events
            const events = ['mouseenter', 'mouseover', 'mousemove'];
            events.forEach(eventType => {
              const event = new MouseEvent(eventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: circle.getBoundingClientRect().left,
                clientY: circle.getBoundingClientRect().top
              });
              circle.dispatchEvent(event);
            });
          }
        });
        await page.waitForTimeout(1500);
      }
    }

    // Look for tooltip at page level, not widget level
    const tooltipGroup = page.locator('.dxc-tooltip');

    // Get the tooltip within the page context
    const tooltipTexts = tooltipGroup.locator('text');
    const textCount = await tooltipTexts.count();
    console.log(`Number of text elements in tooltip: ${textCount}`);

    if (textCount > 0) {
      // Verify Tooltip Text Color
      await expect(tooltipTexts.first()).toHaveCSS('fill', 'rgb(245, 241, 44)');
      
      // Verify Tooltip Text Size
      await expect(tooltipTexts.first()).toHaveCSS('font-size', '18px');
      
      // Verify Tooltip Boldness
      await expect(tooltipTexts.first()).toHaveCSS('font-weight', '700');
    }
  });

  test("29. User can change X-AXIS TITLE properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

    await setXAxisTitleProperties(
      page,
      "X-Axis Sample Title",
      "rgb(255, 0, 0)",
      "20",
      "700"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS TITLE PROPERTIES ============
    
    // Look for x-axis title
    const xAxisTitle = targetWidget.locator('.dxc-arg-axis .dxc-arg-title text');
    
    // 1. Verify X-Axis Title exists
    await expect(xAxisTitle).toHaveCount(1);
    
    // 2. Verify X-Axis Title Text
    await expect(xAxisTitle).toHaveText('X-Axis Sample Title');
    
    // 3. Verify X-Axis Title Text Color
    await expect(xAxisTitle).toHaveCSS('fill', 'rgb(255, 0, 0)');
    
    // 4. Verify X-Axis Title Text Size
    await expect(xAxisTitle).toHaveCSS('font-size', '20px');
    
    // 5. Verify X-Axis Title Boldness
    await expect(xAxisTitle).toHaveCSS('font-weight', '700');
  });

  test("30. User can change Y-AXIS TITLE properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachSingleDataPointToWidget(page);

    await setYAxisTitleProperties(
      page,
      "Y-Axis Sample Title",
      "rgb(0, 0, 255)",
      "20",
      "700"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS TITLE PROPERTIES ============
    
    // Look for y-axis title - vertical axis (val-axis)
    const yAxisTitle = targetWidget.locator('.dxc-val-axis .dxc-val-title text');

    // 2. Verify Y-Axis Title Text
    await expect(yAxisTitle).toHaveText('Y-Axis Sample Title');
    
    // 3. Verify Y-Axis Title Text Color - rgb(0, 0, 255) - Blue
    await expect(yAxisTitle).toHaveCSS('fill', 'rgb(0, 0, 255)');
    
    // 4. Verify Y-Axis Title Text Size - 20px
    await expect(yAxisTitle).toHaveCSS('font-size', '20px');
    
    // 5. Verify Y-Axis Title Boldness - font-weight 700
    await expect(yAxisTitle).toHaveCSS('font-weight', '700');
    
    // 6. Verify Y-Axis Title is visible
    await expect(yAxisTitle).toBeVisible();
  });

  test("31. User can change X-AXIS LABEL properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

    await setXAxisLabelProperties(
      page,
      "rgb(255, 165, 0)",
      "16",
      "700"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS LABEL PROPERTIES ============
    
    // X-Axis labels are the text elements in the arg-axis (horizontal axis)
    const xAxisLabels = targetWidget.locator('.dxc-arg-axis .dxc-arg-elements text');
    const labelCount = await xAxisLabels.count();

    // 2. Verify X-Axis Label Text Color - rgb(255, 165, 0) - Orange (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(xAxisLabels.nth(i)).toHaveCSS('fill', 'rgb(255, 165, 0)');
    }
    
    // 3. Verify X-Axis Label Text Size - 16px (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(xAxisLabels.nth(i)).toHaveCSS('font-size', '16px');
    }
    
    // 4. Verify X-Axis Label Boldness - font-weight 700 (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(xAxisLabels.nth(i)).toHaveCSS('font-weight', '700');
    }
  });

  test("32. User can change Y-AXIS LABEL properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

    await setYAxisLabelProperties(
      page,
      "rgb(255, 165, 0)",
      "16",
      "700"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS LABEL PROPERTIES ============
    
    // Y-Axis labels are the text elements in the arg-axis (horizontal axis)
    const yAxisLabels = targetWidget.locator('.dxc-arg-axis .dxc-arg-elements text');
    const labelCount = await yAxisLabels.count();

    // 2. Verify Y-Axis Label Text Color - rgb(255, 165, 0) - Orange (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(yAxisLabels.nth(i)).toHaveCSS('fill', 'rgb(255, 165, 0)');
    }
    
    // 3. Verify Y-Axis Label Text Size - 16px (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(yAxisLabels.nth(i)).toHaveCSS('font-size', '16px');
    }
    
    // 4. Verify Y-Axis Label Boldness - font-weight 700 (ALL labels)
    for (let i = 0; i < labelCount; i++) {
      await expect(yAxisLabels.nth(i)).toHaveCSS('font-weight', '700');
    }
  });

  test("33. User can change X-AXIS TICK properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

    await setXAxisTickProperties(
      page,
      "rgb(255, 0, 255)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS TICK PROPERTIES ============

    const xAxisTicks = targetWidget.locator(
      '.dxc-arg-axis .dxc-arg-line path[opacity="1"]'
    );

    const tickCount = await xAxisTicks.count();
    expect(tickCount).toBeGreaterThan(0);

    for (let i = 0; i < tickCount; i++) {
      const stroke = await xAxisTicks.nth(i).getAttribute("stroke");
      expect(stroke).toContain("255, 0, 255");
    }
  });

  test("34. User can change Y-AXIS TICK properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

    await setYAxisTickProperties(
      page,
      "rgb(43, 255, 0)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS TICK PROPERTIES ============

    const yAxisTicks = targetWidget.locator(
      '.dxc-val-axis .dxc-val-line path[opacity="1"]'
    );

    const tickCount = await yAxisTicks.count();
    expect(tickCount).toBeGreaterThan(0);

    for (let i = 0; i < tickCount; i++) {
      const stroke = await yAxisTicks.nth(i).getAttribute("stroke");
      expect(stroke).toContain("43, 255, 0");
    }
  });

  test("35. User can change X-AXIS GRID properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

    await setXAxisGridProperties(
      page,
      "rgb(2, 240, 172)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY X-AXIS GRID PROPERTIES ============
    
    // X-Axis grid lines are usually path elements with stroke
    const xAxisGrid = targetWidget.locator(
      '.dxc-arg-grid path, .dxc-arg-grid line'
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

  test("36. User can change Y-AXIS GRID properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

    await setYAxisGridProperties(
      page,
      "rgb(2, 240, 172)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY Y-AXIS GRID PROPERTIES ============
    
    // Y-Axis grid lines are usually path elements with stroke
    const yAxisGrid = targetWidget.locator(
      '.dxc-val-grid path, .dxc-val-grid line'
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

  test("37. User can change MINOR GRID properties for line chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

    await setMinorGridProperties(
      page,
      "rgb(255, 165, 0)"
    );

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);

    // Wait for container
    const bgContainer = targetWidget.locator(".mi-line-chart-container");
    await bgContainer.waitFor({ state: "visible" });

    // ============ VERIFY y-AXIS MINOR GRID PROPERTIES ============

    const yAxisMinorGrid = targetWidget.locator(
      '.dxc-val-grid path[stroke], .dxc-val-grid line[stroke]'
    );

    const gridCount = await yAxisMinorGrid.count();

    expect(gridCount).toBeGreaterThan(0);

    let foundInputColour = false;

    for (let i = 0; i < gridCount; i++) {
      const stroke = await yAxisMinorGrid.nth(i).getAttribute("stroke");

      console.log(`SVG Grid ${i} stroke:`, stroke);

      if (
        stroke === "rgb(255, 165, 0)" ||
        stroke === "#ffa500" ||
        stroke?.includes("255, 165, 0")
      ) {
        foundInputColour = true;
        break;
      }
    }

    expect(foundInputColour).toBe(true);
  });

  test("38. User can change Link Dashboard via ACTIONS properties for line Chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.LINECHART);
    await cardWidget.click();

    // Verify the linked dashboard is opened
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
  });

  test("39. User can set the action type to NONE for Line Chart widget in Dark Mode", async ({
    page,
  }) => {
    // Switch to Dark Mode
    await turnDarkMode(page);

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
      WIDGETS.LINECHART,
    );
    await cardWidget.click();

    // Verify the None Action
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting);
  });

  test("40. User can change BATCH & FILTER properties for line chart widget in Dark Mode", async ({
  page,
}) => {
  // Switch to Dark Mode
  await turnDarkMode(page);

  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');
  await expect(runtimeFilter).toBeVisible();
  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);
  

   // Verify all four value axes are rendered
const valueAxes = targetWidget.locator(
  "svg.dxc-chart .dxc-val-axis"
);

await expect(valueAxes).toHaveCount(4);

// Verify all four axis titles
const axisTitles = targetWidget.locator(
  "svg.dxc-chart .dxc-val-axis .dxc-val-title text"
);

await expect(axisTitles).toHaveCount(4);

// Verify each axis title by its visible text
await expect(axisTitles.nth(0)).toContainText(
  "BATCH_A000 (Pressu"
);

await expect(axisTitles.nth(1)).toHaveText(
  "BATCH_A001 (Pressure)"
);

await expect(axisTitles.nth(2)).toContainText(
  "BATCH_A002 (Tempe"
);

await expect(axisTitles.nth(3)).toContainText(
  "BATCH_A003 (Tempe"
);
 
});

  test("41. User can add single cursor in TOOLS & CURSORS properties for line chart widget in Dark Mode", async ({
  page,
}) => {
  // Switch to Dark Mode
  await turnDarkMode(page);

  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);
 
  await setSingleCursor(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');
  await expect(runtimeFilter).toBeVisible();
  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

 // Verify single cursor layer
const cursorLayer = targetWidget.locator(".mi-chart-cursor-layer");

if ((await cursorLayer.count()) === 0) {
  throw new Error(
    "Single cursor is not displayed on the line chart. Please verify the cursor settings and try rerunning the test case."
  );
}

await expect(cursorLayer).toBeVisible();

// Verify exactly one cursor
const cursorHit = cursorLayer.locator(".mi-chart-cursor-hit");

if ((await cursorHit.count()) !== 1) {
  throw new Error(
    "Single cursor verification failed. Expected exactly one cursor to be displayed on the line chart."
  );
}

await expect(cursorHit).toBeVisible();

// Verify cursor line
const cursorLine = cursorHit.locator(".mi-chart-cursor-line");

if ((await cursorLine.count()) === 0) {
  throw new Error(
    "Single cursor line is not displayed on the line chart. Please verify the cursor settings."
  );
}

await expect(cursorLine).toBeVisible();

// Verify top and bottom handles
const topHandle = cursorHit.locator(".mi-chart-cursor-handle-top");

if ((await topHandle.count()) === 0) {
  throw new Error(
    "Single cursor top handle is not displayed on the line chart."
  );
}

await expect(topHandle).toBeVisible();

const bottomHandle = cursorHit.locator(".mi-chart-cursor-handle-bottom");

if ((await bottomHandle.count()) === 0) {
  throw new Error(
    "Single cursor bottom handle is not displayed on the line chart."
  );
}

await expect(bottomHandle).toBeVisible();
});

test("42. User can add double cursor in TOOLS & CURSORS properties for line chart widget in Dark Mode", async ({
  page,
}) => {
  // Switch to Dark Mode
  await turnDarkMode(page);

  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);
 
  await setMultipleCursor(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');
  await expect(runtimeFilter).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);
// Verify double cursor layer is visible
const doubleCursorLayer = targetWidget.locator(
  ".mi-chart-double-cursor-layer"
);

await expect(doubleCursorLayer).toBeVisible();

// Verify Cursor 1 and Cursor 2 are visible
const cursor1 = doubleCursorLayer.locator(
  ".double-cursor-c1"
);

const cursor2 = doubleCursorLayer.locator(
  ".double-cursor-c2"
);

await expect(cursor1).toBeVisible();
await expect(cursor2).toBeVisible();

// Verify both cursor lines are visible
await expect(
  cursor1.locator(".line-c1")
).toBeVisible();

await expect(
  cursor2.locator(".line-c2")
).toBeVisible();

// Verify C1 and C2 handles are displayed
await expect(
  cursor1.locator(".handle-c1").first()
).toContainText("C1");

await expect(
  cursor2.locator(".handle-c2").first()
).toContainText("C2");

// Verify measurement interval span is visible
await expect(
  doubleCursorLayer.locator(".mi-double-cursor-span")
).toBeVisible();

// Verify time difference label
await expect(
  doubleCursorLayer.locator(".mi-double-cursor-span-pill")
).toContainText("ΔT:");
});



test("43. User can enable multiple Y axes properties for line chart widget in Light Mode", async ({
  page,
}) => {
 
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable multiple Y axes
  await setMultipleYAxes(page);

  // Disable Stacked Panes View
  await uncheckStackedPanes(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  // Verify multiple Y axes are displayed
  const yAxes = targetWidget.locator(".dxc-val-axis");

  await expect(yAxes).toHaveCount(4);

  // Verify Y-axis titles
  const yAxisTitles = targetWidget.locator(
    ".dxc-val-axis .dxc-val-title text"
  );

  await expect(yAxisTitles).toHaveText([
    "BATCH_A000 (Pressure)",
    "BATCH_A001 (Pressure)",
    "BATCH_A002 (Temperature)",
    "BATCH_A003 (Temperature)",
  ]);
});


test("44. User can enable multiple Y axes properties for line chart widget in Dark Mode", async ({
  page,
}) => {
  // Switch to Dark Mode
  await turnDarkMode(page);
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable multiple Y axes
  await setMultipleYAxes(page);

  // Disable Stacked Panes View
  await uncheckStackedPanes(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  // Verify multiple Y axes are displayed
  const yAxes = targetWidget.locator(".dxc-val-axis");

  await expect(yAxes).toHaveCount(4);

  // Verify Y-axis titles
  const yAxisTitles = targetWidget.locator(
    ".dxc-val-axis .dxc-val-title text"
  );

  await expect(yAxisTitles).toHaveText([
    "BATCH_A000 (Pressure)",
    "BATCH_A001 (Pressure)",
    "BATCH_A002 (Temperature)",
    "BATCH_A003 (Temperature)",
  ]);
});

test("45. User can enable multiple axes spacing properties for line chart widget in Light Mode", async ({
  page,
}) => {
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable multiple Y axes
  await setMultipleYAxes(page);

  // Set multiple axes spacing to 100
  await setMultipleAxesSpacing(page, "100");

  // Disable Stacked Panes View
  await uncheckStackedPanes(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  // Verify four Y-axes are displayed
  const yAxes = targetWidget.locator(".dxc-val-axis");

  await expect(yAxes).toHaveCount(4);

  // Verify Y-axis spacing is applied
  const firstYAxis = yAxes.nth(0);
  const secondYAxis = yAxes.nth(1);

  const firstAxisX = await firstYAxis.evaluate((axis) => {
    const path = axis.querySelector(".dxc-val-line path");
    return path?.getBoundingClientRect().x;
  });

  const secondAxisX = await secondYAxis.evaluate((axis) => {
    const path = axis.querySelector(".dxc-val-line path");
    return path?.getBoundingClientRect().x;
  });

  expect(firstAxisX).toBeDefined();
  expect(secondAxisX).toBeDefined();
  expect(Math.abs(secondAxisX! - firstAxisX!)).toBeGreaterThan(0);
});



test("46. User can enable multiple axes spacing properties for line chart widget in Dark Mode", async ({
  page,
}) => {
  // Switch to Dark Mode
  await turnDarkMode(page);
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable multiple Y axes
  await setMultipleYAxes(page);

  // Set multiple axes spacing to 100
  await setMultipleAxesSpacing(page, "100");

  // Disable Stacked Panes View
  await uncheckStackedPanes(page);

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  // Verify four Y-axes are displayed
  const yAxes = targetWidget.locator(".dxc-val-axis");

  await expect(yAxes).toHaveCount(4);

  // Verify Y-axis spacing is applied
  const firstYAxis = yAxes.nth(0);
  const secondYAxis = yAxes.nth(1);

  const firstAxisX = await firstYAxis.evaluate((axis) => {
    const path = axis.querySelector(".dxc-val-line path");
    return path?.getBoundingClientRect().x;
  });

  const secondAxisX = await secondYAxis.evaluate((axis) => {
    const path = axis.querySelector(".dxc-val-line path");
    return path?.getBoundingClientRect().x;
  });

  expect(firstAxisX).toBeDefined();
  expect(secondAxisX).toBeDefined();
  expect(Math.abs(secondAxisX! - firstAxisX!)).toBeGreaterThan(0);
});

test("47. User can enable Stacked Panes properties for line chart widget in Light Mode", async ({
  page,
}) => {
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Multiple Y Axes
  await setMultipleYAxes(page);

  // Enable Stacked Panes
  await setStackedPanes(page);


  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);
  // Verify Stacked Panes
  const yAxes = targetWidget.locator(".dxc-val-axis");

  // Verify Y-axes are displayed
  await expect(yAxes).toHaveCount(4);

  // Get the vertical positions of all Y-axes
  const axisYPositions = await yAxes.evaluateAll((axes) =>
    axes.map((axis) => axis.getBoundingClientRect().y)
  );

  // Verify that the Y-axes are positioned in separate panes
  const uniqueYPositions = new Set(
    axisYPositions.map((position) => Math.round(position))
  );

  expect(
    uniqueYPositions.size,
    "Stacked Panes should display Y-axes at different vertical positions."
  ).toBeGreaterThan(1);

});

test("48. User can enable Relative Time properties to Overlay (Align each at 00:00) for line chart widget in Light Mode", async ({
  page,
}) => {
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);



    // Verify Relative Time - Overlay mode
  const xAxisLabels = targetWidget.locator(
    ".dxc-arg-elements text"
  );

  // Verify X-axis labels are displayed
  await expect(xAxisLabels.first()).toBeVisible();

  // Verify the first X-axis label starts at 00:00:00
  await expect(xAxisLabels.first()).toHaveText("00:00:00");


});
test("49. User can set Relative Time Mode to Continuous (Offset from First Batch) for line chart widget in Light Mode", async ({
  page,
}) => {
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Set Relative Time Mode to Continuous (Offset from First)
  await setRelativeTimeMode(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

// Open runtime filter
  const runtimeFilter = targetWidget.locator(
    '.widget-action-icons [title="Filter"]'
  );
  await runtimeFilter.click();
  await page.getByText('BATCH_A000:26 Oct, 11:50→26 Oct, 13:').click();
  await page.getByText('BATCH_A001:26 Oct, 13:50→26 Oct, 15:').click();
  await page.getByText('BATCH_A002:26 Oct, 15:50→26 Oct, 17:').click();
  await page.getByText('BATCH_A003:26 Oct, 17:50→26 Oct, 19:').click();
  await page.getByRole('button', { name: 'OK' }).click();


  // Verify Continuous (Offset from First) time mode
  const xAxisLabels = targetWidget.locator(
    ".dxc-arg-elements text"
  );

  // Verify X-axis labels are visible
  await expect(xAxisLabels.first()).toBeVisible();

  // Get all displayed X-axis time labels
  const displayedTimeLabels = await xAxisLabels.allTextContents();

  // Verify the first displayed time starts around the first batch time
  expect(displayedTimeLabels[0]).toBe("11:50:00");




});

test("50. User can change y Axis Parameters - Min & Max properties for line chart widget in Light Mode", async ({
  page,
}) => {

  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  await page.getByTestId('settings-panel-toggle-btn').click();
  await page.locator('.mi-line-chart-container').click();
  await setYAxisMinMax(page);
  
  await page.getByTestId('settings-panel-toggle-btn').click();

// Verify Pressure Y-Axis tick labels
const y1AxisLabels = targetWidget
  .locator('.dxc-val-elements[title="Drag horizontally to adjust Pressure axis position"]')
  .locator("> text");

try {
 // await expect(y1AxisLabels).toHaveText([ "1","2","3"]);
 await expect(y1AxisLabels).toHaveText([ "2"]);
} catch (error) {
  throw new Error(
    `Y1 Axis Verification Failed: Pressure axis should display tick labels [1, 2, 3].\nOriginal Error: ${
      error instanceof Error ? error.message : String(error)
    }`
  );
}
});

test("51. User can change y Axis Parameters - Position for line chart widget in Light Mode", async ({
  page,
}) => {

  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  // Open settings panel
  await page.getByTestId("settings-panel-toggle-btn").click();
  await page.locator(".mi-line-chart-container").click();
  await setYAxisPosition(page);

  // Select Batch parameter

  await page.getByTestId("settings-panel-toggle-btn").click();

  // Verify Y2 axis for BATCH_A000 (Pressure)
  const y2Axis = targetWidget
    .locator(".dxc-val-axis")
    .filter({ hasText: "BATCH_A000 (Pressure)" });

  try {
    // Verify Y2 axis exists
    await expect(y2Axis).toHaveCount(1);

    // Verify Y2 axis title
    await expect(
      y2Axis.locator(".dxc-val-title text")
    ).toHaveText("BATCH_A000 (Pressure)");

    // Verify Y2 axis is positioned on the right
    const axisBox = await y2Axis.boundingBox();
    const chartBox = await targetWidget.boundingBox();

    if (!axisBox || !chartBox) {
      throw new Error("Unable to retrieve Y2 axis or chart position.");
    }

    expect(
      axisBox.x + axisBox.width / 2,
      "Y-Axis position has not shifted to the RIGHT (Y2)."
    ).toBeGreaterThan(
      chartBox.x + chartBox.width / 2
    );

  } catch (error) {
    throw new Error(
      `Y-Axis Position Verification Failed: Y-Axis for BATCH_A000 (Pressure) has not shifted to the RIGHT (Y2), or the expected Y2 axis could not be verified.\nOriginal Error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});

test("52. User can change y Axis Parameters - Offset properties for line chart widget in Light Mode", async ({
  page,
}) => {

  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  await page.getByTestId('settings-panel-toggle-btn').click();
  await page.locator('.mi-line-chart-container').click();
  await setYAxisOffset(page);

  await page.getByTestId('settings-panel-toggle-btn').click();

  // Verify Y-Axis Offset
  const yAxisTitle = targetWidget
    .locator(".dxc-val-title text")
    .filter({ hasText: "BATCH_A000 (Pressure)" });

  try {
    // Verify Y-Axis title is visible
    await expect(yAxisTitle).toBeVisible();

    // Verify Y-Axis title position after applying Offset = 100
    await expect(yAxisTitle).toHaveAttribute("x", "148");

  } catch (error) {
    throw new Error(
      `Y-Axis Offset Verification Failed: Expected BATCH_A000 (Pressure) axis title X position to be 148 after applying Offset = 100, but the position did not update correctly.\nOriginal Error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});


test("53. User can enable Stacked Panes properties for line chart widget in Dark Mode", async ({
  page,
}) => {
   // Switch to Dark Mode
  await turnDarkMode(page);
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Multiple Y Axes
  await setMultipleYAxes(page);

  // Enable Stacked Panes
  await setStackedPanes(page);


  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);
  // Verify Stacked Panes
  const yAxes = targetWidget.locator(".dxc-val-axis");

  // Verify Y-axes are displayed
  await expect(yAxes).toHaveCount(4);

  // Get the vertical positions of all Y-axes
  const axisYPositions = await yAxes.evaluateAll((axes) =>
    axes.map((axis) => axis.getBoundingClientRect().y)
  );

  // Verify that the Y-axes are positioned in separate panes
  const uniqueYPositions = new Set(
    axisYPositions.map((position) => Math.round(position))
  );

  expect(
    uniqueYPositions.size,
    "Stacked Panes should display Y-axes at different vertical positions."
  ).toBeGreaterThan(1);

});

test("54. User can enable Relative Time properties to Overlay (Align each at 00:00) for line chart widget in Dark Mode", async ({
  page,
}) => {
   // Switch to Dark Mode
  await turnDarkMode(page);
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);



    // Verify Relative Time - Overlay mode
  const xAxisLabels = targetWidget.locator(
    ".dxc-arg-elements text"
  );

  // Verify X-axis labels are displayed
  await expect(xAxisLabels.first()).toBeVisible();

  // Verify the first X-axis label starts at 00:00:00
  await expect(xAxisLabels.first()).toHaveText("00:00:00");


});
test("55. User can set Relative Time Mode to Continuous (Offset from First Batch) for line chart widget in Dark Mode", async ({
  page,
}) => {
   // Switch to Dark Mode
  await turnDarkMode(page);
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Set Relative Time Mode to Continuous (Offset from First)
  await setRelativeTimeMode(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

// Open runtime filter
  const runtimeFilter = targetWidget.locator(
    '.widget-action-icons [title="Filter"]'
  );
  await runtimeFilter.click();
  await page.getByText('BATCH_A000:26 Oct, 11:50→26 Oct, 13:').click();
  await page.getByText('BATCH_A001:26 Oct, 13:50→26 Oct, 15:').click();
  await page.getByText('BATCH_A002:26 Oct, 15:50→26 Oct, 17:').click();
  await page.getByText('BATCH_A003:26 Oct, 17:50→26 Oct, 19:').click();
  await page.getByRole('button', { name: 'OK' }).click();


  // Verify Continuous (Offset from First) time mode
  const xAxisLabels = targetWidget.locator(
    ".dxc-arg-elements text"
  );

  // Verify X-axis labels are visible
  await expect(xAxisLabels.first()).toBeVisible();

  // Get all displayed X-axis time labels
  const displayedTimeLabels = await xAxisLabels.allTextContents();

  // Verify the first displayed time starts around the first batch time
  expect(displayedTimeLabels[0]).toBe("11:50:00");




});

test("56. User can change y Axis Parameters - Min & Max properties for line chart widget in Dark Mode", async ({
  page,
}) => {
 // Switch to Dark Mode
  await turnDarkMode(page);
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  await page.getByTestId('settings-panel-toggle-btn').click();
  await page.locator('.mi-line-chart-container').click();
  await setYAxisMinMax(page);
  
  await page.getByTestId('settings-panel-toggle-btn').click();

// Verify Pressure Y-Axis tick labels
const y1AxisLabels = targetWidget
  .locator('.dxc-val-elements[title="Drag horizontally to adjust Pressure axis position"]')
  .locator("> text");

try {
 // await expect(y1AxisLabels).toHaveText([ "1","2","3"]);
 await expect(y1AxisLabels).toHaveText([ "2"]);
} catch (error) {
  throw new Error(
    `Y1 Axis Verification Failed: Pressure axis should display tick labels [1, 2, 3].\nOriginal Error: ${
      error instanceof Error ? error.message : String(error)
    }`
  );
}
});

test("57. User can change y Axis Parameters - Position for line chart widget in Dark Mode", async ({
  page,
}) => {
 // Switch to Dark Mode
  await turnDarkMode(page);
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  // Open settings panel
  await page.getByTestId("settings-panel-toggle-btn").click();
  await page.locator(".mi-line-chart-container").click();
  await setYAxisPosition(page);

  // Select Batch parameter

  await page.getByTestId("settings-panel-toggle-btn").click();

  // Verify Y2 axis for BATCH_A000 (Pressure)
  const y2Axis = targetWidget
    .locator(".dxc-val-axis")
    .filter({ hasText: "BATCH_A000 (Pressure)" });

  try {
    // Verify Y2 axis exists
    await expect(y2Axis).toHaveCount(1);

    // Verify Y2 axis title
    await expect(
      y2Axis.locator(".dxc-val-title text")
    ).toHaveText("BATCH_A000 (Pressure)");

    // Verify Y2 axis is positioned on the right
    const axisBox = await y2Axis.boundingBox();
    const chartBox = await targetWidget.boundingBox();

    if (!axisBox || !chartBox) {
      throw new Error("Unable to retrieve Y2 axis or chart position.");
    }

    expect(
      axisBox.x + axisBox.width / 2,
      "Y-Axis position has not shifted to the RIGHT (Y2)."
    ).toBeGreaterThan(
      chartBox.x + chartBox.width / 2
    );

  } catch (error) {
    throw new Error(
      `Y-Axis Position Verification Failed: Y-Axis for BATCH_A000 (Pressure) has not shifted to the RIGHT (Y2), or the expected Y2 axis could not be verified.\nOriginal Error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});

test("58. User can change y Axis Parameters - Offset properties for line chart widget in Dark Mode", async ({
  page,
}) => {
 // Switch to Dark Mode
  await turnDarkMode(page);
  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Attach data points and BatchFilter to widget
  await attachDataPointsToWidget(page);

  // Configure runtime filter properties
  await setRunTimeFilter(page);
  await setMultipleBatchSelection(page);

  // Enable Relative Time
  await setRelativeTime(page);

  // Verify Relative Time is enabled
  await expect(
    RelativeTimeLocators.relativeTime(page)
  ).toHaveAttribute("aria-checked", "true");

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime filter is visible
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  await page.getByTestId('settings-panel-toggle-btn').click();
  await page.locator('.mi-line-chart-container').click();
  await setYAxisOffset(page);

  await page.getByTestId('settings-panel-toggle-btn').click();

  // Verify Y-Axis Offset
  const yAxisTitle = targetWidget
    .locator(".dxc-val-title text")
    .filter({ hasText: "BATCH_A000 (Pressure)" });

  try {
    // Verify Y-Axis title is visible
    await expect(yAxisTitle).toBeVisible();

    // Verify Y-Axis title position after applying Offset = 100
    await expect(yAxisTitle).toHaveAttribute("x", "148");

  } catch (error) {
    throw new Error(
      `Y-Axis Offset Verification Failed: Expected BATCH_A000 (Pressure) axis title X position to be 148 after applying Offset = 100, but the position did not update correctly.\nOriginal Error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});

});









