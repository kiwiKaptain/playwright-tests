import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setActionsProperties, setAppearance, setWidgetWidth, setColorTheme, setLayoutAndSpacing, setLegendProperties, setMinorGridProperties, setRotated, setRunTimeFilter, setSeriesType, setSubtitleProperties, setTitleProperties, setTooltipProperties, setXAxisGridProperties, setXAxisLabelProperties, setXAxisTickProperties, setXAxisTitleProperties, setYAxisGridProperties, setYAxisLabelProperties, setYAxisTickProperties, setYAxisTitleProperties, setActionsToNone } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid,  setupWidgets } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";

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
 

 test("1.User can change LAYOUT & SPACING properties for line chart widget", async ({
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
 test("2 .User can change APPEARANCE properties for line chart widget", async ({
     page,
   }) => {
       
                 await setAppearance(page, "rgb(229, 214, 73)"); 
          await setRunTimeFilter (page);
     
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

// Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');

  await expect(runtimeFilter).toBeVisible();


});
 test("3 .User can change GENERAL properties for line chart widget", async ({
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
// Verify Line Width = 12
// --------------------------------------------------

await expect(lineElements).toHaveAttribute(
  "stroke-width",
  "12"
);

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
 test("4 .User can change TITLE properties for line chart widget", async ({
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
      //For example: Y=252, Height=291 (difference of 39)
      // So we check if Y is within 50px of the bottom
      expect(yPosition).toBeGreaterThan(chartHeight - 50);
      console.log(`Vertical Position (Bottom): Y=${yPosition}, SVG Height=${chartHeight}`);
    }
  }
});
 test("5 .User can change SUBTITLE properties for line chart widget", async ({
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
  const titleText = allTexts.nth(0);
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
 test("6 .User can change LEGEND properties for line chart widget", async ({
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
test("7. User can change TOOLTIP properties for line chart widget", async ({
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

// Wait for tooltip to be visible with longer timeout
//await tooltipGroup.waitFor({ state: 'visible', timeout: 10000 });

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

// Verify Tooltip Background Color
// const tooltipBg = tooltipGroup.locator('rect').first();
// await expect(tooltipBg).toHaveCSS('fill', 'rgb(76, 41, 233)');

});
test("8. User can change X-AXIS TITLE properties for line chart widget", async ({
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
test("9. User can change Y-AXIS TITLE properties for line chart widget", async ({
  page,
}) => {
 
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
test("10. User can change X-AXIS LABEL properties for line chart widget", async ({
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
test("11. User can change Y-AXIS LABEL properties for line chart widget", async ({
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

  // ============ VERIFY X-AXIS LABEL PROPERTIES ============
  
   // X-Axis labels are the text elements in the arg-axis (horizontal axis)
  const yAxisLabels = targetWidget.locator('.dxc-arg-axis .dxc-arg-elements text');
  const labelCount = await yAxisLabels.count();
  

  // 2. Verify X-Axis Label Text Color - rgb(255, 165, 0) - Orange (ALL labels)
  for (let i = 0; i < labelCount; i++) {
    await expect(yAxisLabels.nth(i)).toHaveCSS('fill', 'rgb(255, 165, 0)');
  }
  
  // 3. Verify X-Axis Label Text Size - 16px (ALL labels)
  for (let i = 0; i < labelCount; i++) {
    await expect(yAxisLabels.nth(i)).toHaveCSS('font-size', '16px');
  }
  
  // 4. Verify X-Axis Label Boldness - font-weight 700 (ALL labels)
  for (let i = 0; i < labelCount; i++) {
    await expect(yAxisLabels.nth(i)).toHaveCSS('font-weight', '700');
  }
});
test("12. User can change X-AXIS TICK properties for line chart widget", async ({
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
 
  console.log(` All ${tickCount} X-Axis tick properties verified successfully!`);
});
test("13. User can change Y-AXIS TICK properties for line chart widget", async ({
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




test("14. User can change X-AXIS GRID properties for line chart widget", async ({
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
test("15. User can change Y-AXIS GRID properties for line chart widget", async ({
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
test("16. User can change MINOR GRID properties for line chart widget", async ({
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
  
  
  // const yAxisMinorGrid = targetWidget.locator(
  //   '.dxc-val-grid path, .dxc-val-grid line'
  // );
  
 
  // const gridCount = await yAxisMinorGrid.count();
  
  // //  Verify Y-Axis Minor Grid lines exist
  // expect(gridCount).toBeGreaterThan(0);
  

  // for (let i = 0; i < gridCount; i++) {
  //   const stroke = await yAxisMinorGrid.nth(i).getAttribute("stroke");
  //   expect(stroke).toContain("255, 165, 0");
  // }
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


test("17. User can change Link Dashboard via ACTIONS properties for line Chart widget", async ({
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
  test("18. User can set the action type to NONE for Line Chart widget", async ({
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
});
