import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setActionsProperties, setLayoutAndSpacing,  setActionsToNone } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid,  setupWidgets } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { DataGridLocators } from "../../Locators/datagridSpecificLocators";


const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { DATAGRID: "mi-data-grid" } as const;
test.describe("PROPERTIES - DATA GRID Widget", () => {
  
test.beforeEach(async ({ page }) => {
      test.setTimeout(120000);
  await login(page);
  const dashboardCard = await ensureDashboardExists(page, dashboardName);
  await openEditorAndClearCanvas(page, dashboardCard);
   // Create ONLY 1 DATAGRID
  await setupWidgets(
    page,
    WIDGETS.DATAGRID,
    1
  );
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
 
   
     const targetWidget  = await getDroppedWidgetByUuid(page, WIDGETS.DATAGRID);
     const targetWidgetContent = targetWidget.locator(".grid-stack-item-content");
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

  const backgroundColorLabel =
    DataGridLocators.backgroundColorLabel(page);

  if ((await backgroundColorLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-background-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await backgroundColorLabel.click();

  const backgroundColorInput =
    DataGridLocators.backgroundColorInput(page);

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

  const showBordersLabel =
    DataGridLocators.showBordersLabel(page);

  if ((await showBordersLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-show-borders' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await showBordersLabel.click();

  const showBordersInput =
    DataGridLocators.showBordersInput(page);

  if ((await showBordersInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-show-borders' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  const isShowBordersChecked =
    (await showBordersInput.getAttribute("aria-checked")) === "true";

  if (!isShowBordersChecked) {
    await showBordersInput.click();
  }

  // ============================================================
  // Show Row Lines
  // ============================================================

  const showRowLinesLabel =
    DataGridLocators.showRowLinesLabel(page);

  if ((await showRowLinesLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-show-row-lines' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await showRowLinesLabel.click();

  const showRowLinesInput =
    DataGridLocators.showRowLinesInput(page);

  if ((await showRowLinesInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-show-row-lines' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  const isShowRowLinesChecked =
    (await showRowLinesInput.getAttribute("aria-checked")) === "true";

  if (!isShowRowLinesChecked) {
    await showRowLinesInput.click();
  }

  // ============================================================
  // Show Column Lines
  // ============================================================

  const showColumnLinesLabel =
    DataGridLocators.showColumnLinesLabel(page);

  if ((await showColumnLinesLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-show-column-lines' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await showColumnLinesLabel.click();

  const showColumnLinesInput =
    DataGridLocators.showColumnLinesInput(page);

  if ((await showColumnLinesInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-show-column-lines' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  const isShowColumnLinesChecked =
    (await showColumnLinesInput.getAttribute("aria-checked")) === "true";

  if (!isShowColumnLinesChecked) {
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

  const isRowAlternationChecked =
    (await rowAlternationEnabledInput.getAttribute("aria-checked")) === "true";

  if (!isRowAlternationChecked) {
    await rowAlternationEnabledInput.click();
  }

  // ============================================================
  // Column Auto Width
  // ============================================================

  const columnAutoWidthLabel =
    DataGridLocators.columnAutoWidthLabel(page);

  if ((await columnAutoWidthLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-column-auto-width' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await columnAutoWidthLabel.click();

  const columnAutoWidthInput =
    DataGridLocators.columnAutoWidthInput(page);

  if ((await columnAutoWidthInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-column-auto-width' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  const isColumnAutoWidthChecked =
    (await columnAutoWidthInput.getAttribute("aria-checked")) === "true";

  if (!isColumnAutoWidthChecked) {
    await columnAutoWidthInput.click();
  }

  // ============================================================
  // Word Wrap Enabled
  // ============================================================

  const wordWrapEnabledLabel =
    DataGridLocators.wordWrapEnabledLabel(page);

  if ((await wordWrapEnabledLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-word-wrap-enabled' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await wordWrapEnabledLabel.click();

  const wordWrapEnabledInput =
    DataGridLocators.wordWrapEnabledInput(page);

  if ((await wordWrapEnabledInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-word-wrap-enabled' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  const isWordWrapChecked =
    (await wordWrapEnabledInput.getAttribute("aria-checked")) === "true";

  if (!isWordWrapChecked) {
    await wordWrapEnabledInput.click();
  }
  // Switch to Viewer
await page.locator("label").filter({ hasText: "Viewer" }).click();

// Save
await page.getByRole("button", { name: "Save", exact: true }).click();

});
test("3. User can change PAGING properties for data grid widget", async ({
  page,
}) => {
  // ============================================================
  // Paging Enabled
  // ============================================================

  const pagingEnabledLabel =
    DataGridLocators.pagingEnabledLabel(page);

  if ((await pagingEnabledLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-paging-enabled' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await pagingEnabledLabel.click();

  const pagingEnabledInput =
    DataGridLocators.pagingEnabledInput(page);

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

  const pagingPageSizeLabel =
    DataGridLocators.pagingPageSizeLabel(page);

  if ((await pagingPageSizeLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-paging-page-size' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await pagingPageSizeLabel.click();

  const pagingPageSizeInput =
    DataGridLocators.pagingPageSizeInput(page);

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

  // ============================================================
  // Allow Column Reordering
  // ============================================================

  const allowColumnReorderingLabel =
    DataGridLocators.allowColumnReorderingLabel(page);

  if ((await allowColumnReorderingLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-allow-column-reordering' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await allowColumnReorderingLabel.click();

  const allowColumnReorderingInput =
    DataGridLocators.allowColumnReorderingInput(page);

  if ((await allowColumnReorderingInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-allow-column-reordering' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  const isAllowColumnReorderingChecked =
    (await allowColumnReorderingInput.getAttribute("aria-checked")) ===
    "true";

  if (!isAllowColumnReorderingChecked) {
    await allowColumnReorderingInput.click();
  }

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
    (await allowColumnResizingInput.getAttribute("aria-checked")) ===
    "true";

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
});
test("5. User can change FILTER ROW properties for data grid widget", async ({
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
  // Search Panel Placeholder
  // ============================================================

  const searchPanelPlaceholderLabel =
    DataGridLocators.searchPanelPlaceholderLabel(page);

  if ((await searchPanelPlaceholderLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-search-panel-placeholder' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await searchPanelPlaceholderLabel.click();

  const searchPanelPlaceholderInput =
    DataGridLocators.searchPanelPlaceholderInput(page);

  if ((await searchPanelPlaceholderInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-search-panel-placeholder' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await searchPanelPlaceholderInput.click();
  await searchPanelPlaceholderInput.press("ControlOrMeta+A");
  await searchPanelPlaceholderInput.fill("Sample Search");
  await searchPanelPlaceholderInput.press("Enter");

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", { name: "Save", exact: true }).click();
});
 
test("6. User can change COLUMN CHOOSER properties for data grid widget", async ({
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
    (await columnChooserEnabledInput.getAttribute("aria-checked")) ===
    "true";

  if (!isColumnChooserEnabledChecked) {
    await columnChooserEnabledInput.click();
  }

  // ============================================================
  // Column Chooser Mode
  // ============================================================

  const columnChooserModeLabel =
    DataGridLocators.columnChooserModeLabel(page);

  if ((await columnChooserModeLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-column-chooser-mode' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await columnChooserModeLabel.click();

  const columnChooserModeInput =
    DataGridLocators.columnChooserModeInput(page);

  if ((await columnChooserModeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-column-chooser-mode' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await columnChooserModeInput.click();

  const selectListOption = page.getByText("Select List", { exact: true });

  if ((await selectListOption.count()) === 0) {
    throw new Error(
      "Option 'Select List' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await selectListOption.click();

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", { name: "Save", exact: true }).click();

  // ============================================================
  // Get Target Data Grid Widget
  // ============================================================

});
test("7 .User can change Link Dashboard via ACTIONS properties for data grid widget", async ({
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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.DATAGRID);
    await cardWidget.click();

    // Verify the linked dashboard is opened
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
  });
  test("8 . User can set the action type to NONE for data grid widget", async ({
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
          WIDGETS.DATAGRID,
        );
        await cardWidget.click();
    
        // Verify the None Action
        await expect(
          page.locator('//p[contains(@class,"truncate")]'),
        ).toContainText(TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting);
      });
});
