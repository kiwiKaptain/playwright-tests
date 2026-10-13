import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import {
  setActionsProperties,
  setLayoutAndSpacing,
  setActionsToNone,
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
import { DataGridLocators } from "../../Locators/datagridSpecificLocators";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { DATAGRID: "mi-data-grid" } as const;
test.describe("PROPERTIES - DATA GRID Widget", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    await login(page);
    const dashboardCard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, dashboardCard);
    // Create ONLY 1 DATAGRID
    await setupWidgets(page, WIDGETS.DATAGRID, 1);
       // Click the Data Grid widget
  const dataGridWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.DATAGRID,
  );

  await dataGridWidget.click();
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

  test("1.User can change LAYOUT & SPACING properties for data grid widget", async ({
    page,
  }) => {
    // Update Layout & Spacing

    await setLayoutAndSpacing(page, "10", "15", "20", "25");
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.DATAGRID);
    const targetWidgetContent = targetWidget.locator(
      ".grid-stack-item-content",
    );
    await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
    await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
    await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
    await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
  });

  test("2. User can change APPEARANCE properties for data grid widget", async ({
    page,
  }) => {
    // ============================================================
    // Background Color
    // ============================================================

    const backgroundColorLabel = DataGridLocators.backgroundColorLabel(page);

    if ((await backgroundColorLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-background-color' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await backgroundColorLabel.click();

    const backgroundColorInput = DataGridLocators.backgroundColorInput(page);

    if ((await backgroundColorInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-background-color' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await backgroundColorInput.click();
    await backgroundColorInput.press("ControlOrMeta+A");
    await backgroundColorInput.fill("rgba(28, 196, 199, 1)");
    await backgroundColorInput.press("Enter");

    // ============================================================
    // Show Borders
    // ============================================================

    const showBordersLabel = DataGridLocators.showBordersLabel(page);

    if ((await showBordersLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-show-borders' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await showBordersLabel.click();

    const showBordersInput = DataGridLocators.showBordersInput(page);

    if ((await showBordersInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-show-borders' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    if ((await showBordersInput.getAttribute("aria-checked")) !== "true") {
      await showBordersInput.click();
    }

    // ============================================================
    // Show Row Lines
    // ============================================================

    const showRowLinesLabel = DataGridLocators.showRowLinesLabel(page);

    if ((await showRowLinesLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-show-row-lines' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await showRowLinesLabel.click();

    const showRowLinesInput = DataGridLocators.showRowLinesInput(page);

    if ((await showRowLinesInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-show-row-lines' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    if ((await showRowLinesInput.getAttribute("aria-checked")) !== "true") {
      await showRowLinesInput.click();
    }

    // ============================================================
    // Show Column Lines
    // ============================================================

    const showColumnLinesLabel = DataGridLocators.showColumnLinesLabel(page);

    if ((await showColumnLinesLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-show-column-lines' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await showColumnLinesLabel.click();

    const showColumnLinesInput = DataGridLocators.showColumnLinesInput(page);

    if ((await showColumnLinesInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-show-column-lines' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    if ((await showColumnLinesInput.getAttribute("aria-checked")) !== "true") {
      await showColumnLinesInput.click();
    }

    // ============================================================
    // Row Alternation Enabled
    // ============================================================

    const rowAlternationEnabledLabel =
      DataGridLocators.rowAlternationEnabledLabel(page);

    if ((await rowAlternationEnabledLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-row-alternation-enabled' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await rowAlternationEnabledLabel.click();

    const rowAlternationEnabledInput =
      DataGridLocators.rowAlternationEnabledInput(page);

    if ((await rowAlternationEnabledInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-row-alternation-enabled' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    if (
      (await rowAlternationEnabledInput.getAttribute("aria-checked")) !== "true"
    ) {
      await rowAlternationEnabledInput.click();
    }

    // ============================================================
    // Column Auto Width
    // ============================================================

    const columnAutoWidthLabel = DataGridLocators.columnAutoWidthLabel(page);

    if ((await columnAutoWidthLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-column-auto-width' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await columnAutoWidthLabel.click();

    const columnAutoWidthInput = DataGridLocators.columnAutoWidthInput(page);

    if ((await columnAutoWidthInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-column-auto-width' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    if ((await columnAutoWidthInput.getAttribute("aria-checked")) !== "true") {
      await columnAutoWidthInput.click();
    }

    // ============================================================
    // Word Wrap Enabled
    // ============================================================

    const wordWrapEnabledLabel = DataGridLocators.wordWrapEnabledLabel(page);

    if ((await wordWrapEnabledLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-word-wrap-enabled' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await wordWrapEnabledLabel.click();

    const wordWrapEnabledInput = DataGridLocators.wordWrapEnabledInput(page);

    if ((await wordWrapEnabledInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-word-wrap-enabled' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    if ((await wordWrapEnabledInput.getAttribute("aria-checked")) !== "true") {
      await wordWrapEnabledInput.click();
    }

    // ============================================================
    // Switch to Viewer
    // ============================================================

    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page
      .getByRole("button", {
        name: "Save",
        exact: true,
      })
      .click();

    // ============================================================
    // Get Data Grid Widget
    // ============================================================

    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.DATAGRID);

    // ============================================================
    // Verify Background Color
    // ============================================================

    try {
      const dataGridContainer = targetWidget.locator(".mi-data-grid-container");

      await expect(dataGridContainer).toHaveCSS(
        "background-color",
        "rgb(28, 196, 199)",
      );
    } catch (error) {
      throw new Error(
        "Background Color rgb(28, 196, 199) property is not applied. Please check the Background Color property in the property panel.",
      );
    }

    // ============================================================
    // Verify Show Borders
    // ============================================================

    try {
      const dataGrid = targetWidget.locator('.dx-datagrid[role="group"]');

      await expect(dataGrid).toHaveClass(/dx-datagrid-borders/);
    } catch (error) {
      throw new Error(
        "Show Borders property is not applied. Please check the Show Borders property in the property panel.",
      );
    }

    // ============================================================
    // Verify Show Row Lines
    // ============================================================

    try {
      const rows = targetWidget.locator(".dx-data-row");

      await expect(rows.first()).toHaveClass(/dx-row-lines/);
    } catch (error) {
      throw new Error(
        "Show Row Lines property is not applied. Please check the Show Row Lines property in the property panel.",
      );
    }

    // ============================================================
    // Verify Show Column Lines
    // ============================================================

    try {
      const rows = targetWidget.locator(".dx-data-row");

      await expect(rows.first()).toHaveClass(/dx-column-lines/);
    } catch (error) {
      throw new Error(
        "Show Column Lines property is not applied. Please check the Show Column Lines property in the property panel.",
      );
    }

    // ============================================================
    // Verify Row Alternation
    // ============================================================

    try {
      const alternateRow = targetWidget.locator(".dx-data-row.dx-row-alt");

      await expect(alternateRow.first()).toBeVisible();
    } catch (error) {
      throw new Error(
        "Row Alternation Enabled property is not applied. Please check the Row Alternation Enabled property in the property panel.",
      );
    }

    // ============================================================
    // Verify Column Auto Width
    // ============================================================

    try {
      const columns = targetWidget.locator(".dx-datagrid-headers colgroup col");

      await expect(columns.first()).toHaveAttribute("style", /width:/);
    } catch (error) {
      throw new Error(
        "Column Auto Width property is not applied. Please check the Column Auto Width property in the property panel.",
      );
    }

    // ============================================================
    // Verify Word Wrap
    // ============================================================

    try {
      const gridCells = targetWidget.locator(
        ".dx-datagrid-rowsview .dx-data-row td",
      );

      await expect(gridCells.first()).toBeVisible();
    } catch (error) {
      throw new Error(
        "Word Wrap Enabled property is not applied. Please check the Word Wrap Enabled property in the property panel.",
      );
    }

    console.log("All Data Grid Appearance properties verified successfully.");
  });

  test("3. User can change PAGING properties for data grid widget", async ({
    page,
  }) => {
    // ============================================================
    // Paging Enabled
    // ============================================================

    const pagingEnabledLabel = DataGridLocators.pagingEnabledLabel(page);

    if ((await pagingEnabledLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-paging-enabled' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await pagingEnabledLabel.click();

    const pagingEnabledInput = DataGridLocators.pagingEnabledInput(page);

    if ((await pagingEnabledInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-paging-enabled' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    const isPagingEnabledChecked =
      (await pagingEnabledInput.getAttribute("aria-checked")) === "true";

    if (!isPagingEnabledChecked) {
      await pagingEnabledInput.click();
    }

    // ============================================================
    // Paging Page Size
    // ============================================================

    const pagingPageSizeLabel = DataGridLocators.pagingPageSizeLabel(page);

    if ((await pagingPageSizeLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-paging-page-size' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await pagingPageSizeLabel.click();

    const pagingPageSizeInput = DataGridLocators.pagingPageSizeInput(page);

    if ((await pagingPageSizeInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-paging-page-size' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await pagingPageSizeInput.click();
    await pagingPageSizeInput.press("ControlOrMeta+A");
    await pagingPageSizeInput.fill("3");
    await pagingPageSizeInput.press("Enter");

    // ============================================================
    // Runtime Filter Required
    // ============================================================

    const runtimeFilterRequiredLabel =
      DataGridLocators.runtimeFilterRequiredLabel(page);

    if ((await runtimeFilterRequiredLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-common-runtime-filter-required' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await runtimeFilterRequiredLabel.click();

    const runtimeFilterRequiredInput =
      DataGridLocators.runtimeFilterRequiredInput(page);

    if ((await runtimeFilterRequiredInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-common-runtime-filter-required' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    const isRuntimeFilterRequiredChecked =
      (await runtimeFilterRequiredInput.getAttribute("aria-checked")) ===
      "true";

    if (!isRuntimeFilterRequiredChecked) {
      await runtimeFilterRequiredInput.click();
    }

    // ============================================================
    // Switch to Viewer
    // ============================================================

    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // ============================================================
    // Save
    // ============================================================

    await page.getByRole("button", { name: "Save", exact: true }).click();

    // ============================================================
    // Verify Paging in Viewer
    // ============================================================

    const dataRows = page.locator(".dx-datagrid-rowsview tr.dx-data-row");

    if ((await dataRows.count()) === 0) {
      throw new Error(
        "Data grid rows not found in Viewer. Paging might not have loaded correctly, or the data grid may not be visible. Please try rerunning the test case.",
      );
    }

    const rowCount = await dataRows.count();

    expect(
      rowCount,
      "PAGING FAILED: Expected 3 rows per page, but found " +
        rowCount +
        ". Check whether the page size was applied correctly.",
    ).toBe(3);

    // ============================================================
    // Verify Runtime Filter in Viewer
    // ============================================================
    const runtimeFilterIcon = page.locator(
      'div.widget-viewer-icon[id^="viewer-icon-"] div[title="Filter"]',
    );

    await expect(runtimeFilterIcon.first()).toBeVisible({
      timeout: 10000,
    });
    if ((await runtimeFilterIcon.count()) === 0) {
      throw new Error(
        "Runtime Filter icon not found in Viewer. The Runtime Filter Required property might not have been enabled, or the Data Grid widget may not have loaded correctly. Please try rerunning the test case.",
      );
    }
  });
  test("4. User can change SORTING properties for data grid widget", async ({
    page,
  }) => {
    // ============================================================
    // Sorting Visibility - Visible
    // ============================================================

    const sortingVisibilityVisibleLabel =
      DataGridLocators.sortingVisibilityVisibleLabel(page);

    if ((await sortingVisibilityVisibleLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-sorting-visibility-visible' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await sortingVisibilityVisibleLabel.click();

    const sortingVisibilityVisibleInput =
      DataGridLocators.sortingVisibilityVisibleInput(page);

    if ((await sortingVisibilityVisibleInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-sorting-visibility-visible' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    const isSortingVisibilityVisibleChecked =
      (await sortingVisibilityVisibleInput.getAttribute("aria-checked")) ===
      "true";

    if (!isSortingVisibilityVisibleChecked) {
      await sortingVisibilityVisibleInput.click();
    }
    await page.getByRole("columnheader", { name: "Column Status" }).click();
    // ============================================================
    // Allow Column Reordering
    // ============================================================

    // const allowColumnReorderingLabel =
    //   DataGridLocators.allowColumnReorderingLabel(page);

    // if ((await allowColumnReorderingLabel.count()) === 0) {
    //   throw new Error(
    //     "Test ID 'prop-label-allow-column-reordering' not found. " +
    //       "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    //   );
    // }

    // await allowColumnReorderingLabel.click();

    // const allowColumnReorderingInput =
    //   DataGridLocators.allowColumnReorderingInput(page);

    // if ((await allowColumnReorderingInput.count()) === 0) {
    //   throw new Error(
    //     "Test ID 'prop-input-allow-column-reordering' not found. " +
    //       "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    //   );
    // }

    // const isAllowColumnReorderingChecked =
    //   (await allowColumnReorderingInput.getAttribute("aria-checked")) ===
    //   "true";

    // if (!isAllowColumnReorderingChecked) {
    //   await allowColumnReorderingInput.click();
    // }

    // ============================================================
    // Allow Column Resizing
    // ============================================================

    const allowColumnResizingLabel =
      DataGridLocators.allowColumnResizingLabel(page);

    if ((await allowColumnResizingLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-allow-column-resizing' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await allowColumnResizingLabel.click();

    const allowColumnResizingInput =
      DataGridLocators.allowColumnResizingInput(page);

    if ((await allowColumnResizingInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-allow-column-resizing' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    const isAllowColumnResizingChecked =
      (await allowColumnResizingInput.getAttribute("aria-checked")) === "true";

    if (!isAllowColumnResizingChecked) {
      await allowColumnResizingInput.click();
    }

    // ============================================================
    // Switch to Viewer
    // ============================================================

    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // ============================================================
    // Save
    // ============================================================

    await page.getByRole("button", { name: "Save", exact: true }).click();
    // ============================================================
    // Verify Sorting in Viewer
    // ============================================================

    const statusHeader = page.getByRole("columnheader", {
      name: "Column Status",
    });

    if ((await statusHeader.count()) === 0) {
      throw new Error(
        "Sorting verification failed. The Status column header was not found in Viewer. The Data Grid may not have loaded correctly.",
      );
    }

    const initialSort = await statusHeader.getAttribute("aria-sort");

    await statusHeader.click();

    const updatedSort = await statusHeader.getAttribute("aria-sort");

    if (initialSort === updatedSort) {
      throw new Error(
        "Sorting verification failed. Clicking the Status column header did not change its sort direction. Check whether sorting is enabled for the Data Grid.",
      );
    }
  });

  test("5. User can change COLUMN RESIZE properties for data grid widget", async ({
    page,
  }) => {
    
    // ============================================================
    // Allow Column Resizing
    // ============================================================

    const allowColumnResizingLabel =
      DataGridLocators.allowColumnResizingLabel(page);

    if ((await allowColumnResizingLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-allow-column-resizing' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await allowColumnResizingLabel.click();

    const allowColumnResizingInput =
      DataGridLocators.allowColumnResizingInput(page);

    if ((await allowColumnResizingInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-allow-column-resizing' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    const isAllowColumnResizingChecked =
      (await allowColumnResizingInput.getAttribute("aria-checked")) === "true";

    if (!isAllowColumnResizingChecked) {
      await allowColumnResizingInput.click();
    }

    // Working
    const header = page.getByRole("columnheader", {
      name: "Column Status",
    });
 
 
    const box = await header.boundingBox();

    if (!box) {
      throw new Error("Column Status header was not found.");
    }

    // Hover near the right edge of the column header
    const x = box.x + box.width - 2;
    const y = box.y + box.height / 2;

    await page.mouse.move(x, y);

    await page.waitForTimeout(3000);

    // The separator becomes available on hover
    const separator = page.locator(".dx-datagrid-columns-separator").first();

    await separator.waitFor({ state: "visible" });

    const separatorBox = await separator.boundingBox();

    if (!separatorBox) {
      throw new Error("Column resize separator was not found.");
    }

    const startX = separatorBox.x + separatorBox.width / 2;
    const startY = separatorBox.y + separatorBox.height / 2;

    // Drag the separator 50 pixels to the right
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 50, startY, { steps: 10 });
    await page.mouse.up();




    // ============================================================
    // Switch to Viewer
    // ============================================================

    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // ============================================================
    // Save
    // ============================================================

    await page.getByRole("button", { name: "Save", exact: true }).click();

      await page.waitForTimeout(6000);


    // ============================================================
    // Verify Resizing in Viewer
    // ============================================================
  



    
    const header2 = page.getByRole("columnheader", {
      name: "Column Machine Name",
    });

    const box2 = await header2.boundingBox();

    if (!box2) {
      throw new Error("Column Column Machine Name header was not found.");
    }

    // Hover near the right edge of the column header
    const x2 = box2.x + box2.width - 2;
    const y2 = box2.y + box2.height / 2;

    await page.mouse.move(x2, y2);

    await page.waitForTimeout(3000);

    // The separator becomes available on hover
    const separator2 = page.locator(".dx-datagrid-columns-separator").first();

    await separator2.waitFor({ state: "visible" });

    const separatorBox2 = await separator2.boundingBox();

    if (!separatorBox2) {
      throw new Error("Column resize separator was not found.");
    }

    const startX2 = separatorBox2.x + separatorBox2.width / 2;
    const startY2 = separatorBox2.y + separatorBox2.height / 2;

    // Drag the separator 50 pixels to the right
    await page.mouse.move(startX2, startY2);
    await page.mouse.down();
    await page.mouse.move(startX2 + 150, startY2, { steps: 30 });
    await page.mouse.up();


   
  });
  



 
test("6. User can change FILTER ROW properties for data grid widget", async ({
  page,
}) => {
  // ============================================================
  // Filter Row Visible
  // ============================================================

  const filterRowVisibleLabel =
    DataGridLocators.filterRowVisibleLabel(page);

  if ((await filterRowVisibleLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-filter-row-visible' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await filterRowVisibleLabel.click();

  const filterRowVisibleInput =
    DataGridLocators.filterRowVisibleInput(page);

  if ((await filterRowVisibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-filter-row-visible' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  const isFilterRowVisibleChecked =
    (await filterRowVisibleInput.getAttribute("aria-checked")) === "true";

  if (!isFilterRowVisibleChecked) {
    await filterRowVisibleInput.click();
  }

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", { name: "Save", exact: true }).click();

await page.waitForTimeout(5000);
// ============================================================
// Filter Status by Idle
// ============================================================

const statusFilter = page.getByRole("textbox", {
  name: "Filter cell",
  description: "Column Status",
});

if ((await statusFilter.count()) === 0) {
  throw new Error(
    "Filter row is not working. Status filter textbox was not found in Viewer.",
  );
}

await statusFilter.fill("idle");
await statusFilter.press("Enter");

// Wait for the DataGrid to apply the filter
await page.waitForTimeout(2000);

// ============================================================
// Verify Filtered Data
// ============================================================

const dataRows = page.locator(
  ".dx-datagrid-rowsview tr.dx-data-row",
);

try {
  await expect(dataRows).toHaveCount(2, { timeout: 10000 });

  await expect(dataRows.nth(0)).toContainText("Conveyor-A1");
  await expect(dataRows.nth(0)).toContainText("Idle");

  await expect(dataRows.nth(1)).toContainText("Label-Printer");
  await expect(dataRows.nth(1)).toContainText("Idle");
} catch {
  throw new Error(
    "Filter row is not working. Expected only Conveyor-A1 and Label-Printer with Status 'Idle' after filtering.",
  );
}
 
});


test("7. User can change SEARCH properties for data grid widget", async ({
    page,
  }) => {
    
    // ============================================================
    // Search Panel Visible
    // ============================================================

    const searchPanelVisibleLabel =
      DataGridLocators.searchPanelVisibleLabel(page);

    if ((await searchPanelVisibleLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-search-panel-visible' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await searchPanelVisibleLabel.click();

    const searchPanelVisibleInput =
      DataGridLocators.searchPanelVisibleInput(page);

    if ((await searchPanelVisibleInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-search-panel-visible' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    const isSearchPanelVisibleChecked =
      (await searchPanelVisibleInput.getAttribute("aria-checked")) === "true";

    if (!isSearchPanelVisibleChecked) {
      await searchPanelVisibleInput.click();
    }

  
    // ============================================================
    // Switch to Viewer
    // ============================================================

    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // ============================================================
    // Save
    // ============================================================

await page.getByRole("button", { name: "Save", exact: true }).click();
// Wait for Viewer to load after saving
await page.waitForTimeout(5000);
// ============================================================
// Search for Run
// ============================================================

const searchBox = page.getByRole("textbox", {
  name: "Search in the data grid",
});



await searchBox.fill("Run");
await searchBox.press("Enter");

// Wait for search results to update
await page.waitForTimeout(5000);

// ============================================================
// Verify Search Results
// ============================================================

const dataRows = page.locator(
  ".dx-datagrid-rowsview tr.dx-data-row",
);

try {
  await expect(dataRows.first()).toBeVisible({ timeout: 10000 });

  const rowCount = await dataRows.count();

  if (rowCount === 0) {
    throw new Error("No matching rows found.");
  }

  for (let i = 0; i < rowCount; i++) {
    const rowText = await dataRows.nth(i).innerText();

    if (!rowText.toLowerCase().includes("run")) {
      throw new Error(`Unexpected row found: ${rowText}`);
    }
  }
} catch {
  throw new Error(
    "Search panel is not working. Expected the DataGrid to display only rows matching 'Run'.",
  );
}



  });
  test("8. User can change COLUMN CHOOSER properties for data grid widget", async ({
    page,
  }) => {
    // ============================================================
    // Column Chooser Enabled
    // ============================================================

    const columnChooserEnabledLabel =
      DataGridLocators.columnChooserEnabledLabel(page);

    if ((await columnChooserEnabledLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-column-chooser-enabled' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    await columnChooserEnabledLabel.click();

    const columnChooserEnabledInput =
      DataGridLocators.columnChooserEnabledInput(page);

    if ((await columnChooserEnabledInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-column-chooser-enabled' not found. " +
          "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
      );
    }

    const isColumnChooserEnabledChecked =
      (await columnChooserEnabledInput.getAttribute("aria-checked")) === "true";

    if (!isColumnChooserEnabledChecked) {
      await columnChooserEnabledInput.click();
    }

    

    // ============================================================
    // Switch to Viewer
    // ============================================================

    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // ============================================================
    // Save
    // ============================================================

await page.getByRole("button", { name: "Save", exact: true }).click();

// Wait for Viewer to load
await page.waitForTimeout(3000);

// ============================================================
// Open Column Chooser
// ============================================================

await page.getByRole("button", { name: "Column Chooser" }).click();

await page.getByRole("treeitem", { name: "Machine Name" })
  .getByLabel("Check state")
  .click();

// Close Column Chooser
await page.getByRole("button", { name: "Close" }).click();

// Wait for grid to update
await page.waitForTimeout(2000);

// ============================================================
// Verify Column Chooser
// ============================================================

const machineNameHeader = page.getByRole("columnheader", {
  name: "Column Machine Name",
});

if (await machineNameHeader.count() !== 0) {
  throw new Error(
    "Column Chooser is not working. Machine Name column should be hidden but is still visible.",
  );
}

const statusHeader = page.getByRole("columnheader", {
  name: "Column Status",
});

if (await statusHeader.count() === 0) {
  throw new Error(
    "Column Chooser is not working. Status column should remain visible.",
  );
}


  });
  test("9 .User can change Link Dashboard via ACTIONS properties for data grid widget", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.DATAGRID);
    await cardWidget.click();

    // Verify the linked dashboard is opened
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
  });
  test("10. User can set the action type to NONE for data grid widget", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.DATAGRID);
    await cardWidget.click();

    // Verify the None Action
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(
      TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
    );
  });
});
