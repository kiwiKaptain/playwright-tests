import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setActionsProperties, setAppearance, setWidgetWidth, setColorTheme, setLayoutAndSpacing, setLegendProperties, setMinorGridProperties, setRotated, setRunTimeFilter, setSeriesType, setSubtitleProperties, setTitleProperties, setTooltipProperties, setXAxisGridProperties, setXAxisLabelProperties, setXAxisTickProperties, setXAxisTitleProperties, setYAxisGridProperties, setYAxisLabelProperties, setYAxisTickProperties, setYAxisTitleProperties, setActionsToNone, setMultipleBatchSelection, setSingleCursor, setMultipleCursor, setRelativeTime, uncheckRelativeTime, setMultipleYAxes, uncheckStackedPanes, applyRuntimeFilter, setYAxisMinMax } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid,  setupWidgets } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { addDataPointsInFavouriteDataPoints, attachDataPointsToWidget } from "../../CommonHelperFunctions/commonDatapointsHelpers";
import { RelativeTimeLocators } from "../../Locators/commonLocators";

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

test("Issue 131 - All groups should collapse on clicking Collapse All button for Line Chart widget", async ({
  page,
}) => {
  const collapseAllButton = page.getByRole("button", {
    name: "Collapse All",
  });

  await expect(collapseAllButton).toBeVisible();
  await collapseAllButton.click();

  // Helper to verify that a particular group is collapsed
  async function verifyGroupCollapsed(
    groupName: string,
    groupContent: ReturnType<typeof page.getByTestId>
  ) {
    try {
      await expect(groupContent).toBeHidden({
        timeout: 5000,
      });
    } catch {
      throw new Error(
        `Issue 131: "${groupName}" group is not collapsed after clicking Collapse All. The group content is still visible.`
      );
    }
  }

  // Verify Batch & Filter group
  await verifyGroupCollapsed(
    "Batch & Filter - Allow Multiple Batch",
    page.getByTestId(
      "prop-container-common-multiple-batch-selection"
    )
  );

  await verifyGroupCollapsed(
    "Batch & Filter - Runtime Filter Required",
    page.getByTestId(
      "prop-container-common-runtime-filter-required"
    )
  );

  // Verify all Line Chart runtime groups
  const sectionHeaders = page.locator(
    "mi-line-chart-runtime-settings > * > div > div:first-child"
  );

  const headerCount = await sectionHeaders.count();

  for (let i = 0; i < headerCount; i++) {
    const header = sectionHeaders.nth(i);

    const groupName = (
      await header.locator("span").first().innerText()
    ).trim();

    const sectionContent = header.locator(
      "xpath=following-sibling::div[1]"
    );

    if (await sectionContent.count()) {
      await verifyGroupCollapsed(groupName, sectionContent);
    }
  }
});



test("Issue 132- When a Line Chart is dragged and dropped onto the dashboard, the graph appears blank if the Relative Time filter is unchecked. It should not remain blank ", async ({
  page,
}) => {
  



  // Enable Relative Time
  await uncheckRelativeTime(page);
  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  try {
    // Verify Line Chart is visible
    await expect(targetWidget.locator(".mi-line-chart-container"))
      .toBeVisible();

    // Verify chart SVG is visible
    const chart = targetWidget.locator("svg.dxc-chart");

    await expect(chart).toBeVisible();

    // Verify plotted line is visible
    const chartLine = chart.locator(".dxc-series .dxc-elements path");

    await expect(chartLine).not.toHaveCount(0);

    // Verify plotted data points are visible
    const chartMarkers = chart.locator(".dxc-series .dxc-markers circle");

    await expect(chartMarkers).not.toHaveCount(0);

  } catch (error) {
    throw new Error(
      `Issue 132 Verification Failed: Line Chart appears blank after Relative Time is unchecked. Expected the chart to display plotted lines and data points.\nOriginal Error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }

});



test("Issue 134 - Attach Filter pop up should be visible in light theme in Light mode", async ({
  page,
}) => {


  // Add data points through Favourite Data Points
  await addDataPointsInFavouriteDataPoints(page);

  // Open Data Source panel
  await page.locator(".widget-interaction-shield").click();
  await page.getByTestId("panel-tab-datasource").click();

  // Add Pressure data point
  await page.getByTestId("favourite-add-btn-Pressure").click();

  // Open Attach Filter popup
  await page.getByTestId("selected-dp-filter-Pressure").click();

  const popup = page.getByTestId("attach-filter-modal");

  // Verify popup is visible
  await expect(popup).toBeVisible();

  // Verify popup background in Light Mode
  await expect(popup).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)"
  );

  // Verify popup border
  await expect(popup).toHaveCSS(
    "border-top-color",
    "rgb(226, 232, 240)"
  );

  // Verify popup title
  const title = page.getByTestId("attach-filter-title");

  await expect(title).toBeVisible();
  await expect(title).toHaveText("ATTACH FILTER");

  
  // Verify search input
  const searchInput = page.getByTestId(
    "attach-filter-search-input"
  );

  await expect(searchInput).toBeVisible();

  await expect(searchInput).toHaveCSS(
    "background-color",
    "rgb(248, 250, 252)"
  );



});

test("Issue 135- Reset option is available in Appearance and Batch & Filter groups in Viewer mode", async ({
  page,
}) => {
  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get Line Chart widget
  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Select Line Chart widget
  await targetWidget.click();

  // Verify Appearance group is visible
  const appearanceHeader = page.getByTestId("section-appearance-header");

  if ((await appearanceHeader.count()) === 0) {
    throw new Error(
      "Appearance section header not found. " +
        "Playwright might be stuck hence may not have loaded the properties panel correctly. Please try rerunning the test case."
    );
  }

  await expect(appearanceHeader).toBeVisible();

  // Verify Batch & Filter group is visible
  const batchFilterHeader = page.getByText("Batch & Filter", {
    exact: true,
  });

  if ((await batchFilterHeader.count()) === 0) {
    throw new Error(
      "Batch & Filter section header not found. " +
        "Playwright might be stuck hence may not have loaded the properties panel correctly. Please try rerunning the test case."
    );
  }

  await expect(batchFilterHeader).toBeVisible();

  // Verify Reset button is available in Appearance
  const appearanceReset = page.getByTitle(
    "Reset appearance setting to default",
    { exact: true }
  );

  if ((await appearanceReset.count()) === 0) {
    throw new Error(
      "Reset button for Appearance settings not found in Viewer mode. " +
        "The Reset option might be missing. Please check the application."
    );
  }

  await expect(appearanceReset).toBeVisible();

  // Verify Reset button is available in Batch & Filter
  const batchFilterReset = page.getByTitle(
    "Reset batch settings to default",
    { exact: true }
  );

  if ((await batchFilterReset.count()) === 0) {
    throw new Error(
      "Reset button for Batch & Filter settings not found in Viewer mode. " +
        "The Reset option might be missing. Please check the application."
    );
  }

  await expect(batchFilterReset).toBeVisible();
});



test(
  "Issue 136 - Changing Min/Max values for one batch should not affect other batches or data points",
  async ({ page }) => {

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

    // Temperature Y-Axis locator
    const temperatureAxisLabels = targetWidget
      .locator(
        '.dxc-val-elements[title="Drag horizontally to adjust Temperature axis position"]'
      )
      .locator(":scope > text");

    // Capture Temperature Y-Axis labels before changing Pressure Min/Max
    const temperatureLabelsBefore =
      await temperatureAxisLabels.allTextContents();

    if (temperatureLabelsBefore.length === 0) {
      throw new Error(
        "Temperature Y-Axis Verification Failed: No tick labels found before changing Pressure Min/Max. " +
        "Playwright might be stuck because Temperature axis labels are missing."
      );
    }

    // Change Pressure Y-Axis Min/Max values
    await setYAxisMinMax(page);

    // Close settings panel
    await page.getByTestId("settings-panel-toggle-btn").click();

    // Pressure Y-Axis locator
    const pressureAxisLabels = targetWidget
      .locator(
        '.dxc-val-elements[title="Drag horizontally to adjust Pressure axis position"]'
      )
      .locator(":scope > text");

    // Verify Pressure Y-Axis tick labels
    try {
      await expect(pressureAxisLabels).toHaveText([
        "1",
        "2",
        "3",
      ]);
    } catch (error) {
      throw new Error(
        `Pressure Y-Axis Verification Failed: Expected tick labels [1, 2, 3].\n` +
        `Original Error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }

    // Verify Temperature Y-Axis labels remain unchanged
    try {
      await expect
        .poll(
          async () => await temperatureAxisLabels.allTextContents()
        )
        .toEqual(temperatureLabelsBefore);

    } catch (error) {
      const temperatureLabelsAfter =
        await temperatureAxisLabels.allTextContents();

      throw new Error(
        `Temperature Y-Axis Verification Failed: Changing Pressure Min/Max values unexpectedly affected the Temperature axis.\n` +
        `Before: ${JSON.stringify(temperatureLabelsBefore)}\n` +
        `After: ${JSON.stringify(temperatureLabelsAfter)}\n` +
        `Original Error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
);

test("Issue 137- Connected data points should remain visible after navigating Home and reopening the dashboard in Viewer mode", async ({
  page,
}) => {
  // Attach data points and Batch & Filter to widget
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

  // Verify runtime Filter icon is visible before navigating Home
  await expect(
    targetWidget.locator('[title="Filter"]')
  ).toBeVisible();

  // Configure runtime filter and select batches
  await applyRuntimeFilter(page, targetWidget);

  // Navigate to Home
  await page.getByRole("button").filter({
    hasText: "Go to Home",
  }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();
  // Verify dashboard is available on Home page
  const dashboard = page.getByRole("heading", {
    name: "TestDashboardForProperties",
  });

  await expect(dashboard).toBeVisible();

  // Reopen the same dashboard
  await dashboard.click();

  // Switch to Viewer mode
  await page.getByRole("button", { name: "Viewer" }).first().click();

  // Get Line Chart widget again after reopening
  const reopenedWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.LINECHART
  );

  // Verify runtime Filter icon is visible after reopening
  const runtimeFilter = reopenedWidget.locator(
    '.widget-action-icons [title="Filter"]'
  );

  await expect(runtimeFilter).toBeVisible();

  // Open runtime Filter
  await runtimeFilter.click();

  // Locate Batch per data point section
  const batchPerDataPoint = page
    .getByText("Batch per data point", { exact: true })
    .locator("xpath=../../..");

  try {
    // Verify Batch per data point section is visible
    await expect(batchPerDataPoint).toBeVisible();

    // Get all data point batch selection groups
    const batchGroups = batchPerDataPoint.locator("dx-tag-box");

    // Verify both data point groups are available
    await expect(batchGroups).toHaveCount(2);

    // Verify Pressure data point batches
    const pressureBatches = batchGroups
      .nth(0)
      .locator(".dx-tag-content span");

    await expect(pressureBatches).toHaveText([
      "BATCH_A000",
      "BATCH_A001",
    ]);

    // Verify Temperature data point batches
    const temperatureBatches = batchGroups
      .nth(1)
      .locator(".dx-tag-content span");

    await expect(temperatureBatches).toHaveText([
      "BATCH_A002",
      "BATCH_A003",
    ]);

  } catch (error) {
    throw new Error(
      `Issue 137 Verification Failed: Connected data points are not retained after navigating to Home and reopening the dashboard in Viewer mode. Expected Pressure batches [BATCH_A000, BATCH_A001] and Temperature batches [BATCH_A002, BATCH_A003].\nOriginal Error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});

test("Issue 138-A: Viewer and Editor buttons should remain visible in the top toolbar across Tablet screen resolutions", async ({
  page,
}) => {


  try {
    // Switch to Viewer mode
    const viewerLabel = page.locator("label").filter({ hasText: "Viewer" });

    if ((await viewerLabel.count()) === 0) {
      throw new Error(
        "Viewer label not found. Playwright might be stuck because the Viewer option is missing."
      );
    }

    await viewerLabel.click();

    // Save dashboard
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Reduce viewport to Tablet Screen
    await page.setViewportSize(VIEWPORTS.TABLET_PORTRAIT);

    // Verify Viewer button visibility and clickability
    try {
      const viewerButton = page.getByTestId("toolbar-mode-viewer");

      await expect(viewerButton).toBeVisible({ timeout: 10000 });
      await expect(viewerButton).toBeEnabled();

      await viewerButton.click();

    } catch (error) {
      throw new Error(
        "Viewer button is not visible, enabled, or clickable at Tablet Screen (768px). " +
        "Playwright might be stuck because the Viewer button is missing or hidden in the top toolbar. " +
        `Original error: ${error}`
      );
    }


    // Verify Editor button visibility and clickability
    try {
      const editorButton = page.getByTestId("toolbar-mode-editor");

      await expect(editorButton).toBeVisible({ timeout: 10000 });
      await expect(editorButton).toBeEnabled();

      await editorButton.click();

    } catch (error) {
      throw new Error(
        "Editor button is not visible, enabled, or clickable at Tablet Screen (768px). " +
        "Playwright might be stuck because the Editor button is missing or hidden in the top toolbar. " +
        `Original error: ${error}`
      );
    }

  } catch (error) {
    throw new Error(
      `Issue 138 failed: Viewer and Editor buttons are not accessible at the reduced screen resolution. ${error}`
    );
  }
});
test("Issue 138-B: Viewer and Editor buttons should remain visible in the top toolbar across mobile screen resolutions", async ({
  page,
}) => {


  try {
    // Switch to Viewer mode
    const viewerLabel = page.locator("label").filter({ hasText: "Viewer" });

    if ((await viewerLabel.count()) === 0) {
      throw new Error(
        "Viewer label not found. Playwright might be stuck because the Viewer option is missing."
      );
    }

    await viewerLabel.click();

    // Save dashboard
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Reduce viewport to Mobile Large (425px)
    await page.setViewportSize(VIEWPORTS.MOBILE_STANDARD);

    // Verify Viewer button visibility and clickability
    try {
      const viewerButton = page.getByTestId("toolbar-mode-viewer");

      await expect(viewerButton).toBeVisible({ timeout: 10000 });
      await expect(viewerButton).toBeEnabled();

      await viewerButton.click();

    } catch (error) {
      throw new Error(
        "Viewer button is not visible, enabled, or clickable at Mobile Standard (368px). " +
        "Playwright might be stuck because the Viewer button is missing or hidden in the top toolbar. " +
        `Original error: ${error}`
      );
    }


    // Verify Editor button visibility and clickability
    try {
      const editorButton = page.getByTestId("toolbar-mode-editor");

      await expect(editorButton).toBeVisible({ timeout: 10000 });
      await expect(editorButton).toBeEnabled();

      await editorButton.click();

    } catch (error) {
      throw new Error(
        "Editor button is not visible, enabled, or clickable at Mobile Standard (368px). " +
        "Playwright might be stuck because the Editor button is missing or hidden in the top toolbar. " +
        `Original error: ${error}`
      );
    }

  } catch (error) {
    throw new Error(
      `Issue 138 failed: Viewer and Editor buttons are not accessible at the reduced screen resolution. ${error}`
    );
  }
});
});
